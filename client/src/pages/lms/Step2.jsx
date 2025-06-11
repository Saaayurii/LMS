// components/Step2.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, CheckCircle2, PlusCircle, Gauge, Star, Award, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export const Step2 = ({ data, onChange }) => {
  const [criteria, setCriteria] = useState(data.criteria || []);
  const [newCriterion, setNewCriterion] = useState({
    name: '',
    description: '',
    weight: 30,
    type: 'quality',
    levels: [
      { level: 'Отлично', description: 'Полностью соответствует всем требованиям', points: 100 },
      { level: 'Хорошо', description: 'Соответствует основным требованиям', points: 75 },
      { level: 'Удовлетворительно', description: 'Частично соответствует требованиям', points: 50 },
      { level: 'Неудовлетворительно', description: 'Не соответствует требованиям', points: 0 }
    ],
    isRequired: true
  });
  const [editingLevel, setEditingLevel] = useState(null);
  const [showLevelEditor, setShowLevelEditor] = useState(false);

  const criterionTypes = [
    { value: 'quality', label: 'Качество работы', icon: Star },
    { value: 'performance', label: 'Производительность', icon: Gauge },
    { value: 'completeness', label: 'Полнота выполнения', icon: CheckCircle2 },
    { value: 'other', label: 'Другое', icon: Award }
  ];

  const addCriterion = () => {
    if (newCriterion.name.trim()) {
      const updatedCriteria = [...criteria, { 
        ...newCriterion, 
        id: Date.now(),
        levels: [...newCriterion.levels]
      }];
      setCriteria(updatedCriteria);
      onChange({ criteria: updatedCriteria });
      resetNewCriterion();
    }
  };

  const updateCriterion = (id, updates) => {
    const updatedCriteria = criteria.map(criterion => 
      criterion.id === id ? { ...criterion, ...updates } : criterion
    );
    setCriteria(updatedCriteria);
    onChange({ criteria: updatedCriteria });
  };

  const removeCriterion = (id) => {
    const updatedCriteria = criteria.filter(criterion => criterion.id !== id);
    setCriteria(updatedCriteria);
    onChange({ criteria: updatedCriteria });
  };

  const updateLevel = (criterionId, levelIndex, updates) => {
    const updatedCriteria = criteria.map(criterion => {
      if (criterion.id === criterionId) {
        const newLevels = [...criterion.levels];
        newLevels[levelIndex] = { ...newLevels[levelIndex], ...updates };
        return { ...criterion, levels: newLevels };
      }
      return criterion;
    });
    setCriteria(updatedCriteria);
    onChange({ criteria: updatedCriteria });
  };

  const resetNewCriterion = () => {
    setNewCriterion({
      name: '',
      description: '',
      weight: 30,
      type: 'quality',
      levels: [
        { level: 'Отлично', description: 'Полностью соответствует всем требованиям', points: 100 },
        { level: 'Хорошо', description: 'Соответствует основным требованиям', points: 75 },
        { level: 'Удовлетворительно', description: 'Частично соответствует требованиям', points: 50 },
        { level: 'Неудовлетворительно', description: 'Не соответствует требованиям', points: 0 }
      ],
      isRequired: true
    });
  };

  const getTypeIcon = (type) => {
    const typeInfo = criterionTypes.find(t => t.value === type);
    return typeInfo ? typeInfo.icon : Award;
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <CheckCircle2 className="mr-2 h-5 w-5" />
          Определение критериев оценки
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Установите четкие критерии для оценки выполнения учебных задач. Каждый критерий должен иметь:
        </p>
        <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2 list-disc pl-5 space-y-1">
          <li>Название и описание</li>
          <li>Весовой коэффициент (важность)</li>
          <li>Уровни выполнения с описанием</li>
          <li>Тип критерия (качество, производительность и т.д.)</li>
        </ul>
      </div>

      {/* Форма добавления нового критерия */}
      <Card>
        <CardHeader>
          <CardTitle>Добавить новый критерий оценки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Название критерия*</Label>
              <Input
                placeholder="Например: Точность выполнения"
                value={newCriterion.name}
                onChange={(e) => setNewCriterion({...newCriterion, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label>Тип критерия</Label>
              <Select 
                value={newCriterion.type} 
                onValueChange={(value) => setNewCriterion({...newCriterion, type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {criterionTypes.map(type => {
                    const Icon = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Описание критерия</Label>
            <Textarea
              placeholder="Детальное описание критерия и что именно оценивается..."
              value={newCriterion.description}
              onChange={(e) => setNewCriterion({...newCriterion, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Весовой коэффициент: {newCriterion.weight}%</Label>
            <Slider
              value={[newCriterion.weight]}
              onValueChange={(value) => setNewCriterion({...newCriterion, weight: value[0]})}
              min={5}
              max={100}
              step={5}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Менее важный</span>
              <span>Более важный</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4" />
            <Label htmlFor="required">Обязательный критерий</Label>
            <input
              id="required"
              type="checkbox"
              checked={newCriterion.isRequired}
              onChange={(e) => setNewCriterion({...newCriterion, isRequired: e.target.checked})}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-4 border-t">
            <Label>Уровни выполнения:</Label>
            <div className="mt-2 space-y-2">
              {newCriterion.levels.map((level, index) => (
                <div key={index} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{level.level}</div>
                    <div className="text-sm text-gray-600 truncate">{level.description}</div>
                    <div className="text-xs text-gray-500">Баллы: {level.points}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={addCriterion} 
            className="w-full mt-4"
            disabled={!newCriterion.name.trim()}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Добавить критерий
          </Button>
        </CardContent>
      </Card>

      {/* Список добавленных критериев */}
      <div className="space-y-4">
        {criteria.map((criterion) => {
          const Icon = getTypeIcon(criterion.type);
          const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
          const weightPercentage = totalWeight > 0 
            ? Math.round((criterion.weight / totalWeight) * 100) 
            : 0;

          return (
            <Card key={criterion.id} className="border-l-4 border-l-green-500">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold">{criterion.name}</h4>
                      {criterion.isRequired && (
                        <Badge variant="destructive">Обязательный</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{criterion.description}</p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Gauge className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Вес: {criterion.weight}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          Вклад в оценку: ~{weightPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => removeCriterion(criterion.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium mb-2 text-sm">Уровни выполнения:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    {criterion.levels.map((level, index) => (
                      <div 
                        key={index} 
                        className={`p-2 rounded border ${
                          level.points >= 80 ? 'bg-green-50 border-green-200' :
                          level.points >= 50 ? 'bg-yellow-50 border-yellow-200' :
                          'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="font-medium">{level.level}</div>
                        <div className="text-xs text-gray-600 mt-1">{level.description}</div>
                        <div className="text-xs font-semibold mt-1">
                          Баллы: {level.points}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {criteria.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Общий вес критериев:</span>
                <span className="font-bold">
                  {criteria.reduce((sum, c) => sum + c.weight, 0)}%
                </span>
              </div>
              
              {criteria.reduce((sum, c) => sum + c.weight, 0) !== 100 && (
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">
                    Сумма весов должна равняться 100% для корректной оценки
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};