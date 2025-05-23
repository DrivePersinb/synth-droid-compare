
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AdminRequiredAuth from "@/components/AdminRequiredAuth";
import InstrumentManagement from "@/components/InstrumentManagement";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  brand: z.string().min(2, { message: "Brand must be at least 2 characters" }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  category: z.string().min(2, { message: "Category is required" }),
  subcategory: z.string().optional(),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  releaseYear: z.string().refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) > 0), {
    message: "Release year must be a valid year",
  }).optional(),
  rating: z.string().refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 5), {
    message: "Rating must be between 0 and 5",
  }).optional(),
  specs: z.string().min(5, { message: "Specifications are required" }),
  image: z.string().optional(),
  buyLinks: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: "",
      category: "",
      subcategory: "",
      description: "",
      releaseYear: "",
      rating: "",
      specs: "",
      image: "",
      buyLinks: "",
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/admin');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const parseBuyLinks = (buyLinksStr: string) => {
    if (!buyLinksStr.trim()) return [];
    
    try {
      return JSON.parse(buyLinksStr);
    } catch {
      // If JSON parsing fails, try simple format: store1:url1,store2:url2
      const links = buyLinksStr.split(',');
      return links.map(link => {
        const [store, url] = link.split(':').map(s => s.trim());
        return { store, url };
      }).filter(link => link.store && link.url);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Starting instrument submission...");
      
      // Parse buy links
      const buyLinks = parseBuyLinks(values.buyLinks || "");
      
      // Parse numeric values
      const instrumentData = {
        name: values.name,
        brand: values.brand,
        price: Number(values.price),
        category: values.category,
        subcategory: values.subcategory || null,
        description: values.description,
        release_year: values.releaseYear ? Number(values.releaseYear) : null,
        rating: values.rating ? Number(values.rating) : null,
        specs: {
          ...parseSpecifications(values.specs),
          buyLinks: buyLinks
        },
        image: imagePreview || '/placeholder.svg',
        compare_count: 0,
        popularity_score: 50
      };

      console.log("Instrument data prepared:", instrumentData);

      const { data, error } = await supabase
        .from('instruments')
        .insert([instrumentData])
        .select();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log("Instrument added successfully:", data);
      
      // Invalidate and refetch instruments data
      queryClient.invalidateQueries({ queryKey: ['instruments'] });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      
      // Reset form after successful submission
      form.reset();
      setImageFile(null);
      setImagePreview(null);

      toast({
        title: "Success",
        description: "Instrument added successfully! It will now appear on the website.",
      });
    } catch (error: any) {
      console.error('Error adding instrument:', error);
      toast({
        title: "Error",
        description: `Failed to add instrument: ${error.message || 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const parseSpecifications = (specsStr: string): Record<string, any> => {
    try {
      // Try parsing as JSON first
      try {
        return JSON.parse(specsStr);
      } catch {
        // If JSON parsing fails, try key-value format
        const specs: Record<string, any> = {};
        const lines = specsStr.split('\n');
        
        lines.forEach(line => {
          const [key, value] = line.split(':').map(part => part.trim());
          if (key && value) {
            // Try to convert to number if possible
            const numValue = Number(value);
            specs[key] = !isNaN(numValue) ? numValue : value;
          }
        });
        
        return specs;
      }
    } catch (error) {
      console.error("Error parsing specs:", error);
      return { rawSpecs: specsStr };
    }
  };

  return (
    <AdminRequiredAuth>
      <div className="min-h-screen bg-background">
        <header className="bg-black p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </header>

        <main className="container mx-auto p-4 mt-8 space-y-8">
          {/* Instrument Management Section */}
          <InstrumentManagement />

          {/* Add New Instrument Section */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Instrument</CardTitle>
              <CardDescription>
                Fill out the form below to add a new musical instrument to the database. 
                New brands will automatically appear throughout the website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instrument Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Roland Jupiter-X" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Roland, Korg, Yamaha" {...field} />
                            </FormControl>
                            <FormDescription>
                              New brands will automatically appear on the website
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (₹)*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 50000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Synthesizer, Piano" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subcategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subcategory</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Analog, Digital" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="releaseYear"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Release Year</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 2023" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="rating"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rating (0-5)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 4.5" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description and Specifications */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description*</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Detailed description of the instrument" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specifications*</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter specs as key-value pairs (one per line), e.g.:\nkeys: 61\nkeyType: Semi-weighted\npolyphony: 128" 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter specifications as key-value pairs, one per line (e.g., "keys: 61")
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="buyLinks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Buy Links (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Amazon:https://amazon.in/product,Flipkart:https://flipkart.com/product" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter buy links as Store:URL pairs separated by commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label htmlFor="image" className="block mb-2">
                      Product Image
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mb-2"
                    />
                    {imagePreview && (
                      <div className="mt-2 border rounded-md p-2 w-full max-w-xs">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-auto object-contain max-h-[200px]"
                        />
                      </div>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add Instrument"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
      </div>
    </AdminRequiredAuth>
  );
};

export default AdminDashboard;
