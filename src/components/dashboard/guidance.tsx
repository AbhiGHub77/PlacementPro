import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUser } from "@/lib/data";
import { Ban } from "lucide-react";

export function Guidance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Ban className="h-6 w-6 text-destructive" />
          What NOT To Do
        </CardTitle>
        <CardDescription>
          Expert advice on what to avoid to stay on track.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm p-4 bg-muted/50 rounded-lg">
          <p>{mockUser.guidance}</p>
        </div>
      </CardContent>
    </Card>
  );
}
