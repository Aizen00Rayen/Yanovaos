import { Search, Bell, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

export function TopNavbar() {
  return (
    <nav className="h-16 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <div className="text-white tracking-tight">Y</div>
          </div>
          <div>
            <h1 className="text-xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Yanova OS
            </h1>
            <p className="text-xs text-cyan-400/60">Cybersecurity Platform</p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50" />
            <input
              type="text"
              placeholder="Search systems, logs, alerts..."
              className="w-full h-10 pl-10 pr-4 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-sm text-white placeholder:text-cyan-400/30 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-cyan-400" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs border-2 border-slate-950">
              3
            </Badge>
          </button>
          
          <button className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-cyan-400" />
          </button>
          
          <div className="w-px h-8 bg-cyan-500/20" />
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-white">Admin User</p>
              <p className="text-xs text-cyan-400/60">Security Analyst</p>
            </div>
            <Avatar className="w-9 h-9 border-2 border-cyan-500/50">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                AU
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}
