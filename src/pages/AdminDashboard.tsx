
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { brands } from "@/data/instruments";
import { createNewInstrument } from "@/data/template";

const AdminDashboard = () => {
  const { isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    brand: brands[0],
    price: "",
    releaseYear: new Date().getFullYear().toString(),
    description: "",
    specs: {
      keys: "61",
      keyType: "Semi-weighted",
      soundEngine: "",
      polyphony: "128",
      presets: "500",
      sequencer: true,
      effects: "30",
      outputs: "2",
      weight: "15 lbs"
    }
  });
  
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not admin
  if (!loading && !isAdmin) {
    navigate("/");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      specs: {
        ...formData.specs,
        [name]: type === "checkbox" ? checked : value
      }
    });
  };

  const handleBrandChange = (value: string) => {
    setFormData({ ...formData, brand: value as any });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setUploading(true);

    try {
      // Generate a unique ID for the instrument
      const instrumentId = `${formData.brand.toLowerCase()}-${formData.name.toLowerCase().replace(/\s+/g, '-')}-${uuidv4().slice(0, 8)}`;

      // Upload image if provided
      let imageUrl = "/placeholder.svg";
      
      if (image) {
        const fileExt = image.name.split('.').pop();
        const filePath = `${instrumentId}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('instrument-images')
          .upload(filePath, image);
          
        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }
        
        // Get the public URL for the uploaded image
        const { data } = supabase.storage
          .from('instrument-images')
          .getPublicUrl(filePath);
          
        imageUrl = data.publicUrl;
      }

      // Create the instrument object
      const instrument = {
        id: instrumentId,
        name: formData.name,
        brand: formData.brand,
        image: imageUrl,
        price: parseFloat(formData.price),
        rating: 4.5, // Default rating
        releaseYear: parseInt(formData.releaseYear),
        description: formData.description,
        specs: {
          keys: parseInt(formData.specs.keys),
          keyType: formData.specs.keyType,
          soundEngine: formData.specs.soundEngine,
          polyphony: parseInt(formData.specs.polyphony),
          presets: parseInt(formData.specs.presets),
          sequencer: formData.specs.sequencer,
          effects: parseInt(formData.specs.effects),
          outputs: parseInt(formData.specs.outputs),
          weight: formData.specs.weight
        },
        compareCount: 0,
        popularityScore: 50
      };

      // Add to database
      const { error: insertError } = await supabase
        .from('instruments')
        .insert(instrument);

      if (insertError) {
        throw new Error(`Error adding instrument: ${insertError.message}`);
      }

      toast({
        title: "Success",
        description: "Instrument added successfully!",
      });

      // Reset form
      setFormData({
        name: "",
        brand: brands[0],
        price: "",
        releaseYear: new Date().getFullYear().toString(),
        description: "",
        specs: {
          keys: "61",
          keyType: "Semi-weighted",
          soundEngine: "",
          polyphony: "128",
          presets: "500",
          sequencer: true,
          effects: "30",
          outputs: "2",
          weight: "15 lbs"
        }
      });
      setImage(null);

    } catch (error: any) {
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="container py-12 text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="destructive" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </Button>
        </div>
        
        <div className="bg-androidBox p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Instrument</h2>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Instrument Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Jupiter-X"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium mb-1">
                    Brand
                  </label>
                  <Select
                    value={formData.brand}
                    onValueChange={handleBrandChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium mb-1">
                    Price (USD)
                  </label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 1999"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="releaseYear" className="block text-sm font-medium mb-1">
                    Release Year
                  </label>
                  <Input
                    id="releaseYear"
                    name="releaseYear"
                    type="number"
                    value={formData.releaseYear}
                    onChange={handleInputChange}
                    placeholder="e.g. 2023"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="image" className="block text-sm font-medium mb-1">
                    Product Image
                  </label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 800x600px, max 2MB
                  </p>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={4}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Specifications</h3>
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="keys" className="block text-sm font-medium mb-1">
                      Keys
                    </label>
                    <Input
                      id="keys"
                      name="keys"
                      type="number"
                      value={formData.specs.keys}
                      onChange={handleSpecChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="keyType" className="block text-sm font-medium mb-1">
                      Key Type
                    </label>
                    <Input
                      id="keyType"
                      name="keyType"
                      value={formData.specs.keyType}
                      onChange={handleSpecChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="soundEngine" className="block text-sm font-medium mb-1">
                      Sound Engine
                    </label>
                    <Input
                      id="soundEngine"
                      name="soundEngine"
                      value={formData.specs.soundEngine}
                      onChange={handleSpecChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="polyphony" className="block text-sm font-medium mb-1">
                      Polyphony
                    </label>
                    <Input
                      id="polyphony"
                      name="polyphony"
                      type="number"
                      value={formData.specs.polyphony}
                      onChange={handleSpecChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="presets" className="block text-sm font-medium mb-1">
                      Presets
                    </label>
                    <Input
                      id="presets"
                      name="presets"
                      type="number"
                      value={formData.specs.presets}
                      onChange={handleSpecChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="effects" className="block text-sm font-medium mb-1">
                      Effects
                    </label>
                    <Input
                      id="effects"
                      name="effects"
                      type="number"
                      value={formData.specs.effects}
                      onChange={handleSpecChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="outputs" className="block text-sm font-medium mb-1">
                      Outputs
                    </label>
                    <Input
                      id="outputs"
                      name="outputs"
                      type="number"
                      value={formData.specs.outputs}
                      onChange={handleSpecChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium mb-1">
                      Weight
                    </label>
                    <Input
                      id="weight"
                      name="weight"
                      value={formData.specs.weight}
                      onChange={handleSpecChange}
                      placeholder="e.g. 15 lbs"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sequencer"
                    name="sequencer"
                    checked={formData.specs.sequencer}
                    onChange={handleSpecChange}
                    className="rounded"
                  />
                  <label htmlFor="sequencer" className="text-sm font-medium">
                    Has Sequencer
                  </label>
                </div>
              </div>
            </div>
            
            <Button type="submit" size="lg" disabled={uploading}>
              {uploading ? "Uploading..." : "Add Instrument"}
            </Button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
