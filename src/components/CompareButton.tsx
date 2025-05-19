
import React from "react";
import { Link } from "react-router-dom";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";

interface CompareButtonProps {
  variant?: "default" | "compact";
}

const CompareButton: React.FC<CompareButtonProps> = ({ variant = "default" }) => {
  const { compareItems } = useCompare();
  const count = compareItems.length;

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
