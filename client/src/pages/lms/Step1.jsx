import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  PlusCircle, Trash2, Target, CheckCircle2,
  ChevronDown, ChevronUp, Edit, GanttChart,
  Star, Tags, Calendar, Clock, AlertCircle,
  Link2, FileText, Video, Image, ListChecks
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as DatePicker } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';


export const Step1 = ({ data, onChange }) => {
  // Состояния для задач
  const [tasks, setTasks] = useState(data.tasks || []);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    complexity: 'medium',
    priority: 'normal',
    deadline: null,
    tags: [],
    resources: []
  });
  const [newSubtask, setNewSubtask] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newResource, setNewResource] = useState({ type: 'link', value: '' });
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация задач
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'important' && task.priority === 'high') ||
      (activeTab === 'completed' && task.subtasks?.every(st => st.completed));
    return matchesSearch && matchesTab;
  });

  // Добавление задачи
  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        subtasks: [],
        createdAt: new Date(),
        isExpanded: true
      };
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      onChange({ tasks: updatedTasks });
      setNewTask({
        title: '',
        description: '',
        complexity: 'medium',
        priority: 'normal',
        deadline: null,
        tags: [],
        resources: []
      });
    }
  };

  // Удаление задачи
  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    onChange({ tasks: updatedTasks });
  };

  // Добавление подзадачи
  const addSubtask = (taskId) => {
    if (newSubtask.trim()) {
      const updatedTasks = tasks.map(task => 
        task.id === taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks,
                { id: Date.now(), title: newSubtask, completed: false }
              ]
            }
          : task
      );
      setTasks(updatedTasks);
      onChange({ tasks: updatedTasks });
      setNewSubtask('');
    }
  };

  // Добавление тега
  const addTag = () => {
    if (newTag.trim()) {
      setNewTask({
        ...newTask,
        tags: [...newTask.tags, { id: Date.now(), name: newTag }]
      });
      setNewTag('');
    }
  };

  // Добавление ресурса
  const addResource = () => {
    if (newResource.value.trim()) {
      setNewTask({
        ...newTask,
        resources: [...newTask.resources, { ...newResource, id: Date.now() }]
      });
      setNewResource({ type: 'link', value: '' });
    }
  };

  // Переключение статуса подзадачи
  const toggleSubtask = (taskId, subtaskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId
        ? {
            ...task,
            subtasks: task.subtasks.map(st => 
              st.id === subtaskId ? { ...st, completed: !st.completed } : st
            )
          }
        : task
    );
    setTasks(updatedTasks);
    onChange({ tasks: updatedTasks });
  };

  // Переключение видимости подзадач
  const toggleExpand = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, isExpanded: !task.isExpanded } : task
    ));
  };

  // Расчет прогресса выполнения
  const calculateProgress = (subtasks) => {
    if (!subtasks || subtasks.length === 0) return 0;
    const completed = subtasks.filter(st => st.completed).length;
    return Math.round((completed / subtasks.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Заголовок и описание */}
      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Target className="mr-2 h-5 w-5" />
          Сбор аутентичных учебных задач
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Определите реальные, практические задачи, которые студенты должны уметь решать после обучения.
        </p>
      </div>

      {/* Форма добавления новой задачи */}
      <Card>
        <CardHeader>
          <CardTitle>Добавить новую задачу</CardTitle>
          <CardDescription>Заполните все необходимые поля</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Название задачи *</Label>
              <Input
                placeholder="Введите описание учебной задачи..."
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>
            <div>
              <Label>Сложность</Label>
              <Select
                value={newTask.complexity}
                onValueChange={(value) => setNewTask({...newTask, complexity: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сложность" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Легкая
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      Средняя
                    </div>
                  </SelectItem>
                  <SelectItem value="hard">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Сложная
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Описание задачи</Label>
            <Textarea
              placeholder="Подробное описание задачи..."
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Приоритет</Label>
              <Select
                value={newTask.priority}
                onValueChange={(value) => setNewTask({...newTask, priority: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите приоритет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Низкий</SelectItem>
                  <SelectItem value="normal">Обычный</SelectItem>
                  <SelectItem value="high">Высокий</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Дедлайн</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    {newTask.deadline ? newTask.deadline.toLocaleDateString() : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <DatePicker
                    mode="single"
                    selected={newTask.deadline}
                    onSelect={(date) => setNewTask({...newTask, deadline: date})}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Тип задачи</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Индивидуальная</SelectItem>
                  <SelectItem value="group">Групповая</SelectItem>
                  <SelectItem value="project">Проектная</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Теги</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Добавить тег..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button onClick={addTag}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Добавить
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {newTask.tags.map(tag => (
                <Badge key={tag.id} variant="outline" className="flex items-center gap-1">
                  <Tags className="h-3 w-3" />
                  {tag.name}
                  <button 
                    onClick={() => setNewTask({
                      ...newTask,
                      tags: newTask.tags.filter(t => t.id !== tag.id)
                    })}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    &times;
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Ресурсы</Label>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
              <div className="md:col-span-3">
                <Select
                  value={newResource.type}
                  onValueChange={(value) => setNewResource({...newResource, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="link">Ссылка</SelectItem>
                    <SelectItem value="file">Файл</SelectItem>
                    <SelectItem value="video">Видео</SelectItem>
                    <SelectItem value="image">Изображение</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-7">
                <Input
                  placeholder={
                    newResource.type === 'link' ? 'Введите URL...' :
                    newResource.type === 'file' ? 'Название файла...' :
                    'Описание ресурса...'
                  }
                  value={newResource.value}
                  onChange={(e) => setNewResource({...newResource, value: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Button onClick={addResource} className="w-full">
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              {newTask.resources.map(resource => (
                <div key={resource.id} className="flex items-center gap-2 text-sm">
                  {resource.type === 'link' && <Link2 className="h-4 w-4" />}
                  {resource.type === 'file' && <FileText className="h-4 w-4" />}
                  {resource.type === 'video' && <Video className="h-4 w-4" />}
                  {resource.type === 'image' && <Image className="h-4 w-4" />}
                  <span className="truncate">{resource.value}</span>
                  <button 
                    onClick={() => setNewTask({
                      ...newTask,
                      resources: newTask.resources.filter(r => r.id !== resource.id)
                    })}
                    className="text-gray-400 hover:text-gray-600 ml-auto"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex justify-end">
            <Button onClick={addTask} disabled={!newTask.title.trim()}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Добавить задачу
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Фильтры и поиск */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Поиск задач..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
          >
            Все
          </Button>
          <Button
            variant={activeTab === 'important' ? 'default' : 'outline'}
            onClick={() => setActiveTab('important')}
          >
            <Star className="h-4 w-4 mr-2" />
            Важные
          </Button>
          <Button
            variant={activeTab === 'completed' ? 'default' : 'outline'}
            onClick={() => setActiveTab('completed')}
          >
            <ListChecks className="h-4 w-4 mr-2" />
            Завершенные
          </Button>
        </div>
      </div>

      {/* Список задач */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Нет задач, соответствующих критериям поиска
          </div>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="border-l-4 border-l-blue-500">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{task.title}</h4>
                      {task.priority === 'high' && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Высокий приоритет
                          </TooltipContent>
                        </Tooltip>
                      )}
                      <Badge variant={
                        task.complexity === 'easy' ? 'success' :
                        task.complexity === 'medium' ? 'warning' : 'destructive'
                      }>
                        {task.complexity === 'easy' ? 'Легкая' : 
                         task.complexity === 'medium' ? 'Средняя' : 'Сложная'}
                      </Badge>
                    </div>
                    
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {task.tags.map(tag => (
                        <Badge key={tag.id} variant="outline" className="flex items-center gap-1">
                          <Tags className="h-3 w-3" />
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    
                    {task.deadline && (
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                        <Clock className="h-4 w-4" />
                        Дедлайн: {task.deadline.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(task.id)}
                    >
                      {task.isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditTaskData(task);
                        setEditingTaskId(task.id);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>

                {task.isExpanded && (
                  <div className="mt-4">
                    {task.subtasks && task.subtasks.length > 0 && (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Подзадачи</Label>
                          <div className="text-sm text-gray-500">
                            {task.subtasks.filter(st => st.completed).length} / {task.subtasks.length} завершено
                          </div>
                        </div>
                        <Progress
                          value={calculateProgress(task.subtasks)}
                          className="h-2 mb-2"
                        />
                      </>
                    )}

                    <div className="space-y-2">
                      {task.subtasks?.map((subtask) => (
                        <div key={subtask.id} className="flex items-center gap-2">
                          <Checkbox
                            checked={subtask.completed}
                            onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
                          />
                          <span className={
                            subtask.completed ? 'line-through text-gray-400' : ''
                          }>
                            {subtask.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Input
                        placeholder="Добавить подзадачу..."
                        value={newSubtask}
                        onChange={(e) => setNewSubtask(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSubtask(task.id)}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => addSubtask(task.id)}
                        disabled={!newSubtask.trim()}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
