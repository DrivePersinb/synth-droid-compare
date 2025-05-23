
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface BuyLink {
  store: string;
  url: string;
}

interface BuyLinksDialogProps {
  isOpen: boolean;
  onClose: () => void;
  instrumentName: string;
  buyLinks: BuyLink[];
}

const BuyLinksDialog: React.FC<BuyLinksDialogProps> = ({
  isOpen,
  onClose,
  instrumentName,
  buyLinks
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy {instrumentName}</DialogTitle>
          <DialogDescription>
            Choose from available retailers to purchase this instrument.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {buyLinks.map((link, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-between"
              onClick={() => window.open(link.url, '_blank')}
            >
              <span>{link.store}</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          ))}
          {buyLinks.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No purchase links available for this instrument.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyLinksDialog;
