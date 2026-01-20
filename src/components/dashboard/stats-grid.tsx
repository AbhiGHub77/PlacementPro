'use client';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Target, Clock, Building2 } from 'lucide-react';
import type { SkillScores, CompanyMatch } from '@/lib/types';

interface StatsGridProps {
  skills: SkillScores;
  matches: CompanyMatch[];
  timelineWeeks: number;
}

export function StatsGrid({ skills, matches, timelineWeeks }: StatsGridProps) {
  const recommendedCount = matches.filter(m => m.status === 'recommended').length;
  const prepareCount = matches.filter(m => m.status === 'prepare').length;
  
  const stats = [
    {
      label: 'Overall Score',
      value: `${skills.overall.toFixed(1)}/5`,
      subtext: getScoreLevel(skills.overall),
      icon: TrendingUp,
      gradient: 'from-primary to-primary/50'
    },
    {
      label: 'Ready To Apply',
      value: recommendedCount.toString(),
      subtext: `${prepareCount} need prep`,
      icon: Building2,
      gradient: 'from-success to-success/50'
    },
    {
      label: 'Prep Timeline',
      value: `${timelineWeeks}w`,
      subtext: 'to full readiness',
      icon: Clock,
      gradient: 'from-warning to-warning/50'
    },
    {
      label: 'Primary Focus',
      value: getPrimaryFocus(skills),
      subtext: 'highest ROI area',
      icon: Target,
      gradient: 'from-skill-fundamentals to-skill-fundamentals/50'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx} variant="stat">
          <CardContent className="p-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
              </div>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                <stat.icon className="h-5 w-5 text-background" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function getScoreLevel(score: number): string {
  if (score >= 4.5) return 'Elite Ready';
  if (score >= 4) return 'Strong';
  if (score >= 3) return 'Intermediate';
  if (score >= 2) return 'Building Up';
  return 'Getting Started';
}

function getPrimaryFocus(skills: SkillScores): string {
  const areas = [
    { name: 'DSA', value: skills.dsa },
    { name: 'CS Core', value: skills.fundamentals.average },
    { name: 'Projects', value: skills.projects },
    { name: 'Experience', value: skills.experience }
  ];
  
  // Find the area with most room for improvement that's not too low
  const sorted = areas.sort((a, b) => a.value - b.value);
  return sorted[0].name;
}
