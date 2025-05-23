
import React, { useState } from "react";
import { useInstruments } from "@/hooks/useInstruments";
import { useDeleteInstrument } from "@/hooks/useInstrumentManagement";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const InstrumentManagement = () => {
  const { data: instruments = [], isLoading } = useInstruments();
  const deleteInstrument = useDeleteInstrument();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [instrumentToDelete, setInstrumentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (instrumentId: string) => {
    setInstrumentToDelete(instrumentId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (instrumentToDelete) {
      deleteInstrument.mutate(instrumentToDelete);
      setDeleteDialogOpen(false);
      setInstrumentToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Manage Instruments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Manage Instruments ({instruments.length} total)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {instruments.map((instrument) => (
              <div
                key={instrument.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{instrument.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {instrument.brand} • ₹{instrument.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(instrument.id)}
                    disabled={deleteInstrument.isPending}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            {instruments.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No instruments found. Add some instruments to get started.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this instrument? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteInstrument.isPending}
            >
              {deleteInstrument.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InstrumentManagement;
