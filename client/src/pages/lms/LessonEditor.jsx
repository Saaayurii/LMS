import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  FileEdit,
  Video,
  Image,
  ListChecks,
  Code2,
  Trash2,
  Plus,
  Type,
  Film,
  Camera,
  CheckSquare,
  ChevronDown, Target,Settings 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LessonEditor = ({ lesson, onChange }) => {
  const [localLesson, setLocalLesson] = useState({
    title: lesson?.title || '',
    type: lesson?.type || 'text',
    content: lesson?.content || [],
    duration: lesson?.duration || '30 мин',
    objectives: lesson?.objectives || []
  });

  const [activeTab, setActiveTab] = useState('content');
  const [newObjective, setNewObjective] = useState('');

  useEffect(() => {
    onChange?.(localLesson);
  }, [localLesson]);

  const handleAddContentBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      data: type === 'text' ? '' : { url: '', alt: '' },
      questions: []
    };
    
    setLocalLesson(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }));
  };

  const handleContentChange = (id, value) => {
    setLocalLesson(prev => ({
      ...prev,
      content: prev.content.map(block => 
        block.id === id ? { ...block, data: value } : block
      )
    }));
  };

  const handleAddQuestion = (blockId) => {
    const newQuestion = {
      id: Date.now(),
      question: '',
      options: ['', '', ''],
      correctAnswer: 0
    };
    
    setLocalLesson(prev => ({
      ...prev,
      content: prev.content.map(block => 
        block.id === blockId ? { 
          ...block, 
          questions: [...block.questions, newQuestion] 
        } : block
      )
    }));
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Заголовок и основные параметры */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Название урока</Label>
        <Input 
          value={localLesson.title}
          onChange={(e) => setLocalLesson(prev => ({...prev, title: e.target.value}))}
          placeholder="Введите название урока"
        />
        
        <div className="flex gap-4">
          <div className="flex-1">
            <Label className="text-sm font-medium">Тип урока</Label>
            <Select
              value={localLesson.type}
              onValueChange={(value) => setLocalLesson(prev => ({...prev, type: value}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4" /> Текст
                  </div>
                </SelectItem>
                <SelectItem value="video">
                  <div className="flex items-center gap-2">
                    <Film className="h-4 w-4" /> Видео
                  </div>
                </SelectItem>
                <SelectItem value="interactive">
                  <div className="flex items-center gap-2">
                    <ListChecks className="h-4 w-4" /> Интерактив
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Label className="text-sm font-medium">Длительность</Label>
            <Input 
              value={localLesson.duration}
              onChange={(e) => setLocalLesson(prev => ({...prev, duration: e.target.value}))}
              placeholder="Например: 45 мин"
            />
          </div>
        </div>
      </div>

      {/* Основное содержимое */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="content">
            <FileEdit className="h-4 w-4 mr-2" /> Контент
          </TabsTrigger>
          <TabsTrigger value="objectives">
            <Target className="h-4 w-4 mr-2" /> Цели
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" /> Настройки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4 space-y-4">
            {localLesson.content.map((block) => (
              <div key={block.id} className="border rounded-lg p-4 bg-background">
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="capitalize">
                    {block.type === 'text' && <Type className="h-3 w-3 mr-2" />}
                    {block.type === 'video' && <Film className="h-3 w-3 mr-2" />}
                    {block.type === 'quiz' && <CheckSquare className="h-3 w-3 mr-2" />}
                    {block.type}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setLocalLesson(prev => ({
                      ...prev,
                      content: prev.content.filter(b => b.id !== block.id)
                    }))}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                {block.type === 'text' && (
                  <Textarea
                    value={block.data}
                    onChange={(e) => handleContentChange(block.id, e.target.value)}
                    className="min-h-[150px]"
                    placeholder="Введите текстовое содержание..."
                  />
                )}

                {block.type === 'video' && (
                  <div className="space-y-4">
                    <Input
                      value={block.data.url}
                      onChange={(e) => handleContentChange(block.id, {
                        ...block.data,
                        url: e.target.value
                      })}
                      placeholder="URL видео"
                    />
                    <Input
                      value={block.data.alt}
                      onChange={(e) => handleContentChange(block.id, {
                        ...block.data,
                        alt: e.target.value
                      })}
                      placeholder="Описание видео"
                    />
                  </div>
                )}

                {block.type === 'quiz' && (
                  <div className="space-y-4">
                    {block.questions.map((question, qIndex) => (
                      <div key={question.id} className="border rounded p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Вопрос {qIndex + 1}</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setLocalLesson(prev => ({
                              ...prev,
                              content: prev.content.map(b => 
                                b.id === block.id ? {
                                  ...b,
                                  questions: b.questions.filter(q => q.id !== question.id)
                                } : b
                              )
                            }))}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        
                        <Input
                          value={question.question}
                          placeholder="Текст вопроса"
                          onChange={(e) => {
                            const newQuestions = block.questions.map(q => 
                              q.id === question.id ? {...q, question: e.target.value} : q
                            );
                            handleContentChange(block.id, {...block, questions: newQuestions});
                          }}
                        />

                        <div className="space-y-2 mt-2">
                          {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-2">
                              <Input
                                value={option}
                                placeholder={`Вариант ${oIndex + 1}`}
                                onChange={(e) => {
                                  const newOptions = [...question.options];
                                  newOptions[oIndex] = e.target.value;
                                  const newQuestions = block.questions.map(q => 
                                    q.id === question.id ? {...q, options: newOptions} : q
                                  );
                                  handleContentChange(block.id, {...block, questions: newQuestions});
                                }}
                              />
                              <Button
                                variant={question.correctAnswer === oIndex ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                  const newQuestions = block.questions.map(q => 
                                    q.id === question.id ? {...q, correctAnswer: oIndex} : q
                                  );
                                  handleContentChange(block.id, {...block, questions: newQuestions});
                                }}
                              >
                                Верный
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddQuestion(block.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Добавить вопрос
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-2 mt-4">
              <Button onClick={() => handleAddContentBlock('text')}>
                <Type className="h-4 w-4 mr-2" /> Текст
              </Button>
              <Button onClick={() => handleAddContentBlock('video')}>
                <Film className="h-4 w-4 mr-2" /> Видео
              </Button>
              <Button onClick={() => handleAddContentBlock('quiz')}>
                <CheckSquare className="h-4 w-4 mr-2" /> Тест
              </Button>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="objectives" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4 space-y-4">
            <div className="space-y-2">
              {localLesson.objectives.map((obj, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={obj}
                    onChange={(e) => {
                      const newObjectives = [...localLesson.objectives];
                      newObjectives[index] = e.target.value;
                      setLocalLesson(prev => ({...prev, objectives: newObjectives}));
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLocalLesson(prev => ({
                      ...prev,
                      objectives: prev.objectives.filter((_, i) => i !== index)
                    }))}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newObjective}
                onChange={(e) => setNewObjective(e.target.value)}
                placeholder="Новая цель обучения"
              />
              <Button
                onClick={() => {
                  if (newObjective.trim()) {
                    setLocalLesson(prev => ({
                      ...prev,
                      objectives: [...prev.objectives, newObjective]
                    }));
                    setNewObjective('');
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-2" /> Добавить
              </Button>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LessonEditor;