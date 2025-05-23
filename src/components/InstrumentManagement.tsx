
import React, { useState } from "react";
import { useInstruments } from "@/hooks/useInstruments";
import { useDeleteInstrument, useUpdateInstrument } from "@/hooks/useInstrumentManagement";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const InstrumentManagement = () => {
  const { data: instruments = [], isLoading } = useInstruments();
  const deleteInstrument = useDeleteInstrument();
  const updateInstrument = useUpdateInstrument();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [instrumentToDelete, setInstrumentToDelete] = useState<string | null>(null);
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [instrumentToEdit, setInstrumentToEdit] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    buyLinks: ""
  });

  const handleDeleteClick = (instrumentId: string) => {
    setInstrumentToDelete(instrumentId);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (instrument: any) => {
    setInstrumentToEdit(instrument);
    
    // Initialize buy links string from JSON
    let buyLinksStr = "";
    if (instrument.specs && instrument.specs.buyLinks) {
      buyLinksStr = instrument.specs.buyLinks.map((link: any) => 
        `${link.store}:${link.url}`
      ).join(',');
    }
    
    setEditForm({
      name: instrument.name || "",
      brand: instrument.brand || "",
      price: String(instrument.price) || "",
      description: instrument.description || "",
      buyLinks: buyLinksStr
    });
    
    setEditDialogOpen(true);
  };

  const confirmDelete = () => {
    if (instrumentToDelete) {
      deleteInstrument.mutate(instrumentToDelete);
      setDeleteDialogOpen(false);
      setInstrumentToDelete(null);
    }
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const parseBuyLinks = (buyLinksStr: string) => {
    if (!buyLinksStr.trim()) return [];
    
    try {
      // Try to parse as JSON first (in case it's already in JSON format)
      return JSON.parse(buyLinksStr);
    } catch {
      // If JSON parsing fails, try simple format: store1:url1,store2:url2
      const links = buyLinksStr.split(',');
      return links.map(link => {
        const [store, url] = link.split(':').map(s => s.trim());
        return { store, url };
      }).filter(link => link.store && link.url);
    }
  };

  const handleSaveEdit = () => {
    if (!instrumentToEdit) return;
    
    const updates = {
      name: editForm.name,
      brand: editForm.brand,
      price: Number(editForm.price),
      description: editForm.description,
      specs: {
        ...instrumentToEdit.specs,
        buyLinks: parseBuyLinks(editForm.buyLinks)
      }
    };
    
    updateInstrument.mutate({
      id: instrumentToEdit.id,
      updates
    });
    
    setEditDialogOpen(false);
    setInstrumentToEdit(null);
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditClick(instrument)}
                  >
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

      {/* Delete Confirmation Dialog */}
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Instrument</DialogTitle>
            <DialogDescription>
              Update the instrument details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={editForm.name}
                onChange={handleEditFormChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-brand">Brand</Label>
              <Input
                id="edit-brand"
                name="brand"
                value={editForm.brand}
                onChange={handleEditFormChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                value={editForm.price}
                onChange={handleEditFormChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={editForm.description}
                onChange={handleEditFormChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-buyLinks">Buy Links</Label>
              <Textarea
                id="edit-buyLinks"
                name="buyLinks"
                value={editForm.buyLinks}
                onChange={handleEditFormChange}
                placeholder="Store1:URL1,Store2:URL2"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Format: Store1:URL1,Store2:URL2
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEdit} 
              disabled={updateInstrument.isPending}
            >
              {updateInstrument.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InstrumentManagement;
