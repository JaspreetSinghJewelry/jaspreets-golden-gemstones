
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const AdminAccess = () => {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    console.log('AdminAccess: Navigating to admin panel');
    navigate('/admin');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleAdminAccess}
        variant="outline"
        size="sm"
        className="bg-white shadow-lg border-2 hover:bg-gray-50"
      >
        <Settings className="h-4 w-4 mr-2" />
        Admin Panel
      </Button>
    </div>
  );
};

export default AdminAccess;
