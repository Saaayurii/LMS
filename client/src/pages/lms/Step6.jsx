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

// Шаг 6: Анализ ментальных моделей
export const Step6 = ({ data, onChange }) => {
  const [mentalModels, setMentalModels] = useState(data.mentalModels || []);
  const [newModel, setNewModel] = useState({
    name: '',
    description: '',
    type: 'conceptual',
    components: [],
    relationships: [],
    complexity: 'beginner'
  });
  const [newComponent, setNewComponent] = useState('');
  const [newRelationship, setNewRelationship] = useState({ from: '', to: '', type: 'causes' });

  const modelTypes = [
    { value: 'conceptual', label: 'Концептуальная модель', description: 'Описывает основные понятия и их связи' },
    { value: 'procedural', label: 'Процедурная модель', description: 'Описывает последовательность действий' },
    { value: 'causal', label: 'Причинно-следственная модель', description: 'Показывает причины и следствия' },
    { value: 'structural', label: 'Структурная модель', description: 'Описывает структуру и компоненты системы' }
  ];

  const relationshipTypes = [
    { value: 'causes', label: 'Вызывает' },
    { value: 'contains', label: 'Содержит' },
    { value: 'influences', label: 'Влияет на' },
    { value: 'depends_on', label: 'Зависит от' },
    { value: 'precedes', label: 'Предшествует' }
  ];

  const addComponent = () => {
    if (newComponent.trim()) {
      setNewModel({
        ...newModel,
        components: [...newModel.components, { id: Date.now(), name: newComponent }]
      });
      setNewComponent('');
    }
  };

  const addRelationship = () => {
    if (newRelationship.from && newRelationship.to) {
      setNewModel({
        ...newModel,
        relationships: [...newModel.relationships, { ...newRelationship, id: Date.now() }]
      });
      setNewRelationship({ from: '', to: '', type: 'causes' });
    }
  };

  const addMentalModel = () => {
    if (newModel.name.trim()) {
      const updatedModels = [...mentalModels, { ...newModel, id: Date.now() }];
      setMentalModels(updatedModels);
      onChange({ mentalModels: updatedModels });
      setNewModel({
        name: '',
        description: '',
        type: 'conceptual',
        components: [],
        relationships: [],
        complexity: 'beginner'
      });
    }
  };

  const removeMentalModel = (id) => {
    const updatedModels = mentalModels.filter(model => model.id !== id);
    setMentalModels(updatedModels);
    onChange({ mentalModels: updatedModels });
  };

  return (
    <div className="space-y-6">
      <div className="bg-violet-50 dark:bg-violet-950 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Network className="mr-2 h-5 w-5" />
          Анализ ментальных моделей
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Определите ментальные модели, которые студенты должны построить для эффективного решения задач.
        </p>
        <div className="bg-white dark:bg-gray-800 p-3 rounded border-l-4 border-l-violet-500">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>Ментальная модель</strong> — это внутреннее представление о том, как устроена предметная область.
            Она помогает студентам понимать сложные концепции и принимать решения.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Создать новую ментальную модель</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList>
              <TabsTrigger value="basic">Основная информация</TabsTrigger>
              <TabsTrigger value="components">Компоненты</TabsTrigger>
              <TabsTrigger value="relationships">Связи</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div>
                <Label htmlFor="model-name">Название ментальной модели</Label>
                <Input
                  id="model-name"
                  placeholder="Например: Модель принятия решений в бизнесе"
                  value={newModel.name}
                  onChange={(e) => setNewModel({...newModel, name: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="model-type">Тип модели</Label>
                <Select value={newModel.type} onValueChange={(value) => setNewModel({...newModel, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {modelTypes.map(type => (
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
                <Label htmlFor="model-complexity">Уровень сложности</Label>
                <Select value={newModel.complexity} onValueChange={(value) => setNewModel({...newModel, complexity: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Начальный</SelectItem>
                    <SelectItem value="intermediate">Средний</SelectItem>
                    <SelectItem value="advanced">Продвинутый</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="model-description">Описание модели</Label>
                <Textarea
                  id="model-description"
                  placeholder="Опишите, что представляет собой эта ментальная модель и как она помогает в решении задач..."
                  value={newModel.description}
                  onChange={(e) => setNewModel({...newModel, description: e.target.value})}
                  rows={4}
                />
              </div>
            </TabsContent>

            <TabsContent value="components" className="space-y-4">
              <div>
                <Label>Компоненты модели</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Добавить компонент модели..."
                    value={newComponent}
                    onChange={(e) => setNewComponent(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addComponent()}
                  />
                  <Button onClick={addComponent}>Добавить</Button>
                </div>
              </div>

              <div className="space-y-2">
                {newModel.components.map((component, index) => (
                  <div key={component.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <Badge variant="outline">{index + 1}</Badge>
                    <span className="flex-1">{component.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setNewModel({
                        ...newModel,
                        components: newModel.components.filter(c => c.id !== component.id)
                      })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="relationships" className="space-y-4">
              <div>
                <Label>Связи между компонентами</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Select value={newRelationship.from} onValueChange={(value) => setNewRelationship({...newRelationship, from: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="От компонента" />
                    </SelectTrigger>
                    <SelectContent>
                      {newModel.components.map(comp => (
                        <SelectItem key={comp.id} value={comp.name}>{comp.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={newRelationship.type} onValueChange={(value) => setNewRelationship({...newRelationship, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={newRelationship.to} onValueChange={(value) => setNewRelationship({...newRelationship, to: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="К компоненту" />
                    </SelectTrigger>
                    <SelectContent>
                      {newModel.components.map(comp => (
                        <SelectItem key={comp.id} value={comp.name}>{comp.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addRelationship} className="mt-2" size="sm">
                  <Link2 className="h-4 w-4 mr-2" />
                  Добавить связь
                </Button>
              </div>

              <div className="space-y-2">
                {newModel.relationships.map((rel) => (
                  <div key={rel.id} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                    <span className="font-medium">{rel.from}</span>
                    <ArrowRight className="h-4 w-4" />
                    <Badge variant="secondary">{relationshipTypes.find(t => t.value === rel.type)?.label}</Badge>
                    <ArrowRight className="h-4 w-4" />
                    <span className="font-medium">{rel.to}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />
          <Button onClick={addMentalModel} className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Добавить ментальную модель
          </Button>
        </CardContent>
      </Card>

      {/* Список созданных ментальных моделей */}
      <div className="space-y-4">
        {mentalModels.map((model) => (
          <Card key={model.id} className="border-l-4 border-l-violet-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{model.name}</h4>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{modelTypes.find(t => t.value === model.type)?.label}</Badge>
                    <Badge variant={model.complexity === 'beginner' ? 'default' : model.complexity === 'intermediate' ? 'secondary' : 'destructive'}>
                      {model.complexity === 'beginner' ? 'Начальный' : model.complexity === 'intermediate' ? 'Средний' : 'Продвинутый'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{model.description}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => removeMentalModel(model.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {model.components.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Компоненты:</h5>
                  <div className="flex flex-wrap gap-2">
                    {model.components.map((comp, idx) => (
                      <Badge key={comp.id} variant="outline">{comp.name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {model.relationships.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Связи:</h5>
                  <div className="space-y-1 text-sm">
                    {model.relationships.map((rel) => (
                      <div key={rel.id} className="flex items-center gap-2">
                        <span>{rel.from}</span>
                        <ArrowRight className="h-3 w-3" />
                        <span className="text-blue-600">{relationshipTypes.find(t => t.value === rel.type)?.label}</span>
                        <ArrowRight className="h-3 w-3" />
                        <span>{rel.to}</span>
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
