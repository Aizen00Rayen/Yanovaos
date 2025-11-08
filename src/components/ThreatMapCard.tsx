import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Globe, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const threats = [
  { id: 1, country: 'Russia', ip: '185.220.101.42', type: 'SSH Brute Force', severity: 'high', x: 70, y: 25 },
  { id: 2, country: 'China', ip: '218.92.0.156', type: 'Port Scan', severity: 'medium', x: 80, y: 35 },
  { id: 3, country: 'USA', ip: '142.250.80.14', type: 'DDoS Attempt', severity: 'critical', x: 20, y: 40 },
  { id: 4, country: 'Germany', ip: '46.101.54.78', type: 'Malware', severity: 'high', x: 52, y: 30 },
  { id: 5, country: 'Brazil', ip: '177.54.144.23', type: 'SQL Injection', severity: 'medium', x: 30, y: 70 },
];

export function ThreatMapCard() {
  const [activeThreats, setActiveThreats] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomThreat = threats[Math.floor(Math.random() * threats.length)];
      setActiveThreats(prev => {
        const updated = [...prev, randomThreat.id];
        return updated.slice(-3);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 border-red-500';
      case 'high': return 'bg-orange-500 border-orange-500';
      default: return 'bg-yellow-500 border-yellow-500';
    }
  };

  return (
    <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-300 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Global Threat Map
          </CardTitle>
          <div className="flex gap-2">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
              1 Critical
            </Badge>
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
              2 High
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              2 Medium
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96 bg-slate-950/50 rounded-xl border border-cyan-500/20 overflow-hidden">
          {/* World Map Simulation */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }} />
          
          {/* Threat Points */}
          {threats.map((threat) => {
            const isActive = activeThreats.includes(threat.id);
            return (
              <div
                key={threat.id}
                className="absolute group"
                style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
              >
                <div className="relative">
                  {/* Pulse Effect */}
                  {isActive && (
                    <div className={`absolute -inset-2 rounded-full ${getSeverityColor(threat.severity)} opacity-20 animate-ping`} />
                  )}
                  
                  {/* Threat Marker */}
                  <div className={`w-4 h-4 rounded-full ${getSeverityColor(threat.severity)} shadow-xl animate-pulse cursor-pointer`}>
                    <div className="w-full h-full rounded-full border-2 border-white/50" />
                  </div>
                  
                  {/* Connection Line */}
                  <svg className="absolute top-0 left-0 pointer-events-none" style={{ width: '200px', height: '200px', marginLeft: '-100px', marginTop: '-100px' }}>
                    <line
                      x1="100"
                      y1="100"
                      x2="100"
                      y2="0"
                      stroke={threat.severity === 'critical' ? '#ef4444' : threat.severity === 'high' ? '#f97316' : '#eab308'}
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.3"
                      className="animate-pulse"
                    />
                  </svg>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-cyan-500/30 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span className="text-white">{threat.country}</span>
                    </div>
                    <p className="text-xs text-cyan-400/60">IP: {threat.ip}</p>
                    <p className="text-xs text-cyan-400/60">Type: {threat.type}</p>
                    <Badge className={`mt-2 ${getSeverityColor(threat.severity)} text-white text-xs`}>
                      {threat.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Center Point (Your Location) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-2xl shadow-cyan-500/50 border-2 border-white/50" />
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-30" />
            </div>
          </div>
        </div>
        
        {/* Recent Threats List */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {threats.slice(0, 3).map((threat) => (
            <div
              key={threat.id}
              className="bg-slate-950/50 border border-cyan-500/20 rounded-lg p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">{threat.country}</span>
                <Badge className={`${getSeverityColor(threat.severity)} text-white text-xs`}>
                  {threat.severity}
                </Badge>
              </div>
              <p className="text-xs text-cyan-400/60 mb-1">{threat.type}</p>
              <p className="text-xs text-cyan-400/40">{threat.ip}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
