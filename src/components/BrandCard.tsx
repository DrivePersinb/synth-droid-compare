
import { Link } from "react-router-dom";

interface BrandCardProps {
  brand: string;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  // Define some default colors for known brands, fallback for new ones
  const getBrandColors = (brandName: string) => {
    const colors: Record<string, string> = {
      Roland: "from-red-500/20 to-red-500/40 hover:from-red-500/30 hover:to-red-500/50 border-red-500/50",
      Casio: "from-blue-500/20 to-blue-500/40 hover:from-blue-500/30 hover:to-blue-500/50 border-blue-500/50",
      Yamaha: "from-purple-500/20 to-purple-500/40 hover:from-purple-500/30 hover:to-purple-500/50 border-purple-500/50",
      Korg: "from-green-500/20 to-green-500/40 hover:from-green-500/30 hover:to-green-500/50 border-green-500/50",
    };
    
    return colors[brandName] || "from-gray-500/20 to-gray-500/40 hover:from-gray-500/30 hover:to-gray-500/50 border-gray-500/50";
  };

  return (
    <Link 
      to={`/brands/${brand.toLowerCase()}`} 
      className={`
        brand-card border group
        bg-gradient-to-br ${getBrandColors(brand)}
      `}
    >
      <div className="text-2xl sm:text-3xl font-bold mb-2">{brand}</div>
      <p className="text-xs sm:text-sm text-gray-300">View all {brand} instruments</p>
    </Link>
  );
};

export default BrandCard;
