import React from 'react';
import {
  BarChart, XAxis, YAxis, Tooltip, Bar
} from 'recharts';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, ChevronDown, GripVertical, Info, Plus } from "lucide-react"; // Добавлен Plus

const visualizationComponents = {
  1: ({ data }) => (
    <div className="space-y-4">
      {data?.tasks?.map((task) => (
        <div key={task.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
              <h3 className="font-medium">{task.title}</h3>
              <Badge variant={task.complexity === 'high' ? 'destructive' : 'secondary'}>
                {task.complexity}
              </Badge>
            </div>
            <Progress value={task.progress || 0} className="w-24 h-2" />
          </div>
          {task.description && (
            <p className="text-sm text-muted-foreground mt-2">{task.description}</p>
          )}
        </div>
      ))}
    </div>
  ),

  2: ({ data }) => (
    <BarChart width={600} height={300} data={data?.criteria}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar 
        dataKey="weight" 
        fill="#8884d8" 
        radius={[4, 4, 0, 0]}
        label={{ position: 'top' }}
      />
    </BarChart>
  ),

  3: ({ data }) => ( // Упрощенная временная шкала
    <div className="space-y-6 pl-4 border-l-2 border-muted">
      {data?.sequence?.map((item) => (
        <div key={item.id} className="relative">
          <div className="absolute -left-[9px] top-3 w-3 h-3 rounded-full bg-primary" />
          <div className="ml-6 p-4 border rounded-lg bg-background">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Шаг {item.order}</span>
              <Badge variant="outline">{item.duration}</Badge>
            </div>
            <p className="text-sm">{item.task}</p>
          </div>
        </div>
      ))}
    </div>
  ),

  7: ({ data }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data?.timelyInfo?.map((info) => (
        <div key={info.id} className="p-4 border rounded-lg relative group">
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm">
              <Info className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className={cn(
              "w-2 h-2 rounded-full",
              info.urgency === 'high' ? 'bg-red-500' : 
              info.urgency === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            )} />
            <h4 className="font-medium">{info.title}</h4>
          </div>
          <div className="text-sm text-muted-foreground">
            {info.content.substring(0, 100)}...
          </div>
        </div>
      ))}
    </div>
  )
};

const StepVisualization = ({ data = {}, step }) => {
  const VisualComponent = visualizationComponents[step] || FallbackVisualization;
  
  return (
    <ScrollArea className="h-[calc(100vh-180px)] pr-4">
      {data && Object.keys(data).length > 0 ? (
        <VisualComponent data={data} />
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
          <Info className="h-8 w-8 mb-2" />
          <p>Данные не добавлены</p>
          <Button variant="ghost" className="mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Добавить первый элемент
          </Button>
        </div>
      )}
    </ScrollArea>
  );
};

const FallbackVisualization = () => (
  <div className="p-6 text-center text-muted-foreground">
    Визуализация для этого шага в разработке
  </div>
);

export default StepVisualization;
