import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Database, HardDrive, Cloud, Clock, CheckCircle, AlertCircle, Play, RefreshCw, Plus } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

const backupJobs = [
  { 
    id: 1, 
    name: 'Full System Backup', 
    schedule: 'Daily at 2:00 AM', 
    lastRun: '2025-10-30 02:00', 
    nextRun: '2025-10-31 02:00',
    status: 'Completed', 
    size: '145 GB',
    duration: '2h 15m',
    destination: 'Cloud Storage'
  },
  { 
    id: 2, 
    name: 'Database Backup', 
    schedule: 'Every 6 hours', 
    lastRun: '2025-10-30 12:00', 
    nextRun: '2025-10-30 18:00',
    status: 'Completed', 
    size: '23 GB',
    duration: '18m',
    destination: 'Local NAS'
  },
  { 
    id: 3, 
    name: 'Configuration Files', 
    schedule: 'Hourly', 
    lastRun: '2025-10-30 14:00', 
    nextRun: '2025-10-30 15:00',
    status: 'Running', 
    size: '2.4 GB',
    duration: '5m',
    destination: 'Cloud Storage'
  },
  { 
    id: 4, 
    name: 'User Data Backup', 
    schedule: 'Daily at 3:00 AM', 
    lastRun: '2025-10-30 03:00', 
    nextRun: '2025-10-31 03:00',
    status: 'Completed', 
    size: '67 GB',
    duration: '45m',
    destination: 'External Drive'
  },
];

const backupHistory = [
  { date: '2025-10-30 02:00', type: 'Full System', status: 'Success', size: '145 GB', duration: '2h 15m' },
  { date: '2025-10-29 02:00', type: 'Full System', status: 'Success', size: '143 GB', duration: '2h 12m' },
  { date: '2025-10-28 02:00', type: 'Full System', status: 'Success', size: '141 GB', duration: '2h 8m' },
  { date: '2025-10-27 02:00', type: 'Full System', status: 'Failed', size: '0 GB', duration: '5m' },
  { date: '2025-10-26 02:00', type: 'Full System', status: 'Success', size: '139 GB', duration: '2h 5m' },
];

const storageLocations = [
  { name: 'Cloud Storage', type: 'AWS S3', used: '456 GB', total: '2 TB', status: 'Connected' },
  { name: 'Local NAS', type: 'Network Storage', used: '1.2 TB', total: '4 TB', status: 'Connected' },
  { name: 'External Drive', type: 'USB Storage', used: '234 GB', total: '1 TB', status: 'Connected' },
];

export function BackupCenterPage() {
  const getPercentage = (used: string, total: string) => {
    const usedNum = parseFloat(used);
    const totalNum = parseFloat(total);
    const usedGB = used.includes('TB') ? usedNum * 1024 : usedNum;
    const totalGB = total.includes('TB') ? totalNum * 1024 : totalNum;
    return Math.round((usedGB / totalGB) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Backup Center
          </h1>
          <p className="text-cyan-400/60 mt-1">Manage system backups and restore points</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-slate-800 border border-cyan-500/30 hover:bg-slate-700 text-cyan-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg shadow-cyan-500/30">
            <Plus className="w-4 h-4 mr-2" />
            New Backup
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Total Backups</p>
                <p className="text-2xl text-white">247</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Database className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Storage Used</p>
                <p className="text-2xl text-white">1.9 TB</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-400 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <HardDrive className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Success Rate</p>
                <p className="text-2xl text-white">98.4%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-500/50">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Next Backup</p>
                <p className="text-2xl text-white">45m</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-400 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Backup Jobs */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300">Scheduled Backup Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {backupJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-5 rounded-lg bg-slate-950/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-white text-lg mb-1">{job.name}</h3>
                          <p className="text-cyan-400/60 text-sm">{job.schedule}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={
                            job.status === 'Running'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 animate-pulse'
                              : job.status === 'Completed'
                              ? 'bg-green-500/20 text-green-300 border-green-500/30'
                              : 'bg-red-500/20 text-red-300 border-red-500/30'
                          }>
                            {job.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-cyan-400/60">Last Run</p>
                          <p className="text-cyan-300">{job.lastRun}</p>
                        </div>
                        <div>
                          <p className="text-cyan-400/60">Next Run</p>
                          <p className="text-cyan-300">{job.nextRun}</p>
                        </div>
                        <div>
                          <p className="text-cyan-400/60">Size</p>
                          <p className="text-cyan-300">{job.size}</p>
                        </div>
                        <div>
                          <p className="text-cyan-400/60">Destination</p>
                          <p className="text-cyan-300">{job.destination}</p>
                        </div>
                      </div>

                      {job.status === 'Running' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-cyan-400/60">Progress</span>
                            <span className="text-cyan-300">67%</span>
                          </div>
                          <Progress value={67} className="h-2" />
                        </div>
                      )}

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
                          <Play className="w-4 h-4 mr-1" />
                          Run Now
                        </Button>
                        <Button size="sm" variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-slate-800">
                          Configure
                        </Button>
                        <Button size="sm" variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-slate-800">
                          Restore
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Storage Locations */}
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <Cloud className="w-5 h-5" />
                Storage Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storageLocations.map((location, index) => {
                  const percentage = getPercentage(location.used, location.total);
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-slate-950/50 border border-cyan-500/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white">{location.name}</h3>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          {location.status}
                        </Badge>
                      </div>
                      <p className="text-cyan-400/60 text-sm mb-3">{location.type}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-cyan-400/60">{location.used} / {location.total}</span>
                          <span className="text-cyan-300">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Backup History */}
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {backupHistory.map((backup, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-slate-950/50 border border-cyan-500/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm">{backup.type}</span>
                        {backup.status === 'Success' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div className="space-y-1 text-xs">
                        <p className="text-cyan-400/60">{backup.date}</p>
                        <p className="text-cyan-400/60">Size: {backup.size} • {backup.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
