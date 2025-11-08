import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { AlertTriangle, Shield, Activity, Lock } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'critical',
    icon: AlertTriangle,
    title: 'Suspicious Login Attempt',
    description: 'Multiple failed SSH attempts from IP 185.220.101.42',
    time: '2 min ago',
    source: 'IDS'
  },
  {
    id: 2,
    type: 'warning',
    icon: Shield,
    title: 'Firewall Rule Triggered',
    description: 'Blocked outbound connection to unknown domain',
    time: '15 min ago',
    source: 'Firewall'
  },
  {
    id: 3,
    type: 'info',
    icon: Activity,
    title: 'High Network Activity',
    description: 'Port 443 traffic increased by 340%',
    time: '28 min ago',
    source: 'Network Monitor'
  },
  {
    id: 4,
    type: 'warning',
    icon: Lock,
    title: 'Certificate Expiring Soon',
    description: 'SSL certificate expires in 14 days',
    time: '1 hour ago',
    source: 'Security'
  },
  {
    id: 5,
    type: 'critical',
    icon: AlertTriangle,
    title: 'Malware Detection',
    description: 'Potential trojan detected in /tmp directory',
    time: '2 hours ago',
    source: 'IDS'
  },
  {
    id: 6,
    type: 'info',
    icon: Shield,
    title: 'Security Scan Complete',
    description: 'Weekly vulnerability scan finished - 0 critical issues',
    time: '3 hours ago',
    source: 'Scanner'
  },
];

export function SecurityAlertsCard() {
  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          badge: 'bg-red-500/20 text-red-300 border-red-500/30',
          glow: 'shadow-red-500/20'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
          glow: 'shadow-yellow-500/20'
        };
      default:
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          glow: 'shadow-blue-500/20'
        };
    }
  };

  return (
    <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-300 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Security Alerts
          </CardTitle>
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
            2 Critical
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {alerts.map((alert) => {
              const Icon = alert.icon;
              const style = getAlertStyle(alert.type);
              
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg ${style.bg} border ${style.border} ${style.glow} shadow-lg transition-all hover:scale-[1.02] cursor-pointer`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${style.bg} border ${style.border} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-white">{alert.title}</p>
                        <Badge className={`${style.badge} text-xs whitespace-nowrap`}>
                          {alert.source}
                        </Badge>
                      </div>
                      <p className="text-sm text-cyan-400/60 mb-2">{alert.description}</p>
                      <p className="text-xs text-cyan-400/40">{alert.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
