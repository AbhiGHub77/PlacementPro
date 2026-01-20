'use client';
import type { SkillScores } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SkillRadarProps {
  skills: SkillScores;
}

const skillConfig = {
  dsa: { label: 'DSA', color: 'dsa' as const, description: 'Data Structures & Algorithms' },
  fundamentals: { label: 'CS Fundamentals', color: 'fundamentals' as const, description: 'OS, CN, DBMS, OOPs' },
  projects: { label: 'Projects', color: 'projects' as const, description: 'Portfolio & practical work' },
  experience: { label: 'Experience', color: 'experience' as const, description: 'Internships & work' }
};

export function SkillRadar({ skills }: SkillRadarProps) {
  return (
    <Card variant="gradient" className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Skill Assessment</span>
          <span className="text-4xl font-bold text-gradient">{skills.overall.toFixed(1)}/5</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(skillConfig).map(([key, config]) => {
          const value = key === 'fundamentals' 
            ? skills.fundamentals.average 
            : skills[key as keyof Omit<SkillScores, 'overall' | 'fundamentals'>] as number;
          const percentage = (value / 5) * 100;
          
          return (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{config.label}</p>
                  <p className="text-xs text-muted-foreground">{config.description}</p>
                </div>
                <span className="text-lg font-semibold">{value.toFixed(1)}</span>
              </div>
              <Progress 
                value={percentage} 
                size="sm" 
                indicatorColor={config.color}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
