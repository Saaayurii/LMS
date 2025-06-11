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




// Шаг 10: Разработка частичной практики
export const Step10 = ({ data, onChange }) => {
  const [practiceTasks, setPracticeTasks] = useState(data.practiceTasks || []);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: 'conceptual',
    difficulty: 'medium',
    skills: [],
    feedbackType: 'immediate',
    resources: [],
    criteria: [],
    timeLimit: 0
  });
  const [newSkill, setNewSkill] = useState('');
  const [newResource, setNewResource] = useState('');
  const [newCriterion, setNewCriterion] = useState('');

  const taskTypes = [
    { value: 'conceptual', label: 'Концептуальная', description: 'Проверка понимания концепций' },
    { value: 'procedural', label: 'Процедурная', description: 'Отработка последовательности действий' },
    { value: 'problem_solving', label: 'Решение проблем', description: 'Применение знаний в новых ситуациях' },
    { value: 'analysis', label: 'Аналитическая', description: 'Анализ информации и данных' }
  ];

  const feedbackTypes = [
    { value: 'immediate', label: 'Мгновенная', description: 'Обратная связь сразу после выполнения' },
    { value: 'delayed', label: 'Отложенная', description: 'Обратная связь через некоторое время' },
    { value: 'gradual', label: 'Постепенная', description: 'Подсказки по мере выполнения' },
    { value: 'peer', label: 'Взаимооценка', description: 'Оценка другими студентами' }
  ];

  const addSkill = () => {
    if (newSkill.trim()) {
      setNewTask({
        ...newTask,
        skills: [...newTask.skills, { id: Date.now(), name: newSkill }]
      });
      setNewSkill('');
    }
  };

  const addResource = () => {
    if (newResource.trim()) {
      setNewTask({
        ...newTask,
        resources: [...newTask.resources, { id: Date.now(), name: newResource }]
      });
      setNewResource('');
    }
  };

  const addCriterion = () => {
    if (newCriterion.trim()) {
      setNewTask({
        ...newTask,
        criteria: [...newTask.criteria, { id: Date.now(), name: newCriterion }]
      });
      setNewCriterion('');
    }
  };

  const addPracticeTask = () => {
    if (newTask.title.trim()) {
      const updatedTasks = [...practiceTasks, { ...newTask, id: Date.now() }];
      setPracticeTasks(updatedTasks);
      onChange({ practiceTasks: updatedTasks });
      setNewTask({
        title: '',
        description: '',
        type: 'conceptual',
        difficulty: 'medium',
        skills: [],
        feedbackType: 'immediate',
        resources: [],
        criteria: [],
        timeLimit: 0
      });
    }
  };

  const removePracticeTask = (id) => {
    const updatedTasks = practiceTasks.filter(task => task.id !== id);
    setPracticeTasks(updatedTasks);
    onChange({ practiceTasks: updatedTasks });
  };

  return (
    <div className="space-y-6">
      <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Target className="mr-2 h-5 w-5" />
          Разработка частичной практики
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Создайте упражнения для отработки отдельных навыков и компонентов комплексных задач.
        </p>
        <div className="bg-white dark:bg-gray-800 p-3 rounded border-l-4 border-l-pink-500">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>Частичная практика</strong> — это упражнения, которые позволяют студентам 
            отрабатывать отдельные навыки до автоматизма перед выполнением комплексных задач.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Добавить упражнение для частичной практики</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Основное</TabsTrigger>
              <TabsTrigger value="skills">Навыки</TabsTrigger>
              <TabsTrigger value="feedback">Обратная связь</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div>
                <Label htmlFor="task-title">Название упражнения</Label>
                <Input
                  id="task-title"
                  placeholder="Например: Расчет ROI для проекта"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="task-type">Тип упражнения</Label>
                <Select value={newTask.type} onValueChange={(value) => setNewTask({...newTask, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {taskTypes.map(type => (
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
                <Label htmlFor="task-difficulty">Уровень сложности</Label>
                <Select value={newTask.difficulty} onValueChange={(value) => setNewTask({...newTask, difficulty: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Легкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="hard">Сложный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="task-description">Описание упражнения</Label>
                <Textarea
                  id="task-description"
                  placeholder="Подробно опишите задание и ожидаемый результат..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="task-time">Ограничение по времени (минут)</Label>
                <Input
                  id="task-time"
                  type="number"
                  min="0"
                  value={newTask.timeLimit}
                  onChange={(e) => setNewTask({...newTask, timeLimit: parseInt(e.target.value) || 0})}
                />
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <div>
                <Label>Навыки, которые отрабатываются</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Добавить навык..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill}>Добавить</Button>
                </div>
              </div>

              <div className="space-y-2">
                {newTask.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                    <Badge variant="outline">Навык</Badge>
                    <span className="flex-1">{skill.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setNewTask({
                        ...newTask,
                        skills: newTask.skills.filter(s => s.id !== skill.id)
                      })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div>
                <Label>Критерии оценки</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Добавить критерий..."
                    value={newCriterion}
                    onChange={(e) => setNewCriterion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCriterion()}
                  />
                  <Button onClick={addCriterion}>Добавить</Button>
                </div>
              </div>

              <div className="space-y-2">
                {newTask.criteria.map((criterion) => (
                  <div key={criterion.id} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    <Badge variant="outline">Критерий</Badge>
                    <span className="flex-1">{criterion.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setNewTask({
                        ...newTask,
                        criteria: newTask.criteria.filter(c => c.id !== criterion.id)
                      })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4">
              <div>
                <Label htmlFor="feedback-type">Тип обратной связи</Label>
                <Select value={newTask.feedbackType} onValueChange={(value) => setNewTask({...newTask, feedbackType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {feedbackTypes.map(type => (
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
                <Label>Ресурсы для выполнения</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Добавить ресурс..."
                    value={newResource}
                    onChange={(e) => setNewResource(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addResource()}
                  />
                  <Button onClick={addResource}>Добавить</Button>
                </div>
              </div>

              <div className="space-y-2">
                {newTask.resources.map((resource) => (
                  <div key={resource.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <BookOpen className="h-4 w-4" />
                    <span className="flex-1">{resource.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setNewTask({
                        ...newTask,
                        resources: newTask.resources.filter(r => r.id !== resource.id)
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
          <Button onClick={addPracticeTask} className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Добавить упражнение
          </Button>
        </CardContent>
      </Card>

      {/* Список созданных упражнений */}
      <div className="space-y-4">
        {practiceTasks.map((task) => (
          <Card key={task.id} className="border-l-4 border-l-pink-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{task.title}</h4>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{taskTypes.find(t => t.value === task.type)?.label}</Badge>
                    <Badge variant={task.difficulty === 'easy' ? 'default' : task.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                      {task.difficulty === 'easy' ? 'Легкий' : task.difficulty === 'medium' ? 'Средний' : 'Сложный'}
                    </Badge>
                    <Badge variant="outline">
                      {feedbackTypes.find(f => f.value === task.feedbackType)?.label}
                    </Badge>
                    {task.timeLimit > 0 && (
                      <Badge variant="outline">
                        {task.timeLimit} мин
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => removePracticeTask(task.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {task.skills.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Отрабатываемые навыки:</h5>
                  <div className="flex flex-wrap gap-2">
                    {task.skills.map((skill) => (
                      <Badge key={skill.id} variant="outline">{skill.name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {task.criteria.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Критерии оценки:</h5>
                  <div className="space-y-1">
                    {task.criteria.map((criterion) => (
                      <div key={criterion.id} className="text-sm bg-gray-50 p-2 rounded">
                        • {criterion.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {task.resources.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Ресурсы:</h5>
                  <div className="space-y-1">
                    {task.resources.map((resource) => (
                      <div key={resource.id} className="text-sm bg-blue-50 p-2 rounded flex items-center gap-2">
                        <BookOpen className="h-3 w-3" />
                        {resource.name}
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
