import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockUser } from "@/lib/data";
import { Briefcase, Goal, Rocket, Timer } from "lucide-react";

const kpiData = [
  { title: "Readiness", value: `${mockUser.readiness}%`, icon: Goal, color: "text-accent" },
  { title: "Time to Placement", value: mockUser.timeToPlacement, icon: Timer, color: "text-blue-500" },
  { title: "Target Companies", value: `${mockUser.companies.filter(c => c.recommendation === 'Recommended').length} Recommended`, icon: Briefcase, color: "text-green-500" },
];

export function OverviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Welcome Back, {mockUser.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Rocket className="w-12 h-12 text-primary" />
            <div>
              <p className="text-2xl font-bold font-headline">Let's Get Started</p>
              <p className="text-xs text-muted-foreground">Your career journey awaits.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {kpiData.map((kpi, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className={`h-4 w-4 text-muted-foreground ${kpi.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{kpi.value}</div>
            {kpi.title === 'Readiness' && <Progress value={mockUser.readiness} className="mt-2 h-2" />}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
