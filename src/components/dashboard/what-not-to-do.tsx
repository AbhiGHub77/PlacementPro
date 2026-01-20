'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, X, Ban, Clock, TrendingDown } from 'lucide-react';

interface NegativeAdvice {
  type: 'skill' | 'company' | 'approach';
  title: string;
  reason: string;
}

interface WhatNotToDoProps {
  advices: NegativeAdvice[];
}

const typeConfig = {
  skill: { 
    icon: TrendingDown, 
    label: 'Skip This Skill', 
    color: 'text-warning',
    bgColor: 'bg-warning/10'
  },
  company: { 
    icon: Ban, 
    label: 'Avoid Now', 
    color: 'text-destructive',
    bgColor: 'bg-destructive/10'
  },
  approach: { 
    icon: Clock, 
    label: 'Inefficient Path', 
    color: 'text-muted-foreground',
    bgColor: 'bg-muted'
  }
};

export function WhatNotToDo({ advices }: WhatNotToDoProps) {
  return (
    <Card variant="gradient" className="border-destructive/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          What NOT To Do
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Avoid these to save time and effort
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {advices.map((advice, idx) => {
          const config = typeConfig[advice.type];
          const Icon = config.icon;
          
          return (
            <div 
              key={idx}
              className={`flex items-start gap-3 p-3 rounded-lg ${config.bgColor} border border-border/50`}
            >
              <div className={`p-1.5 rounded-full ${config.bgColor}`}>
                <Icon className={`h-4 w-4 ${config.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{advice.title}</span>
                  <Badge variant="outline" className="text-[10px]">
                    {config.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {advice.reason}
                </p>
              </div>
              <X className="h-4 w-4 text-muted-foreground" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
