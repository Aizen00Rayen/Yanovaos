import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Network, Activity, TrendingUp, TrendingDown, Wifi, Server, Globe, RefreshCw } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const bandwidthData = [
  { time: '00:00', download: 245, upload: 189, total: 434 },
  { time: '04:00', download: 178, upload: 142, total: 320 },
  { time: '08:00', download: 456, upload: 298, total: 754 },
  { time: '12:00', download: 612, upload: 445, total: 1057 },
  { time: '16:00', download: 534, upload: 389, total: 923 },
  { time: '20:00', download: 398, upload: 267, total: 665 },
];

const topConnections = [
  { service: 'HTTPS', port: 443, connections: 1247, bandwidth: '456 MB/s', protocol: 'TCP' },
  { service: 'DNS', port: 53, connections: 892, bandwidth: '12 MB/s', protocol: 'UDP' },
  { service: 'SSH', port: 22, connections: 45, bandwidth: '2.3 MB/s', protocol: 'TCP' },
  { service: 'HTTP', port: 80, connections: 234, bandwidth: '89 MB/s', protocol: 'TCP' },
  { service: 'MySQL', port: 3306, connections: 67, bandwidth: '34 MB/s', protocol: 'TCP' },
];

const activeConnections = [
  { id: 1, source: '192.168.1.45', destination: '142.250.80.14', port: 443, protocol: 'HTTPS', status: 'Established', traffic: '2.3 MB' },
  { id: 2, source: '192.168.1.67', destination: '185.220.101.42', port: 22, protocol: 'SSH', status: 'Suspicious', traffic: '890 KB' },
  { id: 3, source: '192.168.1.23', destination: '8.8.8.8', port: 53, protocol: 'DNS', status: 'Established', traffic: '45 KB' },
  { id: 4, source: '192.168.1.89', destination: '151.101.1.140', port: 443, protocol: 'HTTPS', status: 'Established', traffic: '5.6 MB' },
  { id: 5, source: '192.168.1.12', destination: '192.168.1.1', port: 3306, protocol: 'MySQL', status: 'Established', traffic: '1.2 MB' },
];

const interfaceStats = [
  { name: 'eth0', status: 'Up', ip: '192.168.1.100', speed: '1 Gbps', rx: '45.2 GB', tx: '23.8 GB' },
  { name: 'eth1', status: 'Up', ip: '10.0.0.50', speed: '1 Gbps', rx: '12.4 GB', tx: '8.9 GB' },
  { name: 'wlan0', status: 'Down', ip: 'N/A', speed: 'N/A', rx: '0 GB', tx: '0 GB' },
];

export function NetworkMonitorPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Network Monitor
          </h1>
          <p className="text-cyan-400/60 mt-1">Real-time network traffic and connection monitoring</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-slate-800 border border-cyan-500/30 hover:bg-slate-700 text-cyan-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg shadow-cyan-500/30">
            <Activity className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Total Bandwidth</p>
                <p className="text-2xl text-white">923 MB/s</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Active Connections</p>
                <p className="text-2xl text-white">2,485</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-500/50">
                <Network className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Packets/Second</p>
                <p className="text-2xl text-white">12.4K</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-400 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Network Latency</p>
                <p className="text-2xl text-white">24ms</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-400 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                <Wifi className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bandwidth Chart */}
      <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-cyan-300">Bandwidth Usage (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bandwidthData}>
              <defs>
                <linearGradient id="download" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="upload" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#06b6d4" opacity={0.1} />
              <XAxis dataKey="time" stroke="#06b6d4" opacity={0.5} tick={{ fill: '#67e8f9' }} />
              <YAxis stroke="#06b6d4" opacity={0.5} tick={{ fill: '#67e8f9' }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="download" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#download)" />
              <Area type="monotone" dataKey="upload" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#upload)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
              <span className="text-sm text-cyan-400/60">Download</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
              <span className="text-sm text-cyan-400/60">Upload</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
              <span className="text-sm text-cyan-400/60">Total</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Active Connections */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Active Connections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {activeConnections.map((conn) => (
                    <div
                      key={conn.id}
                      className={`p-4 rounded-lg border transition-all hover:scale-[1.01] ${
                        conn.status === 'Suspicious'
                          ? 'bg-red-500/10 border-red-500/30'
                          : 'bg-slate-950/50 border-cyan-500/20 hover:border-cyan-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Server className="w-4 h-4 text-cyan-400" />
                          <span className="text-white">{conn.source} → {conn.destination}</span>
                        </div>
                        <Badge className={
                          conn.status === 'Suspicious'
                            ? 'bg-red-500/20 text-red-300 border-red-500/30'
                            : 'bg-green-500/20 text-green-300 border-green-500/30'
                        }>
                          {conn.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-cyan-400/60">Protocol</p>
                          <p className="text-cyan-300">{conn.protocol}</p>
                        </div>
                        <div>
                          <p className="text-cyan-400/60">Port</p>
                          <p className="text-cyan-300">{conn.port}</p>
                        </div>
                        <div>
                          <p className="text-cyan-400/60">Traffic</p>
                          <p className="text-cyan-300">{conn.traffic}</p>
                        </div>
                        <div className="flex justify-end">
                          <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-slate-800">
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Top Services */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300">Top Services</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {topConnections.map((service, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-slate-950/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white">{service.service}</h3>
                        <Badge className="bg-blue-500/20 text-cyan-300 border-cyan-500/30">
                          Port {service.port}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-cyan-400/60">Connections: <span className="text-cyan-300">{service.connections.toLocaleString()}</span></p>
                        <p className="text-cyan-400/60">Bandwidth: <span className="text-cyan-300">{service.bandwidth}</span></p>
                        <p className="text-cyan-400/60">Protocol: <span className="text-cyan-300">{service.protocol}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Network Interfaces */}
      <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-cyan-300">Network Interfaces</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {interfaceStats.map((iface, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-slate-950/50 border border-cyan-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white">{iface.name}</h3>
                  <Badge className={
                    iface.status === 'Up'
                      ? 'bg-green-500/20 text-green-300 border-green-500/30'
                      : 'bg-red-500/20 text-red-300 border-red-500/30'
                  }>
                    {iface.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-cyan-400/60">IP Address</span>
                    <span className="text-cyan-300">{iface.ip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-400/60">Speed</span>
                    <span className="text-cyan-300">{iface.speed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-400/60">RX</span>
                    <span className="text-cyan-300">{iface.rx}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-400/60">TX</span>
                    <span className="text-cyan-300">{iface.tx}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
