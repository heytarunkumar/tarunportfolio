import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { ScrollToTop } from './components/common/ScrollToTop';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Core Homepage (Immediate render for fastest First Contentful Paint / LCP)
import { HomePage } from './pages/HomePage';

// Public Pages (Lazy Loaded)
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const EngineeringLabPage = lazy(() => import('./pages/EngineeringLabPage').then((m) => ({ default: m.EngineeringLabPage })));
const ResearchPage = lazy(() => import('./pages/ResearchPage').then((m) => ({ default: m.ResearchPage })));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage').then((m) => ({ default: m.ExperiencePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const LinksPage = lazy(() => import('./pages/LinksPage').then((m) => ({ default: m.LinksPage })));

// Admin CMS Views (Code-Split to isolate private code from public visitors)
const AdminLayout = lazy(() => import('./admin/components/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const AdminLoginPage = lazy(() => import('./admin/pages/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./admin/pages/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
const AdminPageManager = lazy(() => import('./admin/pages/AdminPageManager').then((m) => ({ default: m.AdminPageManager })));
const AdminProjectManager = lazy(() => import('./admin/pages/AdminProjectManager').then((m) => ({ default: m.AdminProjectManager })));
const AdminSkillManager = lazy(() => import('./admin/pages/AdminSkillManager').then((m) => ({ default: m.AdminSkillManager })));
const AdminLabManager = lazy(() => import('./admin/pages/AdminLabManager').then((m) => ({ default: m.AdminLabManager })));
const AdminExperienceManager = lazy(() => import('./admin/pages/AdminExperienceManager').then((m) => ({ default: m.AdminExperienceManager })));
const AdminResearchManager = lazy(() => import('./admin/pages/AdminResearchManager').then((m) => ({ default: m.AdminResearchManager })));
const AdminWritingManager = lazy(() => import('./admin/pages/AdminWritingManager').then((m) => ({ default: m.AdminWritingManager })));
const AdminMediaPage = lazy(() => import('./admin/pages/AdminMediaPage').then((m) => ({ default: m.AdminMediaPage })));
const AdminNavManager = lazy(() => import('./admin/pages/AdminNavManager').then((m) => ({ default: m.AdminNavManager })));
const AdminSeoManager = lazy(() => import('./admin/pages/AdminSeoManager').then((m) => ({ default: m.AdminSeoManager })));
const AdminDesignManager = lazy(() => import('./admin/pages/AdminDesignManager').then((m) => ({ default: m.AdminDesignManager })));
const AdminResumeManager = lazy(() => import('./admin/pages/AdminResumeManager').then((m) => ({ default: m.AdminResumeManager })));
const AdminSettingsPage = lazy(() => import('./admin/pages/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })));

function SecretAdminListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret global shortcut: Ctrl + Shift + A (or Cmd + Shift + A on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigate('/admin/dashboard');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

function PageVisibilityGuard({ path, children }: { path: string; children: React.ReactNode }) {
  const { navigation } = usePortfolio();
  const item = navigation?.find((n) => n.path === path);

  if (item && item.visible === false) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-[#0A0908] text-[#F5F2EB] selection:bg-[#D4AF37]/30 selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

const PageFallback = () => (
  <div className="min-h-screen bg-[#0A0908] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <ScrollToTop />
          <SecretAdminListener />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              {/* Public Portfolio Routes with Dynamic Page Visibility Guards */}
              <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
              <Route path="/about" element={<PageVisibilityGuard path="/about"><PublicLayout><AboutPage /></PublicLayout></PageVisibilityGuard>} />
              <Route path="/projects" element={<PageVisibilityGuard path="/projects"><PublicLayout><ProjectsPage /></PublicLayout></PageVisibilityGuard>} />
              <Route path="/lab" element={<PageVisibilityGuard path="/lab"><PublicLayout><EngineeringLabPage /></PublicLayout></PageVisibilityGuard>} />
              <Route path="/research" element={<PageVisibilityGuard path="/research"><PublicLayout><ResearchPage /></PublicLayout></PageVisibilityGuard>} />
              <Route path="/experience" element={<PageVisibilityGuard path="/experience"><PublicLayout><ExperiencePage /></PublicLayout></PageVisibilityGuard>} />
              <Route path="/contact" element={<PageVisibilityGuard path="/contact"><PublicLayout><ContactPage /></PublicLayout></PageVisibilityGuard>} />
              <Route path="/links" element={<PublicLayout><LinksPage /></PublicLayout>} />

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
              <Route path="/admin/resume" element={<ProtectedRoute><AdminLayout><AdminResumeManager /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><AdminSettingsPage /></AdminLayout></ProtectedRoute>} />

              {/* Catch-all route fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;