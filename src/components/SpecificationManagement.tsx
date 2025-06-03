
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import {
  useSpecCategories,
  useSpecFields,
  useAddSpecCategory,
  useAddSpecField,
  useDeleteSpecCategory,
  useDeleteSpecField
} from "@/hooks/useSpecifications";

const SpecificationManagement = () => {
  const { toast } = useToast();
  const { data: categories = [] } = useSpecCategories();
  const { data: fields = [] } = useSpecFields();
  
  const addCategory = useAddSpecCategory();
  const addField = useAddSpecField();
  const deleteCategory = useDeleteSpecCategory();
  const deleteField = useDeleteSpecField();

  const [newCategory, setNewCategory] = useState({ name: "", display_order: categories.length + 1 });
  const [newField, setNewField] = useState({
    category_id: "",
    name: "",
    display_name: "",
    display_order: 1
  });

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      await addCategory.mutateAsync(newCategory);
      setNewCategory({ name: "", display_order: categories.length + 2 });
      toast({
        title: "Success",
        description: "Category added successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive"
      });
    }
  };

  const handleAddField = async () => {
    if (!newField.category_id || !newField.name.trim() || !newField.display_name.trim()) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }

    try {
      await addField.mutateAsync(newField);
      setNewField({
        category_id: "",
        name: "",
        display_name: "",
        display_order: 1
      });
      toast({
        title: "Success",
        description: "Specification field added successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add specification field",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory.mutateAsync(id);
      toast({
        title: "Success",
        description: "Category deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive"
      });
    }
  };

  const handleDeleteField = async (id: string) => {
    try {
      await deleteField.mutateAsync(id);
      toast({
        title: "Success",
        description: "Specification field deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete specification field",
        variant: "destructive"
      });
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || "Unknown";
  };

  return (
    <div className="space-y-6">
      {/* Add Category Section */}
      <Card>
        <CardHeader>
          <CardTitle>Add Specification Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Audio, Physical, etc."
              />
            </div>
            <div className="w-32">
              <Label htmlFor="category-order">Display Order</Label>
              <Input
                id="category-order"
                type="number"
                value={newCategory.display_order}
                onChange={(e) => setNewCategory(prev => ({ ...prev, display_order: Number(e.target.value) }))}
              />
            </div>
            <Button onClick={handleAddCategory} disabled={addCategory.isPending}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Field Section */}
      <Card>
        <CardHeader>
          <CardTitle>Add Specification Field</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="field-category">Category</Label>
              <Select value={newField.category_id} onValueChange={(value) => setNewField(prev => ({ ...prev, category_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="field-name">Field Name (JSON key)</Label>
              <Input
                id="field-name"
                value={newField.name}
                onChange={(e) => setNewField(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., polyphony"
              />
            </div>
            <div>
              <Label htmlFor="field-display">Display Name</Label>
              <Input
                id="field-display"
                value={newField.display_name}
                onChange={(e) => setNewField(prev => ({ ...prev, display_name: e.target.value }))}
                placeholder="e.g., Polyphony"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="field-order">Order</Label>
                <Input
                  id="field-order"
                  type="number"
                  value={newField.display_order}
                  onChange={(e) => setNewField(prev => ({ ...prev, display_order: Number(e.target.value) }))}
                />
              </div>
              <Button onClick={handleAddField} disabled={addField.isPending} className="mt-6">
                <Plus className="w-4 h-4 mr-2" />
                Add Field
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>Categories ({categories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">Order: {category.display_order}</span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                  disabled={deleteCategory.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fields List */}
      <Card>
        <CardHeader>
          <CardTitle>Specification Fields ({fields.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {fields.map(field => (
              <div key={field.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium">{field.display_name}</span>
                  <span className="text-sm text-muted-foreground ml-2">({field.name})</span>
                  <span className="text-sm text-primary ml-2">{getCategoryName(field.category_id || "")}</span>
                  <span className="text-sm text-muted-foreground ml-2">Order: {field.display_order}</span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteField(field.id)}
                  disabled={deleteField.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecificationManagement;
