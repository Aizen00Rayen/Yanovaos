import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Download, Package, CheckCircle, AlertTriangle, RefreshCw, Shield, Clock, HardDrive } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

const availableUpdates = [
  { 
    id: 1, 
    name: 'Yanova OS Core', 
    currentVersion: '2.4.1', 
    newVersion: '2.5.0', 
    size: '2.4 GB',
    type: 'Security Update',
    priority: 'critical',
    description: 'Critical security patches and performance improvements',
    releaseDate: '2025-10-29'
  },
  { 
    id: 2, 
    name: 'Firewall Engine', 
    currentVersion: '3.2.1', 
    newVersion: '3.3.0', 
    size: '145 MB',
    type: 'Feature Update',
    priority: 'high',
    description: 'Enhanced threat detection and new filtering rules',
    releaseDate: '2025-10-28'
  },
  { 
    id: 3, 
    name: 'Network Monitor', 
    currentVersion: '1.8.3', 
    newVersion: '1.9.0', 
    size: '87 MB',
    type: 'Feature Update',
    priority: 'medium',
    description: 'Improved bandwidth tracking and visualization',
    releaseDate: '2025-10-27'
  },
  { 
    id: 4, 
    name: 'Threat Database', 
    currentVersion: '2025.10.25', 
    newVersion: '2025.10.30', 
    size: '456 MB',
    type: 'Definition Update',
    priority: 'high',
    description: 'Latest malware signatures and threat definitions',
    releaseDate: '2025-10-30'
  },
];

const installedPackages = [
  { name: 'Backup Manager', version: '2.1.0', lastUpdated: '2025-10-15', status: 'Up to date', size: '234 MB' },
  { name: 'Log Analyzer', version: '1.5.2', lastUpdated: '2025-10-10', status: 'Up to date', size: '98 MB' },
  { name: 'SSL Certificate Manager', version: '3.0.1', lastUpdated: '2025-10-20', status: 'Up to date', size: '56 MB' },
  { name: 'User Management', version: '2.3.4', lastUpdated: '2025-10-18', status: 'Up to date', size: '112 MB' },
];

const updateHistory = [
  { date: '2025-10-25', package: 'Yanova OS Core', version: '2.4.1', status: 'Success', duration: '15m' },
  { date: '2025-10-20', package: 'SSL Certificate Manager', version: '3.0.1', status: 'Success', duration: '3m' },
  { date: '2025-10-18', package: 'User Management', version: '2.3.4', status: 'Success', duration: '5m' },
  { date: '2025-10-15', package: 'Backup Manager', version: '2.1.0', status: 'Success', duration: '8m' },
  { date: '2025-10-10', package: 'Log Analyzer', version: '1.5.2', status: 'Success', duration: '4m' },
];

export function UpdateCenterPage() {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'critical':
        return { bg: 'bg-red-500/10', border: 'border-red-500/30', badge: 'bg-red-500/20 text-red-300 border-red-500/30' };
      case 'high':
        return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30' };
      default:
        return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Update Center
          </h1>
          <p className="text-cyan-400/60 mt-1">Manage system updates and software packages</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-slate-800 border border-cyan-500/30 hover:bg-slate-700 text-cyan-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Check for Updates
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg shadow-cyan-500/30">
            <Download className="w-4 h-4 mr-2" />
            Install All Updates
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Available Updates</p>
                <p className="text-2xl text-white">4</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-400 flex items-center justify-center shadow-lg shadow-orange-500/50">
                <Download className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Installed Packages</p>
                <p className="text-2xl text-white">47</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Last Updated</p>
                <p className="text-2xl text-white">5d ago</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-400 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Update Size</p>
                <p className="text-2xl text-white">3.2 GB</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-500/50">
                <HardDrive className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Updates */}
      <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Available Updates
            </CardTitle>
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 animate-pulse">
              1 Critical Update
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableUpdates.map((update) => {
              const style = getPriorityStyle(update.priority);
              return (
                <div
                  key={update.id}
                  className={`p-5 rounded-lg ${style.bg} border ${style.border} shadow-lg transition-all hover:scale-[1.01]`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-lg">{update.name}</h3>
                        <Badge className={style.badge}>
                          {update.priority.toUpperCase()}
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {update.type}
                        </Badge>
                      </div>
                      <p className="text-cyan-400/60 text-sm mb-3">{update.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-cyan-400/60">Current Version</p>
                          <p className="text-cyan-300">{update.currentVersion}</p>
                        </div>
                        <div>
                          <p className="text-cyan-400/60">New Version</p>
                          <p className="text-cyan-300">{update.newVersion}</p>
                        </div>
                        <div>
                          <p className="text-cyan-400/60">Download Size</p>
                          <p className="text-cyan-300">{update.size}</p>
                        </div>
                        <div>
                          <p className="text-cyan-400/60">Release Date</p>
                          <p className="text-cyan-300">{update.releaseDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Install Update
                    </Button>
                    <Button variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-slate-800">
                      View Details
                    </Button>
                    <Button variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-slate-800">
                      Release Notes
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Installed Packages */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Installed Packages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-3">
                  {installedPackages.map((pkg, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-slate-950/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-white mb-1">{pkg.name}</h3>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-cyan-400/60">Version</p>
                              <p className="text-cyan-300">{pkg.version}</p>
                            </div>
                            <div>
                              <p className="text-cyan-400/60">Last Updated</p>
                              <p className="text-cyan-300">{pkg.lastUpdated}</p>
                            </div>
                            <div>
                              <p className="text-cyan-400/60">Size</p>
                              <p className="text-cyan-300">{pkg.size}</p>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 ml-4">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {pkg.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Update History */}
        <div className="col-span-12 lg:col-span-5">
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Update History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-3">
                  {updateHistory.map((history, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-slate-950/50 border border-cyan-500/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white text-sm">{history.package}</h3>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="space-y-1 text-xs">
                        <p className="text-cyan-400/60">Version: <span className="text-cyan-300">{history.version}</span></p>
                        <p className="text-cyan-400/60">Date: <span className="text-cyan-300">{history.date}</span></p>
                        <p className="text-cyan-400/60">Duration: <span className="text-cyan-300">{history.duration}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Auto Update Settings */}
      <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-cyan-300">Auto-Update Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-slate-950/50 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white">Security Updates</h3>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Enabled</Badge>
              </div>
              <p className="text-cyan-400/60 text-sm">Automatically install critical security patches</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-950/50 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white">Definition Updates</h3>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Enabled</Badge>
              </div>
              <p className="text-cyan-400/60 text-sm">Update threat databases automatically</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-950/50 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white">Feature Updates</h3>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Manual</Badge>
              </div>
              <p className="text-cyan-400/60 text-sm">Require approval before installing</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
