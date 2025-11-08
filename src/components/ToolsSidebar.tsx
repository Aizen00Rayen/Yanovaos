import { Shield, Activity, Network, Database, FileText, Download, LayoutDashboard } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import type { PageType } from '../App';

interface ToolsSidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const tools = [
  { icon: LayoutDashboard, label: 'Dashboard', page: 'dashboard' as PageType },
  { icon: Shield, label: 'Firewall Manager', page: 'firewall' as PageType },
  { icon: Activity, label: 'Threat Analyzer', page: 'threat' as PageType },
  { icon: Network, label: 'Network Monitor', page: 'network' as PageType },
  { icon: Database, label: 'Backup Center', page: 'backup' as PageType },
  { icon: FileText, label: 'Log Viewer', page: 'logs' as PageType },
  { icon: Download, label: 'Update Center', page: 'updates' as PageType },
];

export function ToolsSidebar({ currentPage, onPageChange }: ToolsSidebarProps) {
  return (
    <aside className="w-20 min-h-[calc(100vh-4rem)] border-r border-cyan-500/20 bg-slate-950/50 backdrop-blur-xl fixed">
      <TooltipProvider>
        <div className="flex flex-col items-center gap-2 py-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isActive = currentPage === tool.page;
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onPageChange(tool.page)}
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-cyan-500/50' 
                        : 'bg-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-800/50'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-slate-800 border-cyan-500/30">
                  <p>{tool.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </aside>
  );
}
