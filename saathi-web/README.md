# 🛡️ Saathi - Women Safety Companion

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-blue.svg" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.4.10-purple.svg" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.14-cyan.svg" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer%20Motion-11.11.17-pink.svg" alt="Framer Motion">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
</div>

<div align="center">
  <h3>🌟 Empowering Women's Safety with Technology and Care 🌟</h3>
  <p>A comprehensive React-based web application designed to provide instant emergency assistance, real-time location sharing, and comprehensive safety features for women.</p>
</div>

---

## ✨ Key Features

### 🚨 **Emergency System**
- **One-Tap SOS Button**: Instant emergency alerts with visual feedback
- **Real-time Location Sharing**: GPS-based location tracking and sharing
- **Emergency Contact Management**: Add, manage, and organize trusted contacts
- **Multi-channel Alerts**: Email, SMS, and push notifications

### 👥 **User Management**
- **Secure Authentication**: Email/password with demo accounts
- **Profile Management**: Update personal information and preferences
- **Activity Logging**: Track safety-related activities and alerts
- **Multi-step Registration**: Comprehensive onboarding process

### 🎯 **Admin Dashboard**
- **Alert Monitoring**: Real-time emergency alert management
- **User Analytics**: Comprehensive user activity insights
- **System Status**: Monitor all safety systems and services
- **Response Management**: Track and manage emergency responses

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Theme**: Adaptive color schemes
- **Smooth Animations**: Framer Motion powered interactions
- **Accessible**: WCAG 2.1 compliant interface

### 🔧 **Technical Features**
- **Progressive Web App**: Installable and offline-capable
- **Real-time Updates**: Live notifications and status updates
- **Secure Data**: Encrypted storage and transmission
- **API Integration**: Supabase, EmailJS, and location services

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- Modern web browser with geolocation support

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/saathi-web.git
   cd saathi-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the root directory:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key

   # EmailJS Configuration
   VITE_EMAILJS_SERVICE_ID=your-service-id
   VITE_EMAILJS_TEMPLATE_ID=your-template-id
   VITE_EMAILJS_USER_ID=your-user-id

   # Backend API (Optional)
   VITE_BACKEND_URL=http://localhost:8000

   # App Configuration
   VITE_APP_NAME=Saathi
   VITE_APP_VERSION=1.0.0
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

---

## 🎮 Demo Accounts

For quick testing, use these pre-configured demo accounts:

| Account Type | Email | Password | Features |
|-------------|--------|----------|----------|
| **Regular User** | `user@demo.com` | `demo123` | Full user dashboard, SOS alerts |
| **Admin User** | `admin@demo.com` | `admin123` | Admin panel, alert monitoring |

---

## 📱 Application Structure

### **Landing Page (`/`)**
- Hero section with feature highlights
- Statistics and testimonials
- Call-to-action for registration
- Mobile-responsive design

### **Authentication**
- **Login** (`/login`): Secure sign-in with demo credentials
- **Register** (`/register`): Multi-step registration process

### **User Dashboard** (`/dashboard`)
- **SOS Emergency Button**: Central safety feature
- **Location Status**: Real-time GPS tracking
- **Emergency Contacts**: Manage trusted contacts
- **Activity Log**: Recent safety activities
- **Profile Settings**: Update personal information

### **Admin Dashboard** (`/admin`)
- **Alert Management**: Monitor and respond to emergencies
- **User Analytics**: System usage statistics
- **System Status**: Monitor all services
- **Quick Actions**: Administrative tools

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18.3.1**: Component-based UI library
- **Vite 5.4.10**: Fast build tool and dev server
- **TypeScript**: Type-safe JavaScript development

### **Styling & Animation**
- **Tailwind CSS 3.4.14**: Utility-first CSS framework
- **Framer Motion 11.11.17**: Production-ready motion library
- **Lucide React**: Beautiful icon library

### **State Management & Routing**
- **React Context**: Global state management
- **React Router 6.28.0**: Client-side routing
- **Local Storage**: Persistent data storage

### **Integrations**
- **Supabase**: Backend as a Service
- **EmailJS**: Email sending service
- **Web Geolocation API**: Location services
- **React Hot Toast**: Notification system

---

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors */
primary-50: #fef2f2    primary-600: #dc2626
primary-100: #fee2e2   primary-700: #b91c1c
primary-500: #ef4444   primary-900: #7f1d1d

/* Secondary Colors */
secondary-500: #22c55e  accent-500: #d946ef
```

### **Typography**
- **Primary Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### **Component Classes**
```css
.btn-primary      /* Primary action button */
.btn-secondary    /* Secondary action button */
.btn-sos         /* Emergency SOS button */
.card            /* Container component */
.glass-effect    /* Glassmorphism design */
```

---

## 🚨 Safety Features Deep Dive

### **Emergency SOS System**

#### **Trigger Process**
1. User presses the large SOS button
2. System immediately captures current location
3. Emergency mode activates with visual/audio feedback
4. Alerts sent to all emergency contacts
5. Location shared with emergency services
6. Activity logged in user dashboard

#### **Alert Channels**
- **Email Notifications**: Detailed emergency information
- **SMS Messages**: Critical alert with location
- **Push Notifications**: Real-time browser alerts
- **Dashboard Updates**: Live status for admins

#### **Location Services**
- **High Accuracy GPS**: Uses device GPS for precise location
- **Fallback Methods**: IP-based location if GPS unavailable
- **Privacy Controls**: Location shared only during emergencies
- **Offline Support**: Cached location for offline scenarios

### **Contact Management**
- **Multiple Contacts**: Add family, friends, colleagues
- **Relationship Tags**: Categorize contact types
- **Priority Levels**: Set contact notification order
- **Verification**: Confirm contact phone numbers

---

## 👨‍💼 Admin Panel Features

### **Alert Dashboard**
- **Real-time Monitoring**: Live emergency alert feed
- **Status Management**: Track alert resolution
- **Response Times**: Monitor emergency response metrics
- **Geographic View**: Map-based alert visualization

### **User Management**
- **User Analytics**: Registration and usage statistics
- **Activity Monitoring**: Track user engagement
- **Safety Scores**: User safety compliance metrics
- **Support Tools**: User assistance and management

### **System Administration**
- **Service Status**: Monitor all integrated services
- **Performance Metrics**: System health and uptime
- **Configuration**: Manage app settings and features
- **Reporting**: Generate safety and usage reports

---

## 🔧 Development

### **Project Structure**
```
saathi-web/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   ├── admin/         # Admin dashboard components
│   │   └── common/        # Shared components
│   ├── contexts/          # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API and external services
│   ├── utils/             # Utility functions
│   └── styles/            # Global styles
├── .env                   # Environment variables
├── tailwind.config.js     # Tailwind configuration
└── vite.config.js         # Vite configuration
```

### **Available Scripts**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm start          # Alias for npm run dev
```

### **Environment Configuration**

#### **Required Variables**
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

#### **Optional Variables**
- `VITE_EMAILJS_SERVICE_ID`: EmailJS service configuration
- `VITE_EMAILJS_TEMPLATE_ID`: Email template ID
- `VITE_EMAILJS_USER_ID`: EmailJS user ID
- `VITE_BACKEND_URL`: Custom backend API URL

---

## 🌐 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deployment Platforms**
- **Vercel**: Zero-config deployment
- **Netlify**: JAMstack deployment
- **GitHub Pages**: Free static hosting
- **AWS S3**: Scalable cloud hosting

### **Environment Setup**
1. Set up production environment variables
2. Configure custom domain (optional)
3. Enable HTTPS and security headers
4. Set up monitoring and analytics

---

## 🔒 Security & Privacy

### **Data Protection**
- **Encryption**: All sensitive data encrypted in transit and at rest
- **Authentication**: Secure JWT-based authentication
- **Privacy Controls**: Users control their data sharing preferences
- **GDPR Compliance**: European data protection standards

### **Emergency Protocol**
- **Minimal Data Collection**: Only essential information stored
- **Secure Transmission**: End-to-end encrypted communications
- **Emergency Override**: Critical safety features bypass privacy settings
- **Data Retention**: Automatic cleanup of old emergency data

---

## 🤝 Contributing

We welcome contributions to make Saathi even better! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### **Development Guidelines**
- Follow the existing code style and patterns
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

### **Areas for Contribution**
- 🌍 **Internationalization**: Add support for multiple languages
- ♿ **Accessibility**: Improve accessibility features
- 📱 **Mobile App**: React Native companion app
- 🤖 **AI Features**: Enhance emotion detection capabilities
- 🗺️ **Maps Integration**: Interactive mapping features
- 🔔 **Notifications**: Advanced notification systems

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For beautiful animations
- **Lucide**: For the comprehensive icon library
- **Community**: For inspiration and feedback

---

## 📞 Support & Contact

### **Technical Support**
- 📧 Email: support@saathi-app.com
- 💬 Discord: [Join our community](https://discord.gg/saathi)
- 📚 Documentation: [docs.saathi-app.com](https://docs.saathi-app.com)

### **Emergency Resources**
- 🚨 **Emergency Services**: Call your local emergency number
- 📱 **Crisis Hotlines**: Available 24/7 for immediate support
- 🏥 **Medical Emergency**: Contact local emergency medical services

---

<div align="center">
  <h3>🌟 Together, we're building a safer world for everyone 🌟</h3>
  <p>
    <strong>Saathi</strong> - Your companion in safety, your partner in peace of mind.
  </p>
</div>
