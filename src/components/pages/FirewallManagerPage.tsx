import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Shield, Plus, RefreshCw, AlertTriangle, CheckCircle, XCircle, Globe, Lock } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

const firewallRules = [
  { id: 1, name: 'Block SSH from External', protocol: 'TCP', port: '22', source: 'Any', action: 'Block', enabled: true, hits: 1247 },
  { id: 2, name: 'Allow HTTPS Traffic', protocol: 'TCP', port: '443', source: 'Any', action: 'Allow', enabled: true, hits: 45621 },
  { id: 3, name: 'Block Suspicious IPs', protocol: 'Any', port: 'Any', source: '185.220.*.*', action: 'Block', enabled: true, hits: 892 },
  { id: 4, name: 'Allow Internal Network', protocol: 'Any', port: 'Any', source: '192.168.0.0/16', action: 'Allow', enabled: true, hits: 23456 },
  { id: 5, name: 'Block Tor Exit Nodes', protocol: 'Any', port: 'Any', source: 'Tor List', action: 'Block', enabled: true, hits: 342 },
  { id: 6, name: 'Allow DNS Queries', protocol: 'UDP', port: '53', source: 'Any', action: 'Allow', enabled: true, hits: 12890 },
  { id: 7, name: 'Block Outbound SMTP', protocol: 'TCP', port: '25', source: 'Internal', action: 'Block', enabled: false, hits: 0 },
  { id: 8, name: 'Allow VPN Connections', protocol: 'UDP', port: '1194', source: 'Any', action: 'Allow', enabled: true, hits: 567 },
];

const recentBlocks = [
  { ip: '185.220.101.42', country: 'Russia', reason: 'SSH Brute Force', time: '2 min ago', rule: 'Block SSH from External' },
  { ip: '218.92.0.156', country: 'China', reason: 'Port Scan', time: '5 min ago', rule: 'Block Suspicious IPs' },
  { ip: '142.250.80.14', country: 'USA', reason: 'Malware C2', time: '12 min ago', rule: 'Block Tor Exit Nodes' },
  { ip: '46.101.54.78', country: 'Germany', reason: 'Exploit Attempt', time: '18 min ago', rule: 'Block SSH from External' },
];

export function FirewallManagerPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Firewall Manager
          </h1>
          <p className="text-cyan-400/60 mt-1">Configure and monitor firewall rules and policies</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-slate-800 border border-cyan-500/30 hover:bg-slate-700 text-cyan-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg shadow-cyan-500/30">
            <Plus className="w-4 h-4 mr-2" />
            Add Rule
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Firewall Status</p>
                <p className="text-2xl text-white">Active</p>
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
                <p className="text-cyan-400/60 text-sm mb-1">Active Rules</p>
                <p className="text-2xl text-white">7/8</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400/60 text-sm mb-1">Blocked Today</p>
                <p className="text-2xl text-white">3,482</p>
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
                <p className="text-cyan-400/60 text-sm mb-1">Allowed Today</p>
                <p className="text-2xl text-white">127.5K</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-400 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Globe className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Firewall Rules */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300">Firewall Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-slate-950/50 border border-cyan-500/20">
                  <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400">
                    All Rules
                  </TabsTrigger>
                  <TabsTrigger value="block" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400">
                    Block Rules
                  </TabsTrigger>
                  <TabsTrigger value="allow" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400">
                    Allow Rules
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-4">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-3">
                      {firewallRules.map((rule) => (
                        <div
                          key={rule.id}
                          className="p-4 rounded-lg bg-slate-950/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-white">{rule.name}</h3>
                                <Badge className={`${
                                  rule.action === 'Block' 
                                    ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                                    : 'bg-green-500/20 text-green-300 border-green-500/30'
                                }`}>
                                  {rule.action}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-cyan-400/60">Protocol</p>
                                  <p className="text-cyan-300">{rule.protocol}</p>
                                </div>
                                <div>
                                  <p className="text-cyan-400/60">Port</p>
                                  <p className="text-cyan-300">{rule.port}</p>
                                </div>
                                <div>
                                  <p className="text-cyan-400/60">Source</p>
                                  <p className="text-cyan-300">{rule.source}</p>
                                </div>
                                <div>
                                  <p className="text-cyan-400/60">Hits</p>
                                  <p className="text-cyan-300">{rule.hits.toLocaleString()}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                              <Switch checked={rule.enabled} />
                              <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-slate-800">
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="block">
                  <p className="text-cyan-400/60 text-center py-8">Showing block rules only</p>
                </TabsContent>
                
                <TabsContent value="allow">
                  <p className="text-cyan-400/60 text-center py-8">Showing allow rules only</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Recent Blocks */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Recent Blocks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {recentBlocks.map((block, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 shadow-lg shadow-red-500/10"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-white">{block.ip}</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-cyan-400/60">Country: <span className="text-cyan-300">{block.country}</span></p>
                        <p className="text-cyan-400/60">Reason: <span className="text-cyan-300">{block.reason}</span></p>
                        <p className="text-cyan-400/60">Rule: <span className="text-cyan-300">{block.rule}</span></p>
                        <p className="text-cyan-400/40 text-xs mt-2">{block.time}</p>
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
