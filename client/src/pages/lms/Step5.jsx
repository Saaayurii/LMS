import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Trash2, Brain, Clock, Zap, BookOpen, Target, Network, Lightbulb, AlertCircle, CheckCircle2, ArrowRight, Link2, FileText, Video, Image } from 'lucide-react';

// Компонент для шага 5 - Анализ когнитивных стратегий
export const Step5 = ({ data, onChange }) => {
  const [strategies, setStrategies] = useState(data.strategies || []);
  const [newStrategy, setNewStrategy] = useState({ name: '', description: '', steps: [] });

  const addStrategy = () => {
    if (newStrategy.name.trim()) {
      const updatedStrategies = [...strategies, { ...newStrategy, id: Date.now() }];
      setStrategies(updatedStrategies);
      onChange({ strategies: updatedStrategies });
      setNewStrategy({ name: '', description: '', steps: [] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          Анализ когнитивных стратегий
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Определите мыслительные стратегии, необходимые для решения задач.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Добавить когнитивную стратегию</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Название стратегии</Label>
            <Input
              placeholder="Например: Анализ проблемы"
              value={newStrategy.name}
              onChange={(e) => setNewStrategy({...newStrategy, name: e.target.value})}
            />
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea
              placeholder="Подробное описание стратегии..."
              value={newStrategy.description}
              onChange={(e) => setNewStrategy({...newStrategy, description: e.target.value})}
            />
          </div>
          <Button onClick={addStrategy}>Добавить стратегию</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {strategies.map((strategy) => (
          <Card key={strategy.id}>
            <CardContent className="pt-4">
              <h4 className="font-semibold text-indigo-700">{strategy.name}</h4>
              <p className="text-sm text-gray-600 mt-2">{strategy.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};