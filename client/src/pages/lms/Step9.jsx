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

// Шаг 9: Анализ предварительных знаний
export const Step9 = ({ data, onChange }) => {
  const [prerequisites, setPrerequisites] = useState(data.prerequisites || []);
  const [newPrerequisite, setNewPrerequisite] = useState({
    title: '',
    description: '',
    type: 'conceptual',
    importance: 'essential',
    assessmentMethod: 'quiz',
    resourcesNeeded: [],
    relatedTasks: []
  });
  const [newResource, setNewResource] = useState('');

  const prerequisiteTypes = [
    { value: 'conceptual', label: 'Концептуальные знания', description: 'Понимание основных понятий и теорий' },
    { value: 'procedural', label: 'Процедурные знания', description: 'Умение выполнять определенные действия' },
    { value: 'factual', label: 'Фактические знания', description: 'Знание конкретных фактов и данных' },
    { value: 'metacognitive', label: 'Метакогнитивные знания', description: 'Понимание собственных процессов обучения' }
  ];

  const importanceLevels = [
    { value: 'essential', label: 'Критически важные', description: 'Без них невозможно выполнение задач' },
    { value: 'important', label: 'Важные', description: 'Значительно облегчают выполнение задач' },
    { value: 'helpful', label: 'Полезные', description: 'Могут быть полезны, но не обязательны' }
  ];

  const assessmentMethods = [
    { value: 'quiz', label: 'Тест/Опрос' },
    { value: 'practical', label: 'Практическое задание' },
    { value: 'selfAssessment', label: 'Самооценка' },
    { value: 'interview', label: 'Собеседование' },
    { value: 'portfolio', label: 'Портфолио работ' }
  ];

  const addResource = () => {
    if (newResource.trim()) {
      setNewPrerequisite({
        ...newPrerequisite,
        resourcesNeeded: [...newPrerequisite.resourcesNeeded, { id: Date.now(), name: newResource }]
      });
      setNewResource('');
    }
  };

  const addPrerequisite = () => {
    if (newPrerequisite.title.trim()) {
      const updatedPrerequisites = [...prerequisites, { ...newPrerequisite, id: Date.now() }];
      setPrerequisites(updatedPrerequisites);
      onChange({ prerequisites: updatedPrerequisites });
      setNewPrerequisite({
        title: '',
        description: '',
        type: 'conceptual',
        importance: 'essential',
        assessmentMethod: 'quiz',
        resourcesNeeded: [],
        relatedTasks: []
      });
    }
  };

  const removePrerequisite = (id) => {
    const updatedPrerequisites = prerequisites.filter(prereq => prereq.id !== id);
    setPrerequisites(updatedPrerequisites);
    onChange({ prerequisites: updatedPrerequisites });
  };

  return (
    <div className="space-y-6">
      <div className="bg-cyan-50 dark:bg-cyan-950 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Анализ предварительных знаний
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Определите знания и навыки, которыми студенты должны обладать до начала обучения.
        </p>
        <div className="bg-white dark:bg-gray-800 p-3 rounded border-l-4 border-l-cyan-500">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>Предварительные знания</strong> — это основа, на которой строится новое обучение. 
            Их правильная оценка критически важна для успеха курса.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Добавить требование к предварительным знаниям</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Основное</TabsTrigger>
              <TabsTrigger value="assessment">Оценка</TabsTrigger>
              <TabsTrigger value="resources">Ресурсы</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div>
                <Label htmlFor="prereq-title">Название требования</Label>
                <Input
                  id="prereq-title"
                  placeholder="Например: Основы математического анализа"
                  value={newPrerequisite.title}
                  onChange={(e) => setNewPrerequisite({...newPrerequisite, title: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="prereq-type">Тип знаний</Label>
                <Select value={newPrerequisite.type} onValueChange={(value) => setNewPrerequisite({...newPrerequisite, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {prerequisiteTypes.map(type => (
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
                <Label htmlFor="prereq-importance">Уровень важности</Label>
                <Select value={newPrerequisite.importance} onValueChange={(value) => setNewPrerequisite({...newPrerequisite, importance: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {importanceLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        <div>
                          <div className="font-medium">{level.label}</div>
                          <div className="text-xs text-gray-500">{level.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="prereq-description">Подробное описание</Label>
                <Textarea
                  id="prereq-description"
                  placeholder="Опишите, какие именно знания или навыки требуются..."
                  value={newPrerequisite.description}
                  onChange={(e) => setNewPrerequisite({...newPrerequisite, description: e.target.value})}
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="assessment" className="space-y-4">
              <div>
                <Label htmlFor="assessment-method">Метод оценки знаний</Label>
                <Select value={newPrerequisite.assessmentMethod} onValueChange={(value) => setNewPrerequisite({...newPrerequisite, assessmentMethod: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {assessmentMethods.map(method => (
                      <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Рекомендации по оценке</h4>
                <div className="text-sm text-gray-600 space-y-2">
                  {newPrerequisite.assessmentMethod === 'quiz' && (
                    <p>• Создайте короткий тест из 5-10 вопросов<br/>• Включите как теоретические, так и практические вопросы<br/>• Установите проходной балл 70-80%</p>
                  )}
                  {newPrerequisite.assessmentMethod === 'practical' && (
                    <p>• Разработайте простое практическое задание<br/>• Ограничьте время выполнения 15-30 минутами<br/>• Оцените по ключевым критериям</p>
                  )}
                  {newPrerequisite.assessmentMethod === 'selfAssessment' && (
                    <p>• Предоставьте чек-лист компетенций<br/>• Попросите оценить уровень по шкале 1-5<br/>• Добавьте примеры для самопроверки</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div>
                <Label>Ресурсы для изучения (если знания отсутствуют)</Label>
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
                {newPrerequisite.resourcesNeeded.map((resource) => (
                  <div key={resource.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <BookOpen className="h-4 w-4" />
                    <span className="flex-1">{resource.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setNewPrerequisite({
                        ...newPrerequisite,
                        resourcesNeeded: newPrerequisite.resourcesNeeded.filter(r => r.id !== resource.id)
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
          <Button onClick={addPrerequisite} className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Добавить требование к предварительным знаниям
          </Button>
        </CardContent>
      </Card>

      {/* Список требований */}
      <div className="space-y-4">
        {prerequisites.map((prereq) => (
          <Card key={prereq.id} className="border-l-4 border-l-cyan-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{prereq.title}</h4>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{prerequisiteTypes.find(t => t.value === prereq.type)?.label}</Badge>
                    <Badge variant={prereq.importance === 'essential' ? 'destructive' : prereq.importance === 'important' ? 'default' : 'secondary'}>
                      {importanceLevels.find(l => l.value === prereq.importance)?.label}
                    </Badge>
                    <Badge variant="outline">{assessmentMethods.find(m => m.value === prereq.assessmentMethod)?.label}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{prereq.description}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => removePrerequisite(prereq.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {prereq.resourcesNeeded.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Ресурсы для изучения:</h5>
                  <div className="space-y-1">
                    {prereq.resourcesNeeded.map((resource) => (
                      <div key={resource.id} className="text-sm bg-gray-50 p-2 rounded flex items-center gap-2">
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