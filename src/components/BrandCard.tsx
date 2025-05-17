
import { Link } from "react-router-dom";
import { Brand } from "@/data/instrumentTypes";

interface BrandCardProps {
  brand: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const brandColors = {
    Roland: "from-roland/20 to-roland/40 hover:from-roland/30 hover:to-roland/50 border-roland/50",
    Casio: "from-casio/20 to-casio/40 hover:from-casio/30 hover:to-casio/50 border-casio/50",
    Yamaha: "from-yamaha/20 to-yamaha/40 hover:from-yamaha/30 hover:to-yamaha/50 border-yamaha/50",
    Korg: "from-korg/20 to-korg/40 hover:from-korg/30 hover:to-korg/50 border-korg/50",
  };

  return (
    <Link 
      to={`/brands/${brand.toLowerCase()}`} 
      className={`
        brand-card border 
        bg-gradient-to-br ${brandColors[brand]}
      `}
    >
      <div className="text-3xl font-bold mb-2">{brand}</div>
      <p className="text-sm text-gray-300">View all {brand} instruments</p>
    </Link>
  );
};

export default BrandCard;
