import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, RefreshCw, Calendar, Mail, Phone, User, Trash2, AlertCircle } from 'lucide-react';
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
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  // Add: Manual sync explanation for admin in debug
  const handleManualProfileSync = () => {
    alert(
      `Manual Sync Required:\n\nIt looks like users in your admin are not in sync with your Supabase Auth users.\n\nTo resolve: Run the profiles backfill SQL migration again in the Supabase SQL Editor. If you need the SQL, contact your developer or run the one previously added via Lovable AI.\n\nAfter running, refresh this page.`
    );
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('[UserManager] Fetching users from `profiles` table');

      // Attempt to fetch all users from 'profiles' in one go without any intermediate testing query.
      const { data, error, count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (error) {
        setError(`Database error: ${error.message}`);
        console.error('[UserManager] Supabase error fetching profiles:', error);
        toast({
          title: "Database Error",
          description: `Failed to fetch users: ${error.message}`,
          variant: "destructive"
        });
        setUsers([]);
        setLastFetch(new Date());
        return;
      }

      if (!data) {
        setError('No data received from Supabase');
        setUsers([]);
        setLastFetch(new Date());
        return;
      }

      console.log(`[UserManager] Profiles fetched: ${data.length} users`);
      setUsers(data);
      setLastFetch(new Date());
      if (data.length > 0) {
        toast({
          title: "Users Loaded",
          description: `Successfully loaded ${data.length} users`,
        });
      }
    } catch (error) {
      console.error('[UserManager] Unexpected error:', error);
      setError('Unexpected error occurred while fetching users');
      toast({
        title: "Unexpected Error",
        description: "Failed to load user data.",
        variant: "destructive"
      });
      setUsers([]);
      setLastFetch(new Date());
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName || 'Unknown User'}"? This action cannot be undone.`)) {
      return;
    }

    try {
      console.log('UserManager: Deleting user:', { userId, userName });
      
      // Delete user's orders first (if any)
      const { error: ordersError } = await supabase
        .from('orders')
        .delete()
        .eq('user_id', userId);

      if (ordersError) {
        console.error('UserManager: Error deleting user orders:', ordersError);
        // Continue anyway, as user might not have orders
      }

      // Delete the user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) {
        console.error('UserManager: Error deleting user profile:', profileError);
        throw profileError;
      }

      toast({
        title: "User Deleted",
        description: `User "${userName || 'Unknown User'}" has been deleted successfully.`
      });

      // Refresh the users list
      fetchUsers();
    } catch (error) {
      console.error('UserManager: Error deleting user:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the user. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchUsers();

    // Real-time: fetch on any change in 'profiles'
    const channel = supabase
      .channel('public:profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          fetchUsers();
        }
      )
      .subscribe();

    // Polling as backup: fetch every 10 seconds
    const pollInterval = setInterval(() => {
      fetchUsers();
    }, 10000); // 10 seconds

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('UserManager: Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Add: Show warning if users.length < 3 (assuming you expect at least 3)
  const showSyncWarning = users.length < 3;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-red-600" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
            <p className="text-gray-600">View and manage user registrations</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={fetchUsers}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="secondary"
            onClick={handleManualProfileSync}
            className="flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            Manual Profile Sync
          </Button>
        </div>
      </div>

      {/* Sync warning */}
      {showSyncWarning && (
        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-md mb-2 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <span className="text-sm text-yellow-800">
            User profiles appear incomplete. Run the backfill SQL on Supabase to sync all Auth users.
          </span>
        </div>
      )}

      {/* Add more console debugging at top */}
      <pre className="text-xs bg-gray-100 p-2 rounded max-w-full overflow-x-auto mt-0 text-gray-600">
        Total profiles loaded: {users.length}
      </pre>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Error Loading Users</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
                <p className="mt-2 text-xs">
                  Make sure your Supabase connection is properly configured and the profiles table exists.
                </p>
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
                {error ? 'Check the error message above' : 'Users will appear here after they sign up'}
              </p>
              {!error && (
                <Button 
                  variant="outline" 
                  onClick={fetchUsers} 
                  className="mt-4"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry Loading
                </Button>
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
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
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
      <div className="text-xs text-gray-400 text-right pb-2">
        Last user fetch at: {lastFetch ? lastFetch.toLocaleTimeString() : "Never"}
      </div>
    </div>
  );
};

export default UserManager;
