
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminLoggedIn } from '@/utils/adminUtils';
import { useToast } from '@/hooks/use-toast';

interface AdminRequiredAuthProps {
  children: React.ReactNode;
}

const AdminRequiredAuth: React.FC<AdminRequiredAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      toast({
        title: "Access Denied",
        description: "You must be logged in as an admin to view this page",
        variant: "destructive"
      });
      navigate('/admin');
    }
  }, [navigate, toast]);

  // Only render children if admin is logged in
  if (!isAdminLoggedIn()) {
    return null;
  }

  return <>{children}</>;
};

export default AdminRequiredAuth;
