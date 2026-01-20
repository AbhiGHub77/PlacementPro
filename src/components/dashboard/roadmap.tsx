import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { mockUser } from "@/lib/data";

export function Roadmap() {
  const progress = (mockUser.roadmap.filter(s => s.isCompleted).length / mockUser.roadmap.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Personalized Roadmap</CardTitle>
        <CardDescription>
          Your path to success. {progress.toFixed(0)}% complete.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
          {mockUser.roadmap.map((step) => (
            <div key={step.id} className="flex items-start gap-3">
              <Checkbox id={`step-${step.id}`} checked={step.isCompleted} className="mt-1" />
              <div className="grid gap-0.5">
                <label htmlFor={`step-${step.id}`} className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <span className="font-bold">W{step.week}:</span> {step.title}
                </label>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
