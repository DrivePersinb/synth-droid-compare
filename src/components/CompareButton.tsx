
import React from "react";
import { Link } from "react-router-dom";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";

interface CompareButtonProps {
  variant?: "default" | "compact";
  onClick?: () => void;
  instrumentId?: string;
}

const CompareButton: React.FC<CompareButtonProps> = ({ 
  variant = "default", 
  onClick, 
  instrumentId 
}) => {
  const { compareItems, isInCompare } = useCompare();
  const count = compareItems.length;
  
  // Check if this specific instrument is in compare list
  const isThisInstrumentAdded = instrumentId ? isInCompare(instrumentId) : false;
  
  // Generate URL with instrument IDs for compare page
  const getCompareUrl = () => {
    if (compareItems.length === 0) return "/compare";
    const ids = compareItems.map(item => item.instrumentId).join('+');
    return `/compare/${ids}`;
  };

  // Determine button text based on state
  const getButtonText = () => {
    if (onClick && instrumentId) {
      // For individual instrument buttons
      return isThisInstrumentAdded ? "Added" : "Compare";
    } else {
      // For navigation buttons
      return count > 0 ? `Compare (${count})` : "Compare";
    }
  };

  if (onClick) {
    return (
      <Button 
        variant={isThisInstrumentAdded ? "default" : "secondary"}
        onClick={onClick}
        size="sm"
      >
        {getButtonText()}
      </Button>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={getCompareUrl()} className={`
        inline-flex items-center justify-center px-3 py-1 
        bg-primary text-primary-foreground rounded-[10px] text-sm font-medium
        hover:bg-primary/90 transition-colors
      `}>
        {getButtonText()}
      </Link>
    );
  }

  return (
    <Button 
      asChild
      variant={count > 0 ? "default" : "secondary"}
    >
      <Link to={getCompareUrl()}>
        {getButtonText()}
      </Link>
    </Button>
  );
};

export default CompareButton;
