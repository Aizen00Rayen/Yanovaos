import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Activity } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', threats: 12, traffic: 45, cpu: 34 },
  { time: '04:00', threats: 8, traffic: 32, cpu: 28 },
  { time: '08:00', threats: 24, traffic: 78, cpu: 56 },
  { time: '12:00', threats: 35, traffic: 92, cpu: 67 },
  { time: '16:00', threats: 28, traffic: 85, cpu: 61 },
  { time: '20:00', threats: 19, traffic: 67, cpu: 48 },
  { time: '23:59', threats: 15, traffic: 54, cpu: 42 },
];

export function ActivityCard() {
  return (
    <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
      <CardHeader>
        <CardTitle className="text-cyan-300 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          System Activity (24h)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#06b6d4" opacity={0.1} />
            <XAxis 
              dataKey="time" 
              stroke="#06b6d4" 
              opacity={0.5}
              tick={{ fill: '#67e8f9' }}
            />
            <YAxis 
              stroke="#06b6d4" 
              opacity={0.5}
              tick={{ fill: '#67e8f9' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="threats" 
              stroke="#ef4444" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorThreats)" 
            />
            <Area 
              type="monotone" 
              dataKey="traffic" 
              stroke="#06b6d4" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorTraffic)" 
            />
            <Area 
              type="monotone" 
              dataKey="cpu" 
              stroke="#3b82f6" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorCpu)" 
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            <span className="text-sm text-cyan-400/60">Threats Blocked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
            <span className="text-sm text-cyan-400/60">Network Traffic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
            <span className="text-sm text-cyan-400/60">CPU Usage</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
