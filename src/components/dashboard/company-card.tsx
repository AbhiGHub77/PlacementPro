'use client';
import type { CompanyMatch } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, Clock, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface CompanyCardProps {
  match: CompanyMatch;
  onClick?: () => void;
}

const statusConfig = {
  recommended: {
    icon: CheckCircle2,
    label: 'Apply Now',
    variant: 'recommended' as const,
    description: 'You meet the requirements'
  },
  prepare: {
    icon: Clock,
    label: 'Prepare First',
    variant: 'prepare' as const,
    description: 'Close to ready'
  },
  avoid: {
    icon: XCircle,
    label: 'Not Yet',
    variant: 'avoid' as const,
    description: 'Significant gaps exist'
  }
};

const tierConfig = {
  tier1: { variant: 'tier1' as const, label: 'FAANG+' },
  tier2: { variant: 'tier2' as const, label: 'Product' },
  tier3: { variant: 'tier3' as const, label: 'Service' }
};

export function CompanyCard({ match, onClick }: CompanyCardProps) {
  const status = statusConfig[match.status];
  const tier = tierConfig[match.company.tier];
  const StatusIcon = status.icon;

  return (
    <Card 
      variant="interactive" 
      className="overflow-hidden"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">{match.company.name}</CardTitle>
              <div className="flex gap-2 mt-1">
                <Badge variant={tier.variant} className="text-[10px]">{tier.label}</Badge>
                <Badge variant={status.variant} className="text-[10px]">
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {status.label}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{match.fitScore}%</div>
            <div className="text-xs text-muted-foreground">Fit Score</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress 
          value={match.fitScore} 
          size="sm"
          indicatorColor={match.status === 'recommended' ? 'success' : match.status === 'prepare' ? 'warning' : 'destructive'}
        />
        
        {match.gaps.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Skill Gaps
            </p>
            <div className="flex flex-wrap gap-1.5">
              {match.gaps.slice(0, 3).map((gap) => (
                <Badge 
                  key={gap.skill} 
                  variant="outline" 
                  className="text-[10px] font-normal"
                >
                  {gap.skill}: {gap.current.toFixed(1)} → {gap.required}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {match.prepTime > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>~{match.prepTime} weeks prep time</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
