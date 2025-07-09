import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, 
  MapPin, 
  Phone, 
  User, 
  Settings, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Heart,
  Battery,
  Wifi,
  Navigation,
  Menu,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout, addEmergencyContact, removeEmergencyContact, updateProfile } = useAuth();
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('checking');
  const [showAddContact, setShowAddContact] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || '',
    emergencyContact: user?.emergencyContact || ''
  });

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      setLocationStatus('loading');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setLocationStatus('active');
        },
        (error) => {
          console.error('Location error:', error);
          setLocationStatus('error');
          toast.error('Unable to access location. Please enable location services.');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      setLocationStatus('unavailable');
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Mock activity data
  const recentActivities = [
    { id: 1, type: 'login', message: 'Logged in successfully', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500' },
    { id: 2, type: 'location', message: 'Location updated', time: '5 hours ago', icon: MapPin, color: 'text-blue-500' },
    { id: 3, type: 'contact', message: 'Added emergency contact', time: '1 day ago', icon: User, color: 'text-purple-500' },
  ];

  const handleSOS = async () => {
    if (isEmergencyMode) return;

    setIsEmergencyMode(true);
    toast.success('🚨 SOS Alert Activated!');

    // Simulate sending alerts
    setTimeout(() => {
      toast.success('Emergency contacts notified!');
    }, 1000);

    setTimeout(() => {
      toast.success('Location shared with emergency services!');
    }, 2000);

    // Reset emergency mode after 10 seconds
    setTimeout(() => {
      setIsEmergencyMode(false);
    }, 10000);

    // Here you would integrate with real emergency services
    console.log('Emergency activated:', {
      user: user?.name,
      location,
      timestamp: new Date().toISOString(),
      contacts: user?.emergencyContacts
    });
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error('Please fill in all fields');
      return;
    }

    const contact = {
      id: Date.now().toString(),
      ...newContact
    };

    addEmergencyContact(contact);
    setNewContact({ name: '', phone: '', relationship: '' });
    setShowAddContact(false);
  };

  const handleUpdateProfile = () => {
    updateProfile(profileData);
    setShowProfile(false);
  };

  const getLocationStatusColor = () => {
    switch (locationStatus) {
      case 'active': return 'text-green-500';
      case 'loading': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getLocationStatusText = () => {
    switch (locationStatus) {
      case 'active': return 'Location Active';
      case 'loading': return 'Getting Location...';
      case 'error': return 'Location Error';
      default: return 'Location Unavailable';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSidebar(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-full w-64 bg-white/90 backdrop-blur-lg shadow-xl z-50 transform transition-transform duration-300 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Saathi
            </span>
          </div>

          {/* User Info */}
          <div className="mb-8 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{user?.name}</h3>
                <p className="text-sm text-slate-600">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <button
              onClick={() => setShowProfile(true)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Profile Settings</span>
            </button>
            
            <button
              onClick={() => setShowAddContact(true)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Contact</span>
            </button>

            {user?.role === 'admin' && (
              <a
                href="/admin"
                className="w-full flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors"
              >
                <Shield className="w-5 h-5" />
                <span>Admin Panel</span>
              </a>
            )}
          </nav>

          {/* Logout */}
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSidebar(true)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-xl"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Safety Dashboard</h1>
                <p className="text-slate-600">Welcome back, {user?.name}</p>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${locationStatus === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${getLocationStatusColor()}`}>
                  {getLocationStatusText()}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 text-slate-600">
                <Wifi className="w-4 h-4" />
                <Battery className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Emergency Section */}
          <div className="text-center">
            <motion.button
              onClick={handleSOS}
              disabled={isEmergencyMode}
              className={`w-40 h-40 rounded-full shadow-2xl flex items-center justify-center text-white font-bold text-xl transition-all duration-300 ${
                isEmergencyMode 
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 animate-pulse cursor-not-allowed' 
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:scale-110'
              }`}
              whileHover={isEmergencyMode ? {} : { scale: 1.1 }}
              whileTap={isEmergencyMode ? {} : { scale: 0.95 }}
              animate={isEmergencyMode ? {
                boxShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.3)',
                  '0 0 60px rgba(239, 68, 68, 0.8)',
                  '0 0 20px rgba(239, 68, 68, 0.3)',
                ]
              } : {}}
              transition={{ duration: 1, repeat: isEmergencyMode ? Infinity : 0 }}
            >
              {isEmergencyMode ? 'ACTIVE' : 'SOS'}
            </motion.button>
            
            <p className="mt-4 text-slate-600">
              {isEmergencyMode ? 'Emergency mode activated! Help is on the way.' : 'Press for emergency assistance'}
            </p>
            
            {isEmergencyMode && (
              <motion.div
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-center space-x-2 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Emergency Alert Active</span>
                </div>
                <p className="text-sm text-red-600 mt-2">
                  Your emergency contacts have been notified and your location has been shared.
                </p>
              </motion.div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Location</h3>
                  <p className="text-sm text-slate-600">
                    {location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Getting location...'}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Emergency Contacts</h3>
                  <p className="text-sm text-slate-600">{user?.emergencyContacts?.length || 0} contacts</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Safety Score</h3>
                  <p className="text-sm text-slate-600">98% Excellent</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Emergency Contacts */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-900">Emergency Contacts</h2>
                <button
                  onClick={() => setShowAddContact(true)}
                  className="btn-primary px-4 py-2 text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </button>
              </div>

              <div className="space-y-3">
                {user?.emergencyContacts?.length > 0 ? (
                  user.emergencyContacts.map((contact) => (
                    <motion.div
                      key={contact.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{contact.name}</h4>
                          <p className="text-sm text-slate-600">{contact.phone}</p>
                          {contact.relationship && (
                            <p className="text-xs text-slate-500">{contact.relationship}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeEmergencyContact(contact.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <User className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600">No emergency contacts added yet</p>
                    <button
                      onClick={() => setShowAddContact(true)}
                      className="text-primary-600 hover:text-primary-700 font-medium mt-2"
                    >
                      Add your first contact
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={activity.id}
                      className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color} bg-current bg-opacity-10`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      <AnimatePresence>
        {showAddContact && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Add Emergency Contact</h3>
                <button
                  onClick={() => setShowAddContact(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    placeholder="Contact name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Relationship</label>
                  <select
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  >
                    <option value="">Select relationship</option>
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Neighbor">Neighbor</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowAddContact(false)}
                    className="flex-1 px-4 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddContact}
                    className="flex-1 btn-primary"
                  >
                    Add Contact
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Profile Settings</h3>
                <button
                  onClick={() => setShowProfile(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowProfile(false)}
                    className="flex-1 px-4 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    className="flex-1 btn-primary"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;