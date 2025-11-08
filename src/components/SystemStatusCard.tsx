import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Cpu, HardDrive, Wifi, Activity } from 'lucide-react';

const systemMetrics = [
  { 
    icon: Cpu, 
    label: 'CPU Usage', 
    value: 67, 
    status: 'normal',
    details: '8 Cores @ 3.6GHz'
  },
  { 
    icon: HardDrive, 
    label: 'RAM Usage', 
    value: 45, 
    status: 'good',
    details: '18GB / 32GB Used'
  },
  { 
    icon: Wifi, 
    label: 'Network', 
    value: 82, 
    status: 'high',
    details: '820 Mbps Transfer'
  },
  { 
    icon: Activity, 
    label: 'System Load', 
    value: 54, 
    status: 'normal',
    details: 'Avg Load: 2.4'
  },
];

export function SystemStatusCard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'from-green-500 to-emerald-400';
      case 'normal': return 'from-blue-500 to-cyan-400';
      case 'high': return 'from-yellow-500 to-orange-400';
      default: return 'from-blue-500 to-cyan-400';
    }
  };

  return (
    <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
      <CardHeader>
        <CardTitle className="text-cyan-300 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getStatusColor(metric.status)} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white">{metric.label}</p>
                    <p className="text-xs text-cyan-400/60">{metric.details}</p>
                  </div>
                </div>
                <span className="text-white">{metric.value}%</span>
              </div>
              <div className="relative">
                <Progress 
                  value={metric.value} 
                  className="h-2 bg-slate-800/50"
                />
                <div 
                  className={`absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r ${getStatusColor(metric.status)} transition-all duration-500 shadow-lg`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
