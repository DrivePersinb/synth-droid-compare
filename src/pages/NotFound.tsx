
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/">Go Home</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/all-instruments">Browse Instruments</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
