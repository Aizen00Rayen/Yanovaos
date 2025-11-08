import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FileText, Search, Download, Filter, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

const systemLogs = [
  { id: 1, timestamp: '2025-10-30 14:32:15', level: 'ERROR', source: 'firewall', message: 'Failed to apply rule: SSH_BLOCK_EXTERNAL - Invalid IP range', user: 'root' },
  { id: 2, timestamp: '2025-10-30 14:31:42', level: 'INFO', source: 'system', message: 'System backup completed successfully - 145GB backed up', user: 'backup-daemon' },
  { id: 3, timestamp: '2025-10-30 14:30:28', level: 'WARNING', source: 'auth', message: 'Multiple failed login attempts from IP 185.220.101.42', user: 'sshd' },
  { id: 4, timestamp: '2025-10-30 14:29:15', level: 'INFO', source: 'network', message: 'Interface eth0 link status changed to UP', user: 'NetworkManager' },
  { id: 5, timestamp: '2025-10-30 14:28:03', level: 'ERROR', source: 'database', message: 'Connection timeout to MySQL server on port 3306', user: 'mysql' },
  { id: 6, timestamp: '2025-10-30 14:27:45', level: 'INFO', source: 'system', message: 'Service nginx reloaded successfully', user: 'systemd' },
  { id: 7, timestamp: '2025-10-30 14:26:22', level: 'WARNING', source: 'disk', message: 'Disk usage on /var/log reached 85%', user: 'monitoring' },
  { id: 8, timestamp: '2025-10-30 14:25:10', level: 'INFO', source: 'firewall', message: 'Blocked 3482 connection attempts in the last hour', user: 'iptables' },
];

const securityLogs = [
  { id: 1, timestamp: '2025-10-30 14:30:28', severity: 'critical', event: 'Brute Force Attack', details: 'SSH brute force from 185.220.101.42 - 45 attempts', action: 'IP Blocked' },
  { id: 2, timestamp: '2025-10-30 14:15:12', severity: 'high', event: 'Malware Detected', details: 'Trojan.Generic.KD.123456 found in /tmp/suspicious.sh', action: 'Quarantined' },
  { id: 3, timestamp: '2025-10-30 13:45:33', severity: 'medium', event: 'Suspicious Activity', details: 'Unusual outbound traffic to unknown domain', action: 'Monitoring' },
  { id: 4, timestamp: '2025-10-30 13:22:18', severity: 'high', event: 'SQL Injection Attempt', details: 'Attack detected on web application port 443', action: 'Blocked' },
  { id: 5, timestamp: '2025-10-30 12:58:42', severity: 'low', event: 'Failed Login', details: 'Invalid password for user admin from 192.168.1.100', action: 'Logged' },
];

const applicationLogs = [
  { id: 1, timestamp: '2025-10-30 14:32:00', app: 'Web Server', level: 'INFO', message: 'Request processed: GET /api/users - 200 OK (45ms)' },
  { id: 2, timestamp: '2025-10-30 14:31:30', app: 'Database', level: 'WARNING', message: 'Slow query detected: SELECT * FROM logs - 3.5s' },
  { id: 3, timestamp: '2025-10-30 14:30:15', app: 'API Gateway', level: 'ERROR', message: 'Failed to connect to upstream service: Connection refused' },
  { id: 4, timestamp: '2025-10-30 14:29:45', app: 'Cache Server', level: 'INFO', message: 'Cache hit ratio: 94.2% - Performance optimal' },
  { id: 5, timestamp: '2025-10-30 14:28:20', app: 'Load Balancer', level: 'INFO', message: 'Health check passed for all backend servers' },
];

export function LogViewerPage() {
  const getLevelStyle = (level: string) => {
    switch (level.toUpperCase()) {
      case 'ERROR':
        return { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
      case 'WARNING':
        return { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
      case 'INFO':
        return { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
      default:
        return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Log Viewer
          </h1>
          <p className="text-cyan-400/60 mt-1">Monitor and analyze system logs in real-time</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-slate-800 border border-cyan-500/30 hover:bg-slate-700 text-cyan-300">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg shadow-cyan-500/30">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50" />
              <Input
                placeholder="Search logs..."
                className="pl-10 bg-slate-950/50 border-cyan-500/20 text-white placeholder:text-cyan-400/30"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-slate-950/50 border-cyan-500/20 text-white">
                <SelectValue placeholder="Log Level" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-cyan-500/30">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-slate-950/50 border-cyan-500/20 text-white">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-cyan-500/30">
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="firewall">Firewall</SelectItem>
                <SelectItem value="network">Network</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Total Logs</p>
                <p className="text-2xl text-white">24.5K</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Errors</p>
                <p className="text-2xl text-white">127</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-400 flex items-center justify-center shadow-lg shadow-red-500/50">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Warnings</p>
                <p className="text-2xl text-white">342</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-400 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Info</p>
                <p className="text-2xl text-white">23.9K</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-500/50">
                <Info className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Log Tabs */}
      <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-cyan-300">System Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="system" className="w-full">
            <TabsList className="bg-slate-950/50 border border-cyan-500/20">
              <TabsTrigger value="system" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400">
                System Logs
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400">
                Security Logs
              </TabsTrigger>
              <TabsTrigger value="application" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400">
                Application Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="system" className="mt-4">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2 font-mono text-sm">
                  {systemLogs.map((log) => {
                    const style = getLevelStyle(log.level);
                    const Icon = style.icon;
                    return (
                      <div
                        key={log.id}
                        className={`p-3 rounded-lg ${style.bg} border ${style.border} hover:scale-[1.01] transition-all`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${style.color}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                              <span className="text-cyan-400/60">{log.timestamp}</span>
                              <Badge className={style.bg + ' ' + style.border + ' ' + style.color}>
                                {log.level}
                              </Badge>
                              <span className="text-cyan-400/60">({log.source})</span>
                              <span className="text-cyan-400/60">[{log.user}]</span>
                            </div>
                            <p className="text-white break-words">{log.message}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="security" className="mt-4">
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {securityLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 rounded-lg bg-slate-950/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white">{log.event}</h3>
                        <Badge className={getSeverityStyle(log.severity)}>
                          {log.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-cyan-400/60 text-sm mb-2">{log.details}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-cyan-400/40">{log.timestamp}</span>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {log.action}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="application" className="mt-4">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2 font-mono text-sm">
                  {applicationLogs.map((log) => {
                    const style = getLevelStyle(log.level);
                    const Icon = style.icon;
                    return (
                      <div
                        key={log.id}
                        className={`p-3 rounded-lg ${style.bg} border ${style.border}`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${style.color}`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-cyan-400/60">{log.timestamp}</span>
                              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                {log.app}
                              </Badge>
                              <Badge className={style.bg + ' ' + style.border + ' ' + style.color}>
                                {log.level}
                              </Badge>
                            </div>
                            <p className="text-white">{log.message}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
