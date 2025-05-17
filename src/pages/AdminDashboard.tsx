
import { useState, useEffect } from "react";
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
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { brands } from "@/data/instruments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAllInstruments, updateInstrument, deleteInstrument } from "@/services/instrumentService";
import { Instrument } from "@/data/instrumentTypes";
import { Pencil, Trash2 } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading2, setLoading2] = useState(false);
  const [editingInstrument, setEditingInstrument] = useState<Instrument | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Load existing instruments
  useEffect(() => {
    const loadInstruments = async () => {
      try {
        setLoading2(true);
        const data = await fetchAllInstruments();
        setInstruments(data);
      } catch (error) {
        console.error("Error loading instruments:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load instruments",
        });
      } finally {
        setLoading2(false);
      }
    };
    
    loadInstruments();
  }, [toast]);

  // Redirect if not admin
  if (!loading && !isAdmin) {
    navigate("/");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (isEditing && editingInstrument) {
      setEditingInstrument({
        ...editingInstrument,
        [name]: value,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (isEditing && editingInstrument) {
      setEditingInstrument({
        ...editingInstrument,
        specs: {
          ...editingInstrument.specs,
          [name]: type === "checkbox" ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        specs: {
          ...formData.specs,
          [name]: type === "checkbox" ? checked : value
        }
      });
    }
  };

  const handleBrandChange = (value: string) => {
    if (isEditing && editingInstrument) {
      setEditingInstrument({
        ...editingInstrument,
        brand: value as any
      });
    } else {
      setFormData({ ...formData, brand: value as any });
    }
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
      
      // Refresh instrument list
      const updatedInstruments = await fetchAllInstruments();
      setInstruments(updatedInstruments);

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
  
  const handleEdit = (instrument: Instrument) => {
    setEditingInstrument(instrument);
    setIsEditing(true);
  };
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInstrument) return;
    
    try {
      setUploading(true);
      
      // Handle image upload if there's a new image
      let imageUrl = editingInstrument.image;
      
      if (image) {
        const fileExt = image.name.split('.').pop();
        const filePath = `${editingInstrument.id}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('instrument-images')
          .upload(filePath, image, { upsert: true });
          
        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }
        
        // Get the public URL for the uploaded image
        const { data } = supabase.storage
          .from('instrument-images')
          .getPublicUrl(filePath);
          
        imageUrl = data.publicUrl;
      }
      
      // Update the instrument with the new data
      const updatedInstrument = {
        ...editingInstrument,
        image: imageUrl
      };
      
      await updateInstrument(updatedInstrument);
      
      toast({
        title: "Success",
        description: "Instrument updated successfully!",
      });
      
      // Refresh instrument list
      const updatedInstruments = await fetchAllInstruments();
      setInstruments(updatedInstruments);
      
      // Reset form state
      setIsEditing(false);
      setEditingInstrument(null);
      setImage(null);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this instrument? This action cannot be undone.")) {
      try {
        await deleteInstrument(id);
        
        toast({
          title: "Success",
          description: "Instrument deleted successfully!",
        });
        
        // Update the instruments list
        setInstruments(instruments.filter(i => i.id !== id));
        
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  };
  
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingInstrument(null);
    setImage(null);
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
        
        <Tabs defaultValue="instruments">
          <TabsList className="mb-6">
            <TabsTrigger value="add">Add Instrument</TabsTrigger>
            <TabsTrigger value="instruments">Manage Instruments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add" className="bg-androidBox p-6 rounded-lg mb-8">
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
          </TabsContent>
          
          <TabsContent value="instruments" className="bg-androidBox p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Manage Instruments</h2>
            
            {loading2 ? (
              <div className="py-8 text-center">Loading instruments...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Image</th>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Brand</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Year</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instruments.map((instrument) => (
                      <tr key={instrument.id} className="border-b border-gray-700 hover:bg-black/20">
                        <td className="py-3 px-4">
                          <img 
                            src={instrument.image} 
                            alt={instrument.name} 
                            className="w-14 h-14 object-contain bg-black rounded"
                          />
                        </td>
                        <td className="py-3 px-4 font-medium">{instrument.name}</td>
                        <td className="py-3 px-4">{instrument.brand}</td>
                        <td className="py-3 px-4">${instrument.price}</td>
                        <td className="py-3 px-4">{instrument.releaseYear}</td>
                        <td className="py-3 px-4 flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => handleEdit(instrument)}>
                                <Pencil size={15} />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-5xl">
                              <DialogHeader>
                                <DialogTitle>Edit Instrument</DialogTitle>
                              </DialogHeader>
                              
                              {editingInstrument && (
                                <form onSubmit={handleUpdate} className="space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <div>
                                        <label htmlFor="edit-name" className="block text-sm font-medium mb-1">
                                          Instrument Name
                                        </label>
                                        <Input
                                          id="edit-name"
                                          name="name"
                                          value={editingInstrument.name}
                                          onChange={handleInputChange}
                                          required
                                        />
                                      </div>
                                      
                                      <div>
                                        <label htmlFor="edit-brand" className="block text-sm font-medium mb-1">
                                          Brand
                                        </label>
                                        <Select
                                          value={editingInstrument.brand}
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
                                        <label htmlFor="edit-price" className="block text-sm font-medium mb-1">
                                          Price (USD)
                                        </label>
                                        <Input
                                          id="edit-price"
                                          name="price"
                                          type="number"
                                          value={editingInstrument.price}
                                          onChange={(e) => setEditingInstrument({...editingInstrument, price: parseFloat(e.target.value)})}
                                          required
                                        />
                                      </div>
                                      
                                      <div>
                                        <label htmlFor="edit-releaseYear" className="block text-sm font-medium mb-1">
                                          Release Year
                                        </label>
                                        <Input
                                          id="edit-releaseYear"
                                          name="releaseYear"
                                          type="number"
                                          value={editingInstrument.releaseYear}
                                          onChange={(e) => setEditingInstrument({...editingInstrument, releaseYear: parseInt(e.target.value)})}
                                          required
                                        />
                                      </div>
                                      
                                      <div>
                                        <label htmlFor="edit-image" className="block text-sm font-medium mb-1">
                                          Product Image
                                        </label>
                                        <div className="mb-2">
                                          <img 
                                            src={editingInstrument.image} 
                                            alt={editingInstrument.name}
                                            className="h-20 object-contain bg-black rounded p-2" 
                                          />
                                        </div>
                                        <Input
                                          id="edit-image"
                                          name="image"
                                          type="file"
                                          accept="image/*"
                                          onChange={handleImageChange}
                                        />
                                      </div>
                                      
                                      <div>
                                        <label htmlFor="edit-description" className="block text-sm font-medium mb-1">
                                          Description
                                        </label>
                                        <Textarea
                                          id="edit-description"
                                          name="description"
                                          value={editingInstrument.description}
                                          onChange={handleInputChange}
                                          rows={4}
                                          required
                                        />
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                      <h3 className="font-medium">Specifications</h3>
                                      <Separator />
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(editingInstrument.specs).map(([key, value]) => {
                                          if (key === "sequencer") return null;
                                          
                                          return (
                                            <div key={key}>
                                              <label htmlFor={`edit-${key}`} className="block text-sm font-medium mb-1 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                              </label>
                                              <Input
                                                id={`edit-${key}`}
                                                name={key}
                                                type={typeof value === 'number' ? "number" : "text"}
                                                value={value as string | number}
                                                onChange={handleSpecChange}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                      
                                      <div className="flex items-center space-x-2">
                                        <input
                                          type="checkbox"
                                          id="edit-sequencer"
                                          name="sequencer"
                                          checked={!!editingInstrument.specs.sequencer}
                                          onChange={handleSpecChange}
                                          className="rounded"
                                        />
                                        <label htmlFor="edit-sequencer" className="text-sm font-medium">
                                          Has Sequencer
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={cancelEdit}>
                                      Cancel
                                    </Button>
                                    <Button type="submit" disabled={uploading}>
                                      {uploading ? "Updating..." : "Update Instrument"}
                                    </Button>
                                  </div>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(instrument.id)}
                          >
                            <Trash2 size={15} />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {instruments.length === 0 && (
                  <div className="py-8 text-center text-gray-400">
                    No instruments found. Add some instruments to get started.
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
