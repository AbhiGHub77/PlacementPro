import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="space-y-6">
       <header className="flex items-center gap-4">
         <FileText className="h-6 w-6" />
        <div>
          <h1 className="text-2xl font-bold">Resume Intelligence</h1>
          <p className="text-muted-foreground">
            Analyze your resume and get feedback.
          </p>
        </div>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Under Construction</CardTitle>
          <CardDescription>This feature is coming soon!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Soon, you'll be able to upload your resume here to get an ATS-style score, see how it fits with target companies, and get AI-powered feedback to improve its clarity and impact.</p>
        </CardContent>
      </Card>
    </div>
  );
}
