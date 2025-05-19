
import React from "react";
import { Link } from "react-router-dom";
import { useCompare } from "@/contexts/CompareContext";

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
    <Link 
      to="/compare"
      className={`
        android-btn ${count > 0 
          ? "bg-primary text-white hover:bg-primary/90" 
          : "bg-secondary text-white hover:bg-secondary/90"}
        ${count > 0 ? "animate-pulse" : ""}
      `}
    >
      {count > 0 ? `Compare (${count})` : "Compare"}
    </Link>
  );
};

export default CompareButton;
