
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, RefreshCw, Calendar, Mail, Phone, User, Trash2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthUser {
  id: string;
  email: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
}

const UserManager = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [authUsers, setAuthUsers] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching all users from profiles table...');
      
      // Fetch profiles data
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Profiles fetch error:', profilesError);
        setError(`Database error: ${profilesError.message}`);
        setUsers([]);
      } else {
        console.log('Profiles data fetched:', profilesData?.length || 0, 'users');
        setUsers(profilesData || []);
      }

      // Also try to get auth users count for comparison
      try {
        console.log('Checking auth users...');
        const { count, error: countError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (!countError) {
          console.log('Total users in profiles table:', count);
        }
      } catch (e) {
        console.log('Could not get auth users count:', e);
      }

    } catch (error) {
      console.error('Unexpected error:', error);
      setError('Unexpected error occurred while fetching users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName || 'Unknown User'}"? This will also delete all their orders. This action cannot be undone.`)) {
      return;
    }
    
    setDeleting(userId);
    
    try {
      console.log('Deleting user:', userId);
      
      // First delete user's orders
      const { error: ordersError } = await supabase
        .from('orders')
        .delete()
        .eq('user_id', userId);
      
      if (ordersError) {
        console.error('Error deleting user orders:', ordersError);
      }
      
      // Then delete user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (profileError) {
        console.error('Error deleting user profile:', profileError);
        toast({
          title: "Delete Failed",
          description: "Failed to delete the user profile. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "User Deleted",
        description: `User "${userName || 'Unknown User'}" has been deleted successfully.`
      });
      
      // Remove from local state and refresh
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setTimeout(() => fetchUsers(), 500);
      
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the user. Please try again.",
        variant: "destructive"
      });
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchUsers();

    // Set up real-time subscription for profile changes
    const channel = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          console.log('Profiles table changed:', payload);
          fetchUsers();
        }
      )
      .subscribe();

    // Poll for updates every 30 seconds
    const pollInterval = setInterval(() => {
      console.log('Polling for user updates...');
      fetchUsers();
    }, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (_error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-red-600" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
            <p className="text-gray-600">View and manage all registered users</p>
          </div>
        </div>
        <Button
          onClick={fetchUsers}
          disabled={loading}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Error Loading Users</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
                <p className="mt-1 text-xs">Note: Make sure users have profiles created when they sign up.</p>
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
              <p className="text-sm mt-2">
                {error ? 'Check the error message above' : 'Users will appear here after they sign up and profiles are created'}
              </p>
              <Button variant="outline" onClick={fetchUsers} className="mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Users
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-mono text-xs text-gray-800 max-w-[200px] truncate">
                          {user.id}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {user.full_name || "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {user.email || <span className="text-gray-400">N/A</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {user.phone || <span className="text-gray-400">N/A</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {formatDate(user.created_at)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {formatDate(user.updated_at)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.email ? (
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                            <User className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-500 border-gray-200">
                            Incomplete
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id, user.full_name || user.email || 'Unknown User')}
                          disabled={deleting === user.id}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          {deleting === user.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          {deleting === user.id ? 'Deleting...' : 'Delete'}
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

      {users.length > 0 && (
        <div className="text-sm text-gray-500 text-center">
          <p>Total registered users: {users.length}</p>
          <p className="mt-1">Data refreshes automatically every 30 seconds</p>
        </div>
      )}
    </div>
  );
};

export default UserManager;
