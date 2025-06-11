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


// Компонент для шага 4 - Структурирование вспомогательной информации
export const Step4 = ({ data, onChange }) => {
  const [supportInfo, setSupportInfo] = useState(data.supportInfo || []);
  const [newInfo, setNewInfo] = useState({ type: 'text', title: '', content: '' });

  const addSupportInfo = () => {
    if (newInfo.title.trim()) {
      const updatedInfo = [...supportInfo, { ...newInfo, id: Date.now() }];
      setSupportInfo(updatedInfo);
      onChange({ supportInfo: updatedInfo });
      setNewInfo({ type: 'text', title: '', content: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Структурирование вспомогательной информации
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Создайте материалы поддержки для выполнения сложных задач.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Добавить вспомогательную информацию</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Тип материала</Label>
            <Select value={newInfo.type} onValueChange={(value) => setNewInfo({...newInfo, type: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Текстовый материал</SelectItem>
                <SelectItem value="video">Видео</SelectItem>
                <SelectItem value="checklist">Чек-лист</SelectItem>
                <SelectItem value="diagram">Диаграмма</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Заголовок</Label>
            <Input
              placeholder="Название материала..."
              value={newInfo.title}
              onChange={(e) => setNewInfo({...newInfo, title: e.target.value})}
            />
          </div>
          <div>
            <Label>Содержание</Label>
            <Textarea
              placeholder="Описание или содержание материала..."
              value={newInfo.content}
              onChange={(e) => setNewInfo({...newInfo, content: e.target.value})}
              rows={4}
            />
          </div>
          <Button onClick={addSupportInfo}>Добавить материал</Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {supportInfo.map((info) => (
          <Card key={info.id}>
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded ${
                  info.type === 'text' ? 'bg-blue-100 text-blue-600' :
                  info.type === 'video' ? 'bg-red-100 text-red-600' :
                  info.type === 'checklist' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {info.type === 'text' ? '📄' : 
                   info.type === 'video' ? '🎥' :
                   info.type === 'checklist' ? '✅' : '📊'}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{info.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{info.content}</p>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    {info.type === 'text' ? 'Текст' :
                     info.type === 'video' ? 'Видео' :
                     info.type === 'checklist' ? 'Чек-лист' : 'Диаграмма'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};