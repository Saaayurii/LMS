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


// Шаг 7: Проектирование своевременной информации
export const Step7 = ({ data, onChange }) => {
  const [timelyInfo, setTimelyInfo] = useState(data.timelyInfo || []);
  const [newInfo, setNewInfo] = useState({
    title: '',
    content: '',
    triggerType: 'on_demand',
    triggerCondition: '',
    format: 'text',
    urgency: 'medium',
    context: '',
    deliveryMethod: 'popup'
  });

  const triggerTypes = [
    { value: 'on_demand', label: 'По запросу', description: 'Информация появляется, когда студент её запрашивает' },
    { value: 'contextual', label: 'Контекстная', description: 'Автоматически появляется в определенном контексте' },
    { value: 'error_triggered', label: 'При ошибке', description: 'Показывается при совершении ошибки' },
    { value: 'time_based', label: 'По времени', description: 'Появляется через определенное время' },
    { value: 'progress_based', label: 'По прогрессу', description: 'Связана с определенным этапом выполнения' }
  ];

  const formats = [
    { value: 'text', label: 'Текст', icon: FileText },
    { value: 'video', label: 'Видео', icon: Video },
    { value: 'image', label: 'Изображение', icon: Image },
    { value: 'checklist', label: 'Чек-лист', icon: CheckCircle2 },
    { value: 'tooltip', label: 'Подсказка', icon: Lightbulb }
  ];

  const deliveryMethods = [
    { value: 'popup', label: 'Всплывающее окно' },
    { value: 'sidebar', label: 'Боковая панель' },
    { value: 'inline', label: 'Встроенная информация' },
    { value: 'notification', label: 'Уведомление' },
    { value: 'overlay', label: 'Наложение' }
  ];

  const addTimelyInfo = () => {
    if (newInfo.title.trim()) {
      const updatedInfo = [...timelyInfo, { ...newInfo, id: Date.now() }];
      setTimelyInfo(updatedInfo);
      onChange({ timelyInfo: updatedInfo });
      setNewInfo({
        title: '',
        content: '',
        triggerType: 'on_demand',
        triggerCondition: '',
        format: 'text',
        urgency: 'medium',
        context: '',
        deliveryMethod: 'popup'
      });
    }
  };

  const removeTimelyInfo = (id) => {
    const updatedInfo = timelyInfo.filter(info => info.id !== id);
    setTimelyInfo(updatedInfo);
    onChange({ timelyInfo: updatedInfo });
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Проектирование своевременной информации
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Создайте информацию, которая появляется точно в момент, когда студенту она необходима.
        </p>
        <div className="bg-white dark:bg-gray-800 p-3 rounded border-l-4 border-l-amber-500">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>Своевременная информация</strong> — это процедурная информация, предоставляемая именно тогда, 
            когда она нужна для выполнения конкретного шага в задаче.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Добавить своевременную информацию</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Содержание</TabsTrigger>
              <TabsTrigger value="trigger">Триггеры</TabsTrigger>
              <TabsTrigger value="delivery">Подача</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div>
                <Label htmlFor="info-title">Заголовок информации</Label>
                <Input
                  id="info-title"
                  placeholder="Например: Как рассчитать ROI"
                  value={newInfo.title}
                  onChange={(e) => setNewInfo({...newInfo, title: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="info-format">Формат информации</Label>
                <Select value={newInfo.format} onValueChange={(value) => setNewInfo({...newInfo, format: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map(format => {
                      const Icon = format.icon;
                      return (
                        <SelectItem key={format.value} value={format.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {format.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="info-content">Содержание</Label>
                <Textarea
                  id="info-content"
                  placeholder="Введите содержание своевременной информации..."
                  value={newInfo.content}
                  onChange={(e) => setNewInfo({...newInfo, content: e.target.value})}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="info-context">Контекст использования</Label>
                <Input
                  id="info-context"
                  placeholder="В каком контексте нужна эта информация?"
                  value={newInfo.context}
                  onChange={(e) => setNewInfo({...newInfo, context: e.target.value})}
                />
              </div>
            </TabsContent>

            <TabsContent value="trigger" className="space-y-4">
              <div>
                <Label htmlFor="trigger-type">Тип триггера</Label>
                <Select value={newInfo.triggerType} onValueChange={(value) => setNewInfo({...newInfo, triggerType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {triggerTypes.map(type => (
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
                <Label htmlFor="trigger-condition">Условие появления</Label>
                <Input
                  id="trigger-condition"
                  placeholder="Например: при нажатии кнопки 'Помощь' или через 30 секунд бездействия"
                  value={newInfo.triggerCondition}
                  onChange={(e) => setNewInfo({...newInfo, triggerCondition: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="info-urgency">Уровень срочности</Label>
                <Select value={newInfo.urgency} onValueChange={(value) => setNewInfo({...newInfo, urgency: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Низкая - дополнительная информация</SelectItem>
                    <SelectItem value="medium">Средняя - полезная информация</SelectItem>
                    <SelectItem value="high">Высокая - критически важная информация</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="delivery" className="space-y-4">
              <div>
                <Label htmlFor="delivery-method">Способ предоставления</Label>
                <Select value={newInfo.deliveryMethod} onValueChange={(value) => setNewInfo({...newInfo, deliveryMethod: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryMethods.map(method => (
                      <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Предварительный просмотр</h4>
                <div className={`p-3 rounded border-2 border-dashed ${
                  newInfo.urgency === 'high' ? 'border-red-300 bg-red-50' :
                  newInfo.urgency === 'medium' ? 'border-yellow-300 bg-yellow-50' :
                  'border-blue-300 bg-blue-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {React.createElement(formats.find(f => f.value === newInfo.format)?.icon || FileText, { 
                      className: "h-4 w-4" 
                    })}
                    <span className="font-medium">{newInfo.title || 'Заголовок информации'}</span>
                  </div>
                  <p className="text-sm text-gray-600">{newInfo.content || 'Содержание информации...'}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Триггер: {triggerTypes.find(t => t.value === newInfo.triggerType)?.label} | 
                    Подача: {deliveryMethods.find(m => m.value === newInfo.deliveryMethod)?.label}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />
          <Button onClick={addTimelyInfo} className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Добавить своевременную информацию
          </Button>
        </CardContent>
      </Card>

      {/* Список созданной своевременной информации */}
      <div className="space-y-4">
        {timelyInfo.map((info) => {
          const FormatIcon = formats.find(f => f.value === info.format)?.icon || FileText;
          return (
            <Card key={info.id} className="border-l-4 border-l-amber-500">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FormatIcon className="h-5 w-5" />
                      <h4 className="font-semibold">{info.title}</h4>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline">{triggerTypes.find(t => t.value === info.triggerType)?.label}</Badge>
                      <Badge variant={info.urgency === 'high' ? 'destructive' : info.urgency === 'medium' ? 'default' : 'secondary'}>
                        {info.urgency === 'high' ? 'Высокая' : info.urgency === 'medium' ? 'Средняя' : 'Низкая'} важность
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{info.content}</p>
                    {info.context && (
                      <p className="text-xs text-gray-500 mb-2">
                        <strong>Контекст:</strong> {info.context}
                      </p>
                    )}
                    {info.triggerCondition && (
                      <p className="text-xs text-gray-500">
                        <strong>Условие:</strong> {info.triggerCondition}
                      </p>
                    )}
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => removeTimelyInfo(info.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
