
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <CompareProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/all-instruments" element={<AllInstruments />} />
          <Route path="/brands" element={<BrandsOverview />} />
          <Route path="/brands/:brandName" element={<BrandPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/latest" element={<LatestInstruments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CompareProvider>
  </TooltipProvider>
);

export default App;
