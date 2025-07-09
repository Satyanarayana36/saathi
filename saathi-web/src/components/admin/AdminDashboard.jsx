import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  MapPin, 
  Clock, 
  TrendingUp,
  Eye,
  Filter,
  Download,
  RefreshCw,
  Search,
  Calendar,
  MoreVertical,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with real API calls
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setAlerts([
        {
          id: 1,
          user: { name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 234-567-8900' },
          location: { lat: 40.7128, lng: -74.0060, address: 'Times Square, New York' },
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          status: 'active',
          severity: 'high',
          responded: false,
          responseTime: null
        },
        {
          id: 2,
          user: { name: 'Emily Davis', email: 'emily@example.com', phone: '+1 234-567-8901' },
          location: { lat: 34.0522, lng: -118.2437, address: 'Downtown LA, California' },
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'resolved',
          severity: 'medium',
          responded: true,
          responseTime: 180
        },
        {
          id: 3,
          user: { name: 'Jessica Brown', email: 'jessica@example.com', phone: '+1 234-567-8902' },
          location: { lat: 41.8781, lng: -87.6298, address: 'Chicago Loop, Illinois' },
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          status: 'investigating',
          severity: 'high',
          responded: true,
          responseTime: 120
        }
      ]);

      setUsers([
        { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active', lastSeen: new Date(), emergencyContacts: 3 },
        { id: 2, name: 'Emily Davis', email: 'emily@example.com', status: 'active', lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), emergencyContacts: 2 },
        { id: 3, name: 'Jessica Brown', email: 'jessica@example.com', status: 'active', lastSeen: new Date(Date.now() - 30 * 60 * 1000), emergencyContacts: 4 }
      ]);

      setAnalytics({
        totalAlerts: 156,
        activeAlerts: 3,
        resolvedAlerts: 153,
        avgResponseTime: 145,
        totalUsers: 1250,
        activeUsers: 890
      });

      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAlertAction = (alertId, action) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: action === 'resolve' ? 'resolved' : 'investigating' }
        : alert
    ));
    toast.success(`Alert ${action === 'resolve' ? 'resolved' : 'updated'} successfully`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filterStatus === 'all' || alert.status === filterStatus;
    const matchesSearch = alert.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading admin dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-slate-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                <Shield className="w-8 h-8 text-primary-600" />
                <span>Admin Control Center</span>
              </h1>
              <p className="text-slate-600">System monitoring and emergency management</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-600">System Online</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-slate-600 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            className="card bg-gradient-to-r from-red-500 to-red-600 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Active Alerts</p>
                <p className="text-3xl font-bold">{analytics.activeAlerts}</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-red-200" />
            </div>
          </motion.div>

          <motion.div
            className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Users</p>
                <p className="text-3xl font-bold">{analytics.totalUsers}</p>
              </div>
              <Users className="w-12 h-12 text-blue-200" />
            </div>
          </motion.div>

          <motion.div
            className="card bg-gradient-to-r from-green-500 to-green-600 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Resolved Today</p>
                <p className="text-3xl font-bold">{analytics.resolvedAlerts}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </motion.div>

          <motion.div
            className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg Response</p>
                <p className="text-3xl font-bold">{analytics.avgResponseTime}s</p>
              </div>
              <Clock className="w-12 h-12 text-purple-200" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts Management */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Emergency Alerts</h2>
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <RefreshCw className="w-5 h-5 text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              {/* Alerts List */}
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    className={`p-4 border-l-4 bg-slate-50 rounded-xl ${getSeverityColor(alert.severity)}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-slate-900">{alert.user.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </span>
                          <span className="text-xs text-slate-500">
                            {alert.timestamp.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{alert.location.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>{alert.user.phone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedAlert(alert)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {alert.status === 'active' && (
                          <>
                            <button
                              onClick={() => handleAlertAction(alert.id, 'investigate')}
                              className="px-3 py-1 bg-yellow-500 text-white text-xs rounded-lg hover:bg-yellow-600 transition-colors"
                            >
                              Investigate
                            </button>
                            <button
                              onClick={() => handleAlertAction(alert.id, 'resolve')}
                              className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
                            >
                              Resolve
                            </button>
                          </>
                        )}
                        
                        {alert.status === 'investigating' && (
                          <button
                            onClick={() => handleAlertAction(alert.id, 'resolve')}
                            className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* System Status */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Emergency Services</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Location Services</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Notification System</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Users */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Users</h3>
              <div className="space-y-3">
                {users.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 text-sm">{user.name}</h4>
                      <p className="text-xs text-slate-500">
                        {user.emergencyContacts} contacts • {user.lastSeen.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span>Send System Alert</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-blue-500" />
                    <span>Export Reports</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span>View Analytics</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Detail Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Alert Details</h3>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* User Info */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">User Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Name:</span>
                      <span className="ml-2 font-medium">{selectedAlert.user.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Email:</span>
                      <span className="ml-2 font-medium">{selectedAlert.user.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Phone:</span>
                      <span className="ml-2 font-medium">{selectedAlert.user.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAlert.status)}`}>
                        {selectedAlert.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location Info */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Location Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-600">Address:</span>
                      <span className="ml-2 font-medium">{selectedAlert.location.address}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Coordinates:</span>
                      <span className="ml-2 font-medium">
                        {selectedAlert.location.lat}, {selectedAlert.location.lng}
                      </span>
                    </div>
                  </div>
                  {/* Map placeholder */}
                  <div className="mt-3 h-48 bg-slate-100 rounded-xl flex items-center justify-center">
                    <div className="text-center text-slate-500">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Interactive map would be displayed here</p>
                    </div>
                  </div>
                </div>

                {/* Alert Timeline */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Alert triggered</p>
                        <p className="text-slate-500">{selectedAlert.timestamp.toLocaleString()}</p>
                      </div>
                    </div>
                    {selectedAlert.responded && (
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Response initiated</p>
                          <p className="text-slate-500">Response time: {selectedAlert.responseTime}s</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setSelectedAlert(null)}
                    className="flex-1 px-4 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Close
                  </button>
                  {selectedAlert.status !== 'resolved' && (
                    <button
                      onClick={() => {
                        handleAlertAction(selectedAlert.id, 'resolve');
                        setSelectedAlert(null);
                      }}
                      className="flex-1 btn-primary"
                    >
                      Mark as Resolved
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;