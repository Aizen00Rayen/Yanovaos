import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Monitor, Smartphone, Server, Laptop, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';

const devices = [
  { id: 1, name: 'Main Server', icon: Server, status: 'active', x: 50, y: 50 },
  { id: 2, name: 'Workstation 1', icon: Monitor, status: 'active', x: 20, y: 30 },
  { id: 3, name: 'Workstation 2', icon: Laptop, status: 'active', x: 80, y: 30 },
  { id: 4, name: 'Mobile Device', icon: Smartphone, status: 'warning', x: 20, y: 70 },
  { id: 5, name: 'Workstation 3', icon: Monitor, status: 'active', x: 80, y: 70 },
];

export function NetworkMapCard() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 3);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-300 flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            Network Map
          </CardTitle>
          <Badge className="bg-blue-500/20 text-cyan-300 border-cyan-500/30">
            5 Devices Connected
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-80 bg-slate-950/50 rounded-xl border border-cyan-500/20 overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
          
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {devices.map((device) => (
              <line
                key={`line-${device.id}`}
                x1="50%"
                y1="50%"
                x2={`${device.x}%`}
                y2={`${device.y}%`}
                stroke="url(#gradient)"
                strokeWidth="2"
                className="opacity-30"
              />
            ))}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-cyan-500/50 animate-pulse">
                <Server className="w-8 h-8 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-20" />
            </div>
          </div>
          
          {/* Devices */}
          {devices.map((device) => {
            const Icon = device.icon;
            return (
              <div
                key={device.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${device.x}%`, top: `${device.y}%` }}
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-lg ${
                    device.status === 'active' 
                      ? 'bg-slate-800 border-2 border-cyan-500/50' 
                      : 'bg-slate-800 border-2 border-yellow-500/50'
                  } flex items-center justify-center shadow-lg transition-all group-hover:scale-110`}>
                    <Icon className={`w-6 h-6 ${device.status === 'active' ? 'text-cyan-400' : 'text-yellow-400'}`} />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {device.name}
                  </div>
                  {pulse === device.id % 3 && (
                    <div className="absolute inset-0 rounded-lg border-2 border-cyan-400 animate-ping" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Traffic Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-slate-950/50 rounded-lg p-3 border border-cyan-500/20">
            <p className="text-xs text-cyan-400/60">Incoming</p>
            <p className="text-white">245 MB/s</p>
          </div>
          <div className="bg-slate-950/50 rounded-lg p-3 border border-cyan-500/20">
            <p className="text-xs text-cyan-400/60">Outgoing</p>
            <p className="text-white">189 MB/s</p>
          </div>
          <div className="bg-slate-950/50 rounded-lg p-3 border border-cyan-500/20">
            <p className="text-xs text-cyan-400/60">Packets/s</p>
            <p className="text-white">12.4K</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
