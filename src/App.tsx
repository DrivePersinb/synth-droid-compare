
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CompareProvider } from "./contexts/CompareContext";

// Pages
import Index from "./pages/Index";
import AllInstruments from "./pages/AllInstruments";
import BrandsOverview from "./pages/BrandsOverview";
import BrandPage from "./pages/BrandPage";
import ProductDetail from "./pages/ProductDetail";
import ComparePage from "./pages/ComparePage";
import LatestInstruments from "./pages/LatestInstruments";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CompareProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/all-instruments" element={<AllInstruments />} />
            <Route path="/brands" element={<BrandsOverview />} />
            <Route path="/brands/:brandName" element={<BrandPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/latest" element={<LatestInstruments />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CompareProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
