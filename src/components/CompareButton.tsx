
import React from "react";
import { Link } from "react-router-dom";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";

interface CompareButtonProps {
  variant?: "default" | "compact";
  onClick?: () => void;
}

const CompareButton: React.FC<CompareButtonProps> = ({ variant = "default", onClick }) => {
  const { compareItems } = useCompare();
  const count = compareItems.length;

  // Generate URL with instrument IDs
  const getCompareUrl = () => {
    if (compareItems.length === 0) return "/compare";
    const ids = compareItems.map(item => item.instrumentId).join('+');
    return `/compare?ids=${ids}`;
  };

  if (onClick) {
    return (
      <Button 
        variant={count > 0 ? "default" : "secondary"}
        className={count > 0 ? "animate-pulse" : ""}
        onClick={onClick}
      >
        {count > 0 ? `Compare (${count})` : "Compare"}
      </Button>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={getCompareUrl()} className={`
        inline-flex items-center justify-center px-3 py-1 
        bg-primary rounded-md text-sm font-medium
        ${count > 0 ? "animate-pulse" : ""}
      `}>
        {count > 0 ? `Compare (${count})` : "Compare"}
      </Link>
    );
  }

  return (
    <Button 
      asChild
      variant={count > 0 ? "default" : "secondary"}
      className={count > 0 ? "animate-pulse" : ""}
    >
      <Link to={getCompareUrl()}>
        {count > 0 ? `Compare (${count})` : "Compare"}
      </Link>
    </Button>
  );
};

export default CompareButton;
