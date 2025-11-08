import { SystemStatusCard } from '../SystemStatusCard';
import { NetworkMapCard } from '../NetworkMapCard';
import { SecurityAlertsCard } from '../SecurityAlertsCard';
import { ActivityCard } from '../ActivityCard';
import { ThreatMapCard } from '../ThreatMapCard';

export function DashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* System Status - Top Left */}
      <div className="col-span-12 lg:col-span-4">
        <SystemStatusCard />
      </div>
      
      {/* Network Map - Top Center/Right */}
      <div className="col-span-12 lg:col-span-8">
        <NetworkMapCard />
      </div>
      
      {/* Security Alerts - Middle Left */}
      <div className="col-span-12 lg:col-span-5">
        <SecurityAlertsCard />
      </div>
      
      {/* Activity Chart - Middle Right */}
      <div className="col-span-12 lg:col-span-7">
        <ActivityCard />
      </div>
      
      {/* Threat Map - Bottom */}
      <div className="col-span-12">
        <ThreatMapCard />
      </div>
    </div>
  );
}
