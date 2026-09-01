import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { ScrollToTop } from './components/common/ScrollToTop';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public Page Views
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EngineeringLabPage } from './pages/EngineeringLabPage';
import { ResearchPage } from './pages/ResearchPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';

// Admin CMS Views
import { AdminLayout } from './admin/components/AdminLayout';
import { AdminLoginPage } from './admin/pages/AdminLoginPage';
import { AdminDashboardPage } from './admin/pages/AdminDashboardPage';
import { AdminPageManager } from './admin/pages/AdminPageManager';
import { AdminProjectManager } from './admin/pages/AdminProjectManager';
import { AdminSkillManager } from './admin/pages/AdminSkillManager';
import { AdminLabManager } from './admin/pages/AdminLabManager';
import { AdminExperienceManager } from './admin/pages/AdminExperienceManager';
import { AdminResearchManager } from './admin/pages/AdminResearchManager';
import { AdminWritingManager } from './admin/pages/AdminWritingManager';
import { AdminMediaPage } from './admin/pages/AdminMediaPage';
import { AdminNavManager } from './admin/pages/AdminNavManager';
import { AdminSeoManager } from './admin/pages/AdminSeoManager';
import { AdminDesignManager } from './admin/pages/AdminDesignManager';
import { AdminContactManager } from './admin/pages/AdminContactManager';
import { AdminResumeManager } from './admin/pages/AdminResumeManager';
import { AdminSettingsPage } from './admin/pages/AdminSettingsPage';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-black text-[#E8DFD8] selection:bg-[#cbb59d] selection:text-black flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Portfolio Routes */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
            <Route path="/projects" element={<PublicLayout><ProjectsPage /></PublicLayout>} />
            <Route path="/lab" element={<PublicLayout><EngineeringLabPage /></PublicLayout>} />
            <Route path="/research" element={<PublicLayout><ResearchPage /></PublicLayout>} />
            <Route path="/experience" element={<PublicLayout><ExperiencePage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

            {/* Admin CMS Authentication Route */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin CMS Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><AdminDashboardPage /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/pages" element={<ProtectedRoute><AdminLayout><AdminPageManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/projects" element={<ProtectedRoute><AdminLayout><AdminProjectManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/skills" element={<ProtectedRoute><AdminLayout><AdminSkillManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/lab" element={<ProtectedRoute><AdminLayout><AdminLabManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/experience" element={<ProtectedRoute><AdminLayout><AdminExperienceManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/research" element={<ProtectedRoute><AdminLayout><AdminResearchManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/writing" element={<ProtectedRoute><AdminLayout><AdminWritingManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/media" element={<ProtectedRoute><AdminLayout><AdminMediaPage /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/navigation" element={<ProtectedRoute><AdminLayout><AdminNavManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/seo" element={<ProtectedRoute><AdminLayout><AdminSeoManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/design" element={<ProtectedRoute><AdminLayout><AdminDesignManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/contact" element={<ProtectedRoute><AdminLayout><AdminContactManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/resume" element={<ProtectedRoute><AdminLayout><AdminResumeManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><AdminSettingsPage /></AdminLayout></ProtectedRoute>} />
          </Routes>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;