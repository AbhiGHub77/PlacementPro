import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUser } from "@/lib/data";
import type { Company } from '@/lib/types';

const CompanyCard = ({ company }: { company: Company }) => (
  <div className="flex items-center justify-between space-x-4 p-2 hover:bg-muted/50 rounded-lg transition-colors">
    <div className="flex items-center space-x-4">
      <Image
        src={company.logoUrl}
        alt={`${company.name} logo`}
        width={40}
        height={40}
        className="rounded-full"
        data-ai-hint="logo"
      />
      <div>
        <p className="text-sm font-medium leading-none">{company.name}</p>
        <p className="text-sm text-muted-foreground">Fit Score: {company.fitScore}%</p>
      </div>
    </div>
    <Badge variant={
      company.recommendation === 'Recommended' ? 'default' :
      company.recommendation === 'Prepare First' ? 'secondary' : 'destructive'
    } className="hidden sm:inline-flex">
      {company.recommendation}
    </Badge>
  </div>
);

export function CompanyRecommendations() {
  const recommended = mockUser.companies.filter(c => c.recommendation === 'Recommended');
  const prepareFirst = mockUser.companies.filter(c => c.recommendation === 'Prepare First');
  const notSuitable = mockUser.companies.filter(c => c.recommendation === 'Not Suitable Yet');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Company Recommendations</CardTitle>
        <CardDescription>Based on your profile and career goals</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recommended">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="prepare">Prepare First</TabsTrigger>
            <TabsTrigger value="avoid">Not Suitable</TabsTrigger>
          </TabsList>
          <div className="mt-4 space-y-4 max-h-[198px] overflow-y-auto pr-2">
            <TabsContent value="recommended" className="m-0">
              {recommended.map(company => <CompanyCard key={company.id} company={company} />)}
            </TabsContent>
            <TabsContent value="prepare" className="m-0">
              {prepareFirst.map(company => <CompanyCard key={company.id} company={company} />)}
            </TabsContent>
            <TabsContent value="avoid" className="m-0">
              {notSuitable.map(company => <CompanyCard key={company.id} company={company} />)}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
