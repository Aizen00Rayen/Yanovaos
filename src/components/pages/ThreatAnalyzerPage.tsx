import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AlertTriangle, Shield, Scan, FileWarning, Bug, Database, Play, RefreshCw } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const threatData = [
  { time: '00:00', malware: 8, intrusions: 5, ddos: 2 },
  { time: '04:00', malware: 5, intrusions: 3, ddos: 1 },
  { time: '08:00', malware: 15, intrusions: 9, ddos: 4 },
  { time: '12:00', malware: 22, intrusions: 12, ddos: 6 },
  { time: '16:00', malware: 18, intrusions: 10, ddos: 5 },
  { time: '20:00', malware: 12, intrusions: 7, ddos: 3 },
];

const threatTypes = [
  { name: 'Malware', value: 45, color: '#ef4444' },
  { name: 'Intrusions', value: 30, color: '#f97316' },
  { name: 'DDoS', value: 15, color: '#eab308' },
  { name: 'Phishing', value: 10, color: '#06b6d4' },
];

const activeThreats = [
  { id: 1, name: 'Trojan.Generic.KD.123456', severity: 'critical', type: 'Malware', location: '/tmp/suspicious.sh', status: 'Quarantined' },
  { id: 2, name: 'SQL Injection Attempt', severity: 'high', type: 'Intrusion', location: 'Web Server Port 443', status: 'Blocked' },
  { id: 3, name: 'Suspicious Outbound Connection', severity: 'medium', type: 'Network', location: '192.168.1.45', status: 'Monitoring' },
  { id: 4, name: 'Privilege Escalation Attempt', severity: 'high', type: 'System', location: '/usr/bin/sudo', status: 'Blocked' },
  { id: 5, name: 'Brute Force Attack', severity: 'critical', type: 'Authentication', location: 'SSH Port 22', status: 'Active' },
];

const scanHistory = [
  { id: 1, date: '2025-10-30 14:30', type: 'Full System Scan', threats: 3, duration: '2h 15m', status: 'Completed' },
  { id: 2, date: '2025-10-29 14:30', type: 'Quick Scan', threats: 0, duration: '12m', status: 'Completed' },
  { id: 3, date: '2025-10-28 14:30', type: 'Full System Scan', threats: 5, duration: '2h 8m', status: 'Completed' },
  { id: 4, date: '2025-10-27 14:30', type: 'Custom Scan', threats: 1, duration: '45m', status: 'Completed' },
];

export function ThreatAnalyzerPage() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-300', badge: 'bg-red-500/20 text-red-300 border-red-500/30' };
      case 'high': return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-300', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30' };
      default: return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-300', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Threat Analyzer
          </h1>
          <p className="text-cyan-400/60 mt-1">Real-time threat detection and analysis</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-slate-800 border border-cyan-500/30 hover:bg-slate-700 text-cyan-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg shadow-cyan-500/30">
            <Play className="w-4 h-4 mr-2" />
            Start Scan
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Active Threats</p>
                <p className="text-2xl text-white">5</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-400 flex items-center justify-center shadow-lg shadow-red-500/50">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Threats Blocked</p>
                <p className="text-2xl text-white">1,247</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-500/50">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Last Scan</p>
                <p className="text-2xl text-white">2h ago</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Scan className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Quarantined</p>
                <p className="text-2xl text-white">23</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-400 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Database className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300">Threat Activity (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={threatData}>
                  <defs>
                    <linearGradient id="malware" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="intrusions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="ddos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#06b6d4" opacity={0.1} />
                  <XAxis dataKey="time" stroke="#06b6d4" opacity={0.5} tick={{ fill: '#67e8f9' }} />
                  <YAxis stroke="#06b6d4" opacity={0.5} tick={{ fill: '#67e8f9' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '8px', color: '#fff' }} />
                  <Area type="monotone" dataKey="malware" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#malware)" />
                  <Area type="monotone" dataKey="intrusions" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#intrusions)" />
                  <Area type="monotone" dataKey="ddos" stroke="#eab308" strokeWidth={2} fillOpacity={1} fill="url(#ddos)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300">Threat Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={threatTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {threatTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {threatTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                      <span className="text-sm text-cyan-400/60">{type.name}</span>
                    </div>
                    <span className="text-white">{type.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Active Threats & Scan History */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <Bug className="w-5 h-5" />
                Active Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {activeThreats.map((threat) => {
                    const style = getSeverityColor(threat.severity);
                    return (
                      <div
                        key={threat.id}
                        className={`p-4 rounded-lg ${style.bg} border ${style.border} shadow-lg transition-all hover:scale-[1.02]`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-white">{threat.name}</h3>
                          <Badge className={style.badge}>
                            {threat.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-cyan-400/60">Type</p>
                            <p className="text-cyan-300">{threat.type}</p>
                          </div>
                          <div>
                            <p className="text-cyan-400/60">Location</p>
                            <p className="text-cyan-300 truncate">{threat.location}</p>
                          </div>
                          <div>
                            <p className="text-cyan-400/60">Status</p>
                            <p className="text-cyan-300">{threat.status}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
                            Investigate
                          </Button>
                          <Button size="sm" variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-slate-800">
                            Quarantine
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <FileWarning className="w-5 h-5" />
                Scan History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {scanHistory.map((scan) => (
                    <div
                      key={scan.id}
                      className="p-4 rounded-lg bg-slate-950/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white">{scan.type}</h3>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          {scan.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-cyan-400/60">Date: <span className="text-cyan-300">{scan.date}</span></p>
                        <p className="text-cyan-400/60">Threats: <span className="text-cyan-300">{scan.threats}</span></p>
                        <p className="text-cyan-400/60">Duration: <span className="text-cyan-300">{scan.duration}</span></p>
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
