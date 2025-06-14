
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, RefreshCw, Calendar, Mail, Phone, User, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

const UserManager = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session, user, isAuthenticated } = useAuth();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('UserManager: Starting user fetch...');
      
      // Wait a bit for auth to be ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check authentication state
      if (!isAuthenticated || !session || !user) {
        console.error('UserManager: No authenticated session found');
        setError('You must be logged in to view user data');
        setLoading(false);
        return;
      }

      console.log('UserManager: Authenticated as:', user.email, 'Session valid:', !!session.access_token);
      
      // Try to fetch profiles with detailed logging
      console.log('UserManager: Fetching profiles from database...');
      const { data, error, count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      console.log('UserManager: Database query result:', { 
        dataLength: data?.length, 
        totalCount: count,
        hasError: !!error,
        errorMessage: error?.message,
        errorDetails: error?.details,
        errorCode: error?.code,
        sampleData: data?.slice(0, 1)
      });

      if (error) {
        console.error('UserManager: Database error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        let errorMessage = 'Failed to fetch user data';
        
        if (error.code === 'PGRST116') {
          errorMessage = 'The profiles table does not exist or is not accessible';
        } else if (error.message?.includes('permission') || error.message?.includes('policy')) {
          errorMessage = 'Access denied: Insufficient permissions to view user data';
        } else if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
          errorMessage = 'Database table not found. Please check the database setup.';
        } else {
          errorMessage = `Database error: ${error.message}`;
        }
        
        setError(errorMessage);
        toast({
          title: "Database Error",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      console.log('UserManager: Successfully fetched users:', data?.length || 0);
      setUsers(data || []);
      
      if (!data || data.length === 0) {
        console.log('UserManager: No users found in profiles table');
        toast({
          title: "No Users Found",
          description: "No user registrations found in the database.",
          variant: "default"
        });
      } else {
        console.log('UserManager: Users loaded successfully:', data.map(u => ({ id: u.id.slice(0, 8), email: u.email })));
      }
      
    } catch (error) {
      console.error('UserManager: Unexpected error during fetch:', error);
      setError('An unexpected error occurred while fetching users');
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred while loading user data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName || 'Unknown User'}"? This action cannot be undone and will also delete all their orders.`)) {
      return;
    }

    try {
      console.log('UserManager: Deleting user:', userId);
      
      // First delete user's orders
      const { error: ordersError } = await supabase
        .from('orders')
        .delete()
        .eq('user_id', userId);

      if (ordersError) {
        console.error('UserManager: Error deleting user orders:', ordersError);
      }

      // Then delete the user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) {
        throw profileError;
      }

      toast({
        title: "User Deleted",
        description: `User "${userName || 'Unknown User'}" and all their data has been deleted successfully.`
      });

      // Refresh the users list
      fetchUsers();
    } catch (error) {
      console.error('UserManager: Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete the user. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    console.log('UserManager: Component mounted, auth state:', { 
      isAuthenticated, 
      hasSession: !!session, 
      hasUser: !!user 
    });
    
    // Add a delay to allow auth to properly initialize
    const timer = setTimeout(() => {
      if (isAuthenticated && session && user) {
        console.log('UserManager: Auth ready, fetching users');
        fetchUsers();
      } else {
        console.log('UserManager: Auth not ready yet');
        setLoading(false);
        setError('Authentication required to view user data');
      }
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, [isAuthenticated, session, user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show authentication message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-red-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
              <p className="text-gray-600">View and manage user registrations</p>
            </div>
          </div>
        </div>
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">Authentication Required</p>
              <p className="text-sm mt-2 text-gray-600">
                Please sign in to access user management features.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-red-600" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
            <p className="text-gray-600">View and manage user registrations</p>
          </div>
        </div>
        <Button 
          onClick={fetchUsers}
          disabled={loading || !isAuthenticated}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error Loading Users</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs font-medium">Troubleshooting Information</summary>
                  <div className="mt-2 text-xs space-y-1">
                    <p>• Check that you are logged in as an admin</p>
                    <p>• Verify that the profiles table exists in the database</p>
                    <p>• Ensure Row Level Security policies allow admin access</p>
                    <p>• Check browser console for detailed error messages</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Registered Users ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-600">Loading users...</span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">No users found</p>
              <p className="text-sm mt-2">Users will appear here after they sign up and verify their accounts</p>
              {error && (
                <p className="text-sm mt-2 text-red-600">
                  There may be a database configuration issue. Check the error message above.
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.full_name || 'No name provided'}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {user.id.slice(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {user.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-gray-400" />
                              <span>{user.email}</span>
                            </div>
                          )}
                          {user.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                          {!user.email && !user.phone && (
                            <span className="text-sm text-gray-400">No contact info</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-3 w-3" />
                          {formatDate(user.created_at)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id, user.full_name || user.email || 'Unknown User')}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManager;
