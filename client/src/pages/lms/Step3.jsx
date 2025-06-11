// components/Step3.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, 
  Trash2, 
  Brain, 
  ChevronUp, 
  ChevronDown, 
  Link, 
  ListTree, 
  GanttChart,
  ArrowRight,
  Lock
} from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

export const Step3 = ({ data, onChange }) => {
  const [sequence, setSequence] = useState(data.sequence || []);
  const [selectedTask, setSelectedTask] = useState('');
  const [complexity, setComplexity] = useState('medium');
  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addToSequence = () => {
    if (selectedTask.trim()) {
      const updatedSequence = [...sequence, {
        id: Date.now(),
        task: selectedTask,
        order: sequence.length + 1,
        complexity,
        prerequisites: [],
        description: '',
        duration: '15 min'
      }];
      setSequence(updatedSequence);
      onChange({ sequence: updatedSequence });
      setSelectedTask('');
      setComplexity('medium');
    }
  };

  const removeFromSequence = (id) => {
    const updatedSequence = sequence.filter(item => item.id !== id);
    setSequence(updatedSequence);
    onChange({ sequence: updatedSequence });
  };

  const addPrerequisite = (taskId, prereq) => {
    if (prereq.trim()) {
      const updatedSequence = sequence.map(item => 
        item.id === taskId 
          ? { ...item, prerequisites: [...item.prerequisites, { id: Date.now(), text: prereq }] }
          : item
      );
      setSequence(updatedSequence);
      onChange({ sequence: updatedSequence });
      setNewPrerequisite('');
    }
  };

  const removePrerequisite = (taskId, prereqId) => {
    const updatedSequence = sequence.map(item => 
      item.id === taskId 
        ? { ...item, prerequisites: item.prerequisites.filter(p => p.id !== prereqId) }
        : item
    );
    setSequence(updatedSequence);
    onChange({ sequence: updatedSequence });
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const saveEdit = (id) => {
    const updatedSequence = sequence.map(item => 
      item.id === id ? { ...item, task: editText } : item
    );
    setSequence(updatedSequence);
    onChange({ sequence: updatedSequence });
    setEditingId(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sequence.findIndex(item => item.id === active.id);
      const newIndex = sequence.findIndex(item => item.id === over.id);
      const newSequence = arrayMove(sequence, oldIndex, newIndex);
      setSequence(newSequence);
      onChange({ sequence: newSequence });
    }
  };

  const moveItem = (id, direction) => {
    const index = sequence.findIndex(item => item.id === id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < sequence.length) {
      const newSequence = arrayMove(sequence, index, newIndex);
      setSequence(newSequence);
      onChange({ sequence: newSequence });
    }
  };

  const getComplexityColor = (complexity) => {
    return complexity === 'easy' ? 'bg-green-100 text-green-800' :
           complexity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
           'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
            <ListTree className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Создание последовательности задач</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Организуйте задачи в логической последовательности от простых к сложным.
              Добавляйте зависимости между задачами и настраивайте их параметры.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GanttChart className="h-5 w-5" />
            Добавить новую задачу в последовательность
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label>Описание задачи*</Label>
              <Input
                placeholder="Например: Провести анализ рынка"
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Сложность задачи</Label>
              <Select 
                value={complexity} 
                onValueChange={setComplexity}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Простая</SelectItem>
                  <SelectItem value="medium">Средняя</SelectItem>
                  <SelectItem value="hard">Сложная</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={addToSequence} 
            className="w-full"
            disabled={!selectedTask.trim()}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Добавить задачу
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <ListTree className="h-5 w-5" />
          Текущая последовательность ({sequence.length} задач)
        </h3>

        {sequence.length === 0 ? (
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4 text-center text-gray-500">
              Добавьте первую задачу в последовательность
            </CardContent>
          </Card>
        ) : (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={sequence}
              strategy={verticalListSortingStrategy}
            >
              {sequence.map((item, index) => (
                <SortableItem key={item.id} id={item.id}>
                  <Card className="border-l-4 border-l-purple-500 group">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-4">
                        <div className={`${getComplexityColor(item.complexity)} rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0`}>
                          {index + 1}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          {editingId === item.id ? (
                            <div className="flex gap-2 mb-2">
                              <Input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1"
                              />
                              <Button 
                                size="sm" 
                                onClick={() => saveEdit(item.id)}
                              >
                                Сохранить
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium">{item.task}</h4>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => startEditing(item.id, item.task)}
                                >
                                  Редактировать
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex gap-3 mt-2">
                            <Badge variant="outline">
                              {item.complexity === 'easy' ? 'Простая' : 
                               item.complexity === 'medium' ? 'Средняя' : 'Сложная'}
                            </Badge>
                            <Badge variant="outline">
                              {item.duration}
                            </Badge>
                          </div>

                          {item.prerequisites.length > 0 && (
                            <div className="mt-3">
                              <h5 className="text-sm font-medium flex items-center gap-2 text-gray-600">
                                <Lock className="h-4 w-4" />
                                Требует выполнения:
                              </h5>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {item.prerequisites.map(prereq => (
                                  <Badge 
                                    key={prereq.id} 
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                  >
                                    <Link className="h-3 w-3" />
                                    {prereq.text}
                                    <button 
                                      onClick={() => removePrerequisite(item.id, prereq.id)}
                                      className="text-gray-500 hover:text-red-500"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="mt-3">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Добавить зависимость..."
                                value={newPrerequisite}
                                onChange={(e) => setNewPrerequisite(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter' && newPrerequisite.trim()) {
                                    addPrerequisite(item.id, newPrerequisite);
                                    setNewPrerequisite('');
                                  }
                                }}
                                className="flex-1 text-sm"
                              />
                              <Button 
                                size="sm"
                                onClick={() => {
                                  if (newPrerequisite.trim()) {
                                    addPrerequisite(item.id, newPrerequisite);
                                    setNewPrerequisite('');
                                  }
                                }}
                              >
                                Добавить
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => moveItem(item.id, 'up')}
                            disabled={index === 0}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => moveItem(item.id, 'down')}
                            disabled={index === sequence.length - 1}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromSequence(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};