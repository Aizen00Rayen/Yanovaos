import { useState } from 'react';
import { TopNavbar } from './components/TopNavbar';
import { ToolsSidebar } from './components/ToolsSidebar';
import { DashboardPage } from './components/pages/DashboardPage';
import { FirewallManagerPage } from './components/pages/FirewallManagerPage';
import { ThreatAnalyzerPage } from './components/pages/ThreatAnalyzerPage';
import { NetworkMonitorPage } from './components/pages/NetworkMonitorPage';
import { BackupCenterPage } from './components/pages/BackupCenterPage';
import { LogViewerPage } from './components/pages/LogViewerPage';
import { UpdateCenterPage } from './components/pages/UpdateCenterPage';

export type PageType = 'dashboard' | 'firewall' | 'threat' | 'network' | 'backup' | 'logs' | 'updates';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'firewall':
        return <FirewallManagerPage />;
      case 'threat':
        return <ThreatAnalyzerPage />;
      case 'network':
        return <NetworkMonitorPage />;
      case 'backup':
        return <BackupCenterPage />;
      case 'logs':
        return <LogViewerPage />;
      case 'updates':
        return <UpdateCenterPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <TopNavbar />
      
      <div className="flex">
        <ToolsSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        
        <main className="flex-1 p-6 ml-20">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
