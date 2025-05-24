
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
      <Link to="/compare" className={`
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
      <Link to="/compare">
        {count > 0 ? `Compare (${count})` : "Compare"}
      </Link>
    </Button>
  );
};

export default CompareButton;
