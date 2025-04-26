
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const data = [
  { name: 'Sun', views: 400 },
  { name: 'Mon', views: 300 },
  { name: 'Tue', views: 520 },
  { name: 'Wed', views: 400 },
  { name: 'Thu', views: 500 },
  { name: 'Fri', views: 680 },
  { name: 'Sat', views: 450 },
];

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  positive: boolean;
};

const MetricCard = ({ title, value, change, positive }: MetricCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {positive ? '+' : '-'}{change}
      </p>
    </CardContent>
  </Card>
);

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Views" value="132.4k" change="12.3%" positive={true} />
        <MetricCard title="Engagement" value="8.2%" change="1.1%" positive={true} />
        <MetricCard title="New Followers" value="2,854" change="3.2%" positive={true} />
        <MetricCard title="Post Reach" value="48.9k" change="2.8%" positive={false} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Video Views (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#1EAEDB"
                fill="#1EAEDB20"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
