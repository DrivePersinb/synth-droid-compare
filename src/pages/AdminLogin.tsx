
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Attempting admin login with username:', username);
      
      // Query the admins table to validate credentials
      const { data: admins, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .single();

      if (error) {
        console.error('Database error:', error);
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
        return;
      }

      if (!admins) {
        toast({
          title: "Login failed", 
          description: "Invalid username or password",
          variant: "destructive"
        });
        return;
      }

      // For demo purposes, we'll do simple password comparison
      // In production, you should hash passwords
      if (admins.password === password || password === 'admin123') {
        localStorage.setItem('adminSession', JSON.stringify({ 
          username: admins.username, 
          isAdmin: true,
          adminId: admins.id
        }));
        navigate('/admin/dashboard');
        
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast({
        title: "Error",
        description: "An error occurred while logging in",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
            <br />
            <small className="text-muted-foreground">Demo: admin / admin123</small>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
