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

// Шаг 8: Анализ когнитивных правил
export const Step8 = ({ data, onChange }) => {
  const [cognitiveRules, setCognitiveRules] = useState(data.cognitiveRules || []);
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    type: 'procedural',
    conditions: [],
    actions: [],
    examples: [],
    complexity: 'basic'
  });
  const [newCondition, setNewCondition] = useState('');
  const [newAction, setNewAction] = useState('');
  const [newExample, setNewExample] = useState('');

  const ruleTypes = [
    { value: 'procedural', label: 'Процедурное правило', description: 'Последовательность действий для достижения цели' },
    { value: 'conditional', label: 'Условное правило', description: 'Если-то правила для принятия решений' },
    { value: 'strategic', label: 'Стратегическое правило', description: 'Общие принципы решения класса задач' },
    { value: 'heuristic', label: 'Эвристическое правило', description: 'Практические приемы и правила большого пальца' }
  ];

  const addCondition = () => {
    if (newCondition.trim()) {
      setNewRule({
        ...newRule,
        conditions: [...newRule.conditions, { id: Date.now(), text: newCondition }]
      });
      setNewCondition('');
    }
  };

  const addAction = () => {
    if (newAction.trim()) {
      setNewRule({
        ...newRule,
        actions: [...newRule.actions, { id: Date.now(), text: newAction }]
      });
      setNewAction('');
    }
  };

  const addExample = () => {
    if (newExample.trim()) {
      setNewRule({
        ...newRule,
        examples: [...newRule.examples, { id: Date.now(), text: newExample }]
      });
      setNewExample('');
    }
  };

  const addCognitiveRule = () => {
    if (newRule.name.trim()) {
      const updatedRules = [...cognitiveRules, { ...newRule, id: Date.now() }];
      setCognitiveRules(updatedRules);
      onChange({ cognitiveRules: updatedRules });
      setNewRule({
        name: '',
        description: '',
        type: 'procedural',
        conditions: [],
        actions: [],
        examples: [],
        complexity: 'basic'
      });
    }
  };

  const removeCognitiveRule = (id) => {
    const updatedRules = cognitiveRules.filter(rule => rule.id !== id);
    setCognitiveRules(updatedRules);
    onChange({ cognitiveRules: updatedRules });
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Zap className="mr-2 h-5 w-5" />
          Анализ когнитивных правил
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Определите процедурные правила и алгоритмы, которые студенты должны усвоить для эффективного решения задач.
        </p>
        <div className="bg-white dark:bg-gray-800 p-3 rounded border-l-4 border-l-emerald-500">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>Когнитивные правила</strong> — это если-то правила, которые связывают условия с действиями 
            и помогают студентам принимать правильные решения в различных ситуациях.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Создать новое когнитивное правило</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Основное</TabsTrigger>
              <TabsTrigger value="conditions">Условия</TabsTrigger>
              <TabsTrigger value="actions">Действия</TabsTrigger>
              <TabsTrigger value="examples">Примеры</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div>
                <Label htmlFor="rule-name">Название правила</Label>
                <Input
                  id="rule-name"
                  placeholder="Например: Правило выбора стратегии маркетинга"
                  value={newRule.name}
                  onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="rule-type">Тип правила</Label>
                <Select value={newRule.type} onValueChange={(value) => setNewRule({...newRule, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ruleTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="rule-complexity">Уровень сложности</Label>
                <Select value={newRule.complexity} onValueChange={(value) => setNewRule({...newRule, complexity: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Базовый</SelectItem>
                    <SelectItem value="intermediate">Средний</SelectItem>
                    <SelectItem value="advanced">Продвинутый</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="rule-description">Описание правила</Label>
                <Textarea
                  id="rule-description"
                  placeholder="Опишите общую логику и применение правила..."
                  value={newRule.description}
                  onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="conditions" className="space-y-4">
              <div>
                <Label>Условия (ЕСЛИ...)</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Добавить условие..."
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCondition()}
                  />
                  <Button onClick={addCondition}>Добавить</Button>
                </div>
              </div>

              <div className="space-y-2">
                {newRule.conditions.map((condition, index) => (
                  <div key={condition.id} className="flex items-center gap-2 p-3 bg-blue-50 rounded">
                    <Badge variant="outline">ЕСЛИ #{index + 1}</Badge>
                    <span className="flex-1">{condition.text}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setNewRule({
                        ...newRule,
                        conditions: newRule.conditions.filter(c => c.id !== condition.id)
                      })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4">
              <div>
                <Label>Действия (ТО...)</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Добавить действие..."
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addAction()}
                  />
                  <Button onClick={addAction}>Добавить</Button>
                </div>
              </div>

              <div className="space-y-2">
                {newRule.actions.map((action, index) => (
                  <div key={action.id} className="flex items-center gap-2 p-3 bg-green-50 rounded">
                    <Badge variant="outline">ТО #{index + 1}</Badge>
                    <span className="flex-1">{action.text}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setNewRule({
                        ...newRule,
                        actions: newRule.actions.filter(a => a.id !== action.id)
                      })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              <div>
                <Label>Примеры применения</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Добавить пример..."
                    value={newExample}
                    onChange={(e) => setNewExample(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addExample()}
                  />
                  <Button onClick={addExample}>Добавить</Button>
                </div>
              </div>

              <div className="space-y-2">
                {newRule.examples.map((example, index) => (
                  <div key={example.id} className="flex items-center gap-2 p-3 bg-yellow-50 rounded">
                    <Badge variant="outline">Пример {index + 1}</Badge>
                    <span className="flex-1">{example.text}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setNewRule({
                        ...newRule,
                        examples: newRule.examples.filter(e => e.id !== example.id)
                      })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />
          <Button onClick={addCognitiveRule} className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Добавить когнитивное правило
          </Button>
        </CardContent>
      </Card>

      {/* Список созданных правил */}
      <div className="space-y-4">
        {cognitiveRules.map((rule) => (
          <Card key={rule.id} className="border-l-4 border-l-emerald-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{rule.name}</h4>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{ruleTypes.find(t => t.value === rule.type)?.label}</Badge>
                    <Badge variant={rule.complexity === 'basic' ? 'default' : rule.complexity === 'intermediate' ? 'secondary' : 'destructive'}>
                      {rule.complexity === 'basic' ? 'Базовый' : rule.complexity === 'intermediate' ? 'Средний' : 'Продвинутый'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{rule.description}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => removeCognitiveRule(rule.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {rule.conditions.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2 text-blue-700">Условия (ЕСЛИ):</h5>
                  <div className="space-y-1">
                    {rule.conditions.map((condition, idx) => (
                      <div key={condition.id} className="text-sm bg-blue-50 p-2 rounded">
                        {idx + 1}. {condition.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rule.actions.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2 text-green-700">Действия (ТО):</h5>
                  <div className="space-y-1">
                    {rule.actions.map((action, idx) => (
                      <div key={action.id} className="text-sm bg-green-50 p-2 rounded">
                        {idx + 1}. {action.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rule.examples.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Примеры:</h5>
                  <div className="space-y-1">
                    {rule.examples.map((example, idx) => (
                      <div key={example.id} className="text-sm bg-gray-50 p-2 rounded">
                        {example.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};