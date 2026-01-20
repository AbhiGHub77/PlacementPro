'use client';
import type { RoadmapWeek, RoadmapTask } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, BookOpen } from 'lucide-react';

interface RoadmapCardProps {
  week: RoadmapWeek;
  onTaskToggle: (taskId: string) => void;
}

const priorityConfig = {
  high: { variant: 'destructive' as const, label: 'High Priority' },
  medium: { variant: 'warning' as const, label: 'Medium' },
  low: { variant: 'secondary' as const, label: 'Low' }
};

export function RoadmapCard({ week, onTaskToggle }: RoadmapCardProps) {
  const completedTasks = week.tasks.filter(t => t.isCompleted).length;
  const progress = (completedTasks / week.tasks.length) * 100;

  return (
    <Card variant="gradient" className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mb-2">Week {week.weekNumber}</Badge>
            <CardTitle className="text-lg">{week.theme}</CardTitle>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{week.estimatedHours}h</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {completedTasks}/{week.tasks.length} done
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {week.tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={() => onTaskToggle(task.id)}
          />
        ))}
      </CardContent>
    </Card>
  );
}

interface TaskItemProps {
  task: RoadmapTask;
  onToggle: () => void;
}

function TaskItem({ task, onToggle }: TaskItemProps) {
  const priority = priorityConfig[task.priority];

  return (
    <div 
      className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
        task.isCompleted 
          ? 'bg-muted/50 border-border/50 opacity-60' 
          : 'bg-card border-border hover:border-primary/50'
      }`}
    >
      <Checkbox 
        checked={task.isCompleted}
        onCheckedChange={onToggle}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-medium ${task.isCompleted ? 'line-through' : ''}`}>
            {task.title}
          </span>
          <Badge variant={priority.variant} className="text-[10px]">
            {priority.label}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
        
        {task.resources.length > 0 && !task.isCompleted && (
          <div className="flex flex-wrap gap-1 mt-2">
            {task.resources.slice(0, 3).map((resource, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-[10px] font-normal cursor-pointer hover:bg-secondary"
              >
                <BookOpen className="h-2.5 w-2.5 mr-1" />
                {resource}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        {task.estimatedHours}h
      </div>
    </div>
  );
}
