import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  ChevronDown,
  Info,
  Star,
  ListChecks,
  BrainCircuit,
  Puzzle,
  Clock,
  GraduationCap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

const InteractiveProgress = ({ step, total, validation }) => (
  <div className="mb-6 space-y-2">
    <div className="flex justify-between text-sm">
      <span>Прогресс шага: {validation.progress}%</span>
      <span>
        {validation.validationStatus ? "✅ Проверено" : "⚠️ Требуется проверка"}
      </span>
    </div>
    <Progress value={validation.progress} className="h-2" />
    <div className="flex gap-2 mt-2">
      <Button
        size="sm"
        variant={validation.isValid ? "default" : "secondary"}
        disabled={!validation.isValid}
      >
        {validation.isValid ? "Перейти к следующему" : "Завершите задание"}
      </Button>
    </div>
  </div>
);

const CognitiveRulesDisplay = ({ rules = [] }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {rules.map((rule, i) => (
      <div key={i} className="p-4 border rounded-lg bg-muted/10">
        <div className="font-medium mb-2 flex items-center gap-2">
          <BrainCircuit className="h-4 w-4" /> {rule.name}
        </div>
        <div className="text-sm text-muted-foreground mb-3">
          {rule.description}
        </div>
        <div className="flex flex-wrap gap-2">
          {rule.conditions.map((cond, j) => (
            <Badge key={j} variant="outline" className="flex items-center">
              <AlertCircle className="h-3.5 w-3.5 mr-1" /> {cond}
            </Badge>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SequenceTree = ({ data = [] }) => {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  useEffect(() => {
    const initialNodes = data.map((item, index) => ({
      id: item.id.toString(),
      position: { x: index * 250, y: 0 },
      data: {
        label: (
          <div className="p-2 bg-background border rounded-lg shadow-sm w-40">
            <div className="font-medium">{item.task}</div>
            <div className="text-xs text-muted-foreground">{item.duration}</div>
          </div>
        ),
      },
    }));

    const initialEdges = data
      .filter((item) => item.prerequisites && item.prerequisites.length > 0)
      .flatMap((item) =>
        item.prerequisites.map((prereq) => ({
          id: `${prereq}-${item.id}`,
          source: prereq.toString(),
          target: item.id.toString(),
        }))
      );

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [data]);

  return (
    <div className="h-[400px] bg-muted/20 rounded-lg overflow-hidden">
      <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false}>
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

// Заглушка для CognitiveGraph, который не был определен в исходном коде
const CognitiveGraph = ({ nodes = [], edges = [] }) => (
  <div className="p-4 border rounded-lg">
    <div className="text-sm text-muted-foreground">Когнитивный граф</div>
    <div>
      Узлы: {nodes.length}, Связи: {edges.length}
    </div>
  </div>
);

const CourseInterface = ({ courseData = [] }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [stepStates, setStepStates] = useState({});

  const getStepRequirements = (stepId) => {
    switch (stepId) {
      case 1: // Учебные задачи
        return [
          "Минимум 3 учебные задачи разной сложности",
          "Каждая задача должна иметь четкое описание",
          "Указать связь с компетенциями обучающихся",
        ];
      case 2: // Критерии оценки
        return [
          "Определить не менее 4 критериев оценки",
          "Указать вес каждого критерия в процентах",
          "Включить как количественные, так и качественные критерии",
        ];
      case 3: // Последовательность
        return [
          "Построить логическую последовательность задач",
          "Определить зависимости между задачами",
          "Учесть принцип от простого к сложному",
        ];
      case 4: // Учебные материалы
        return [
          "Добавить разнообразные форматы материалов (видео, текст, аудио)",
          "Указать источники и авторство материалов",
          "Обеспечить доступность материалов для всех обучающихся",
        ];
      case 5: // Временные рамки
        return [
          "Распределить время на каждый этап обучения",
          "Учесть время на самостоятельную работу",
          "Предусмотреть буферное время для сложных тем",
        ];
      case 6: // Ментальные модели
        return [
          "Определить ключевые концепции и их взаимосвязи",
          "Визуализировать ментальные модели в виде схем",
          "Соотнести модели с практическими задачами",
        ];
      case 7: // Практические задания
        return [
          "Создать задания разного уровня сложности",
          "Определить критерии успешного выполнения",
          "Связать задания с реальными профессиональными ситуациями",
        ];
      case 8: // Когнитивные правила
        return [
          "Определить минимум 5 когнитивных правил",
          "Указать условия применения каждого правила",
          "Соотнести правила с этапами обучения",
        ];
      case 9: // Обратная связь
        return [
          "Определить методы сбора обратной связи",
          "Указать периодичность получения обратной связи",
          "Разработать механизм корректировки курса на основе отзывов",
        ];
      case 10: // Итоговая аттестация
        return [
          "Определить формат итоговой работы",
          "Разработать критерии оценивания",
          "Предусмотреть возможность пересдачи",
        ];
      default:
        return [
          "Минимум 3 элемента в структуре",
          "Проверка связей между компонентами",
          "Соответствие методологии 4C/ID",
        ];
    }
  };

  const stepsConfig = [
    {
      id: 1,
      title: "Учебные задачи",
      icon: <ListChecks className="h-4 w-4" />,
      validation: (data) => data && data.tasks?.length > 0,
      hints: [
        "Определите основные учебные задачи",
        "Укажите сложность каждой задачи",
      ],
    },
    {
      id: 2,
      title: "Критерии оценки",
      icon: <Star className="h-4 w-4" />,
      validation: (data) => data && data.criteria?.length > 0,
      hints: [
        "Определите критерии успешного выполнения",
        "Укажите вес каждого критерия",
      ],
    },
    {
      id: 3,
      title: "Последовательность",
      icon: <ListChecks className="h-4 w-4" />,
      validation: (data) => data && data.sequence?.length > 0,
      hints: [
        "Определите порядок выполнения задач",
        "Укажите зависимости между задачами",
      ],
    },
    {
      id: 4,
      title: "Учебные материалы",
      icon: <GraduationCap className="h-4 w-4" />,
      validation: (data) => data && data.materials?.length > 0,
      hints: [
        "Добавьте необходимые учебные материалы",
        "Укажите формат и источник каждого материала",
      ],
    },
    {
      id: 5,
      title: "Временные рамки",
      icon: <Clock className="h-4 w-4" />,
      validation: (data) => data && data.timeline?.length > 0,
      hints: [
        "Определите продолжительность каждого этапа",
        "Укажите общую длительность курса",
      ],
    },
    {
      id: 6,
      title: "Ментальные модели",
      icon: <BrainCircuit className="h-4 w-4" />,
      validation: (data) => data && data.mentalModels?.length > 0,
      hints: [
        "Определите ключевые ментальные модели",
        "Укажите связи между компонентами модели",
      ],
    },
    {
      id: 7,
      title: "Практические задания",
      icon: <Puzzle className="h-4 w-4" />,
      validation: (data) => data && data.practicalTasks?.length > 0,
      hints: [
        "Создайте практические задания для закрепления материала",
        "Укажите ожидаемые результаты",
      ],
    },
    {
      id: 8,
      title: "Когнитивные правила",
      icon: <AlertCircle className="h-4 w-4" />,
      validation: (data) => data && data.cognitiveRules?.length > 0,
      hints: [
        "Определите когнитивные правила обучения",
        "Укажите условия применения каждого правила",
      ],
    },
    {
      id: 9,
      title: "Обратная связь",
      icon: <Info className="h-4 w-4" />,
      validation: (data) => data && data.feedback?.methods?.length > 0,
      hints: [
        "Определите методы получения обратной связи",
        "Укажите критерии оценки эффективности",
      ],
    },
    {
      id: 10,
      title: "Итоговая аттестация",
      icon: <CheckCircle className="h-4 w-4" />,
      validation: (data) => data && data.finalAssessment?.criteria?.length > 0,
      hints: [
        "Определите формат итоговой аттестации",
        "Укажите критерии успешного прохождения",
      ],
    },
  ];

  useEffect(() => {
    const initialStates = stepsConfig.reduce((acc, step) => {
      const stepData = courseData[step.id - 1] || {};
      acc[step.id] = {
        progress: courseData[step.id - 1] ? 100 : 0,
        isValid: step.validation(stepData),
        validationStatus: !!courseData[step.id - 1],
      };
      return acc;
    }, {});
    setStepStates(initialStates);
  }, [courseData]);

 const renderStepContent = (stepData, stepId) => {
  // Проверяем, существуют ли данные для текущего шага
  if (!stepData) {
    return (
      <div className="p-4 border rounded-lg bg-muted/10">
        <p className="text-muted-foreground">
          Данные для этого шага отсутствуют
        </p>
      </div>
    );
  }

  switch (stepId) {
    case 1: // Учебные задачи
      return (
        <div className="space-y-4">
          <div className="grid gap-4">
            {stepData.tasks?.map((task, i) => (
              <div key={i} className="p-4 border rounded-lg bg-background">
                <div className="flex items-center gap-3 mb-2">
                  <Badge
                    variant={
                      task.complexity === "high" ? "destructive" : 
                      task.complexity === "medium" ? "default" : "outline"
                    }
                  >
                    {task.complexity}
                  </Badge>
                  <span className="font-medium">{task.title}</span>
                  {task.priority && (
                    <Badge variant="secondary" className="ml-auto">
                      Приоритет: {task.priority}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {task.description || "Описание задачи отсутствует"}
                </div>
                {task.competencies && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.competencies.map((comp, j) => (
                      <Badge key={j} variant="outline" className="bg-blue-50">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {!stepData.tasks?.length && (
              <div className="p-4 border rounded-lg bg-muted/10">
                <p className="text-muted-foreground">Задачи не определены</p>
              </div>
            )}
          </div>
        </div>
      );

    case 2: // Критерии оценки
      return (
        <div className="space-y-4">
          <div className="grid gap-4">
            {stepData.criteria?.map((criterion, i) => (
              <div key={i} className="p-4 border rounded-lg bg-background">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{criterion.name}</span>
                  <Badge variant="outline">
                    Вес: {criterion.weight || 0}%
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {criterion.description || "Описание критерия отсутствует"}
                </div>
                <div className="mt-2">
                  <div className="text-sm font-medium mb-1">Шкала оценки:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {criterion.scale?.map((level, j) => (
                      <div key={j} className="p-2 border rounded bg-muted/10 text-xs">
                        <div className="font-medium">{level.name}</div>
                        <div className="text-muted-foreground">{level.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {!stepData.criteria?.length && (
              <div className="p-4 border rounded-lg bg-muted/10">
                <p className="text-muted-foreground">Критерии не определены</p>
              </div>
            )}
          </div>
        </div>
      );

    case 3: // Последовательность
      return (
        <div className="space-y-4">
          {stepData.sequence ? (
            <SequenceTree data={stepData.sequence} />
          ) : (
            <div className="p-4 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">
                Последовательность не определена
              </p>
            </div>
          )}
          <div className="grid gap-4">
            {stepData.sequence?.map((item, i) => (
              <div key={i} className="p-4 border rounded-lg bg-background">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline">
                    Этап {i + 1}
                  </Badge>
                  <span className="font-medium">{item.task}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {item.duration}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {item.description || "Описание этапа отсутствует"}
                </div>
                {item.prerequisites?.length > 0 && (
                  <div className="mt-2">
                    <div className="text-sm font-medium mb-1">Зависимости:</div>
                    <div className="flex flex-wrap gap-2">
                      {item.prerequisites.map((prereq, j) => (
                        <Badge key={j} variant="outline" className="bg-muted/20">
                          Этап {prereq}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case 4: // Учебные материалы
      return (
        <div className="space-y-4">
          <div className="grid gap-4">
            {stepData.materials?.map((material, i) => (
              <div key={i} className="p-4 border rounded-lg bg-background">
                <div className="flex items-center gap-3 mb-2">
                  <Badge
                    variant={
                      material.type === "video" ? "default" : 
                      material.type === "text" ? "outline" : 
                      material.type === "audio" ? "secondary" : "outline"
                    }
                  >
                    {material.type}
                  </Badge>
                  <span className="font-medium">{material.title}</span>
                  {material.duration && (
                    <Badge variant="outline" className="ml-auto">
                      {material.duration}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {material.description || "Описание материала отсутствует"}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Источник:</span>
                  <a href={material.source} className="text-blue-600 hover:underline">
                    {material.sourceTitle || material.source}
                  </a>
                </div>
                {material.relatedTasks?.length > 0 && (
                  <div className="mt-2">
                    <div className="text-sm font-medium mb-1">Связанные задачи:</div>
                    <div className="flex flex-wrap gap-2">
                      {material.relatedTasks.map((taskId, j) => (
                        <Badge key={j} variant="outline" className="bg-blue-50">
                          Задача {taskId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {!stepData.materials?.length && (
              <div className="p-4 border rounded-lg bg-muted/10">
                <p className="text-muted-foreground">Материалы не определены</p>
              </div>
            )}
          </div>
        </div>
      );

    case 5: // Временные рамки
      return (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-background">
            <div className="font-medium mb-2">Общая продолжительность курса</div>
            <div className="flex items-center gap-3">
              <Badge variant="default" className="text-lg">
                {stepData.totalDuration || "Не указано"}
              </Badge>
            </div>
          </div>
          
          <div className="grid gap-4">
            {stepData.timeline?.map((period, i) => (
              <div key={i} className="p-4 border rounded-lg bg-background">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{period.name}</span>
                  <Badge variant="outline">
                    {period.duration}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {period.description || "Описание периода отсутствует"}
                </div>
                <div className="mt-2">
                  <div className="text-sm font-medium mb-1">Активности:</div>
                  <div className="grid gap-2">
                    {period.activities?.map((activity, j) => (
                      <div key={j} className="p-2 border rounded bg-muted/10 flex justify-between">
                        <span>{activity.name}</span>
                        <Badge variant="secondary">{activity.duration}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {!stepData.timeline?.length && (
              <div className="p-4 border rounded-lg bg-muted/10">
                <p className="text-muted-foreground">Временные рамки не определены</p>
              </div>
            )}
          </div>
        </div>
      );

    case 6: // Ментальные модели
      return (
        <div className="space-y-4">
          {stepData.mentalModels?.map((model, i) => (
            <div key={i} className="p-4 border rounded-lg bg-background">
              <div className="font-medium mb-2">{model.name}</div>
              <div className="text-sm text-muted-foreground mb-4">
                {model.description || "Описание модели отсутствует"}
              </div>
              <CognitiveGraph
                nodes={model.components || []}
                edges={model.relationships || []}
              />
              <div className="mt-4 grid gap-2">
                {model.components?.map((component, j) => (
                  <div key={j} className="p-2 border rounded bg-muted/10">
                    <div className="font-medium">{component.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {component.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {!stepData.mentalModels?.length && (
            <div className="p-4 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">
                Ментальные модели не определены
              </p>
            </div>
          )}
        </div>
      );

    case 7: // Практические задания
      return (
        <div className="space-y-4">
          <div className="grid gap-4">
            {stepData.practicalTasks?.map((task, i) => (
              <div key={i} className="p-4 border rounded-lg bg-background">
                <div className="flex items-center gap-3 mb-2">
                  <Badge
                    variant={
                      task.difficulty === "advanced" ? "destructive" : 
                      task.difficulty === "intermediate" ? "default" : "outline"
                    }
                  >
                    {task.difficulty || "Базовый"}
                  </Badge>
                  <span className="font-medium">{task.title}</span>
                  {task.estimatedTime && (
                    <Badge variant="secondary" className="ml-auto">
                      {task.estimatedTime}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {task.description || "Описание задания отсутствует"}
                </div>
                
                <div className="mt-3 space-y-3">
                  <div>
                    <div className="text-sm font-medium mb-1">Задача:</div>
                    <div className="p-2 bg-muted/10 rounded text-sm">
                      {task.problem || "Не указана"}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Ожидаемый результат:</div>
                    <div className="p-2 bg-muted/10 rounded text-sm">
                      {task.expectedOutcome || "Не указан"}
                    </div>
                  </div>
                  
                  {task.hints?.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-1">Подсказки:</div>
                      <div className="space-y-1">
                        {task.hints.map((hint, j) => (
                          <div key={j} className="p-2 bg-muted/10 rounded text-sm">
                            {hint}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {!stepData.practicalTasks?.length && (
              <div className="p-4 border rounded-lg bg-muted/10">
                <p className="text-muted-foreground">Практические задания не определены</p>
              </div>
            )}
          </div>
        </div>
      );

    case 8: // Когнитивные правила
      return (
        <div className="space-y-4">
          {stepData.cognitiveRules ? (
            <CognitiveRulesDisplay rules={stepData.cognitiveRules} />
          ) : (
            <div className="p-4 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">
                Когнитивные правила не определены
              </p>
            </div>
          )}
        </div>
      );

    case 9: // Обратная связь
      return (
        <div className="space-y-4">
          <div className="grid gap-4">
            {stepData.feedback?.methods?.map((method, i) => (
              <div key={i} className="p-4 border rounded-lg bg-background">
                <div className="font-medium mb-2">{method.name}</div>
                <div className="text-sm text-muted-foreground mb-3">
                  {method.description || "Описание метода отсутствует"}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">
                    Периодичность: {method.frequency || "Не указана"}
                  </Badge>
                  <Badge variant="outline">
                    Формат: {method.format || "Не указан"}
                  </Badge>
                </div>
              </div>
            ))}
            
            {stepData.feedback?.metrics?.length > 0 && (
              <div className="p-4 border rounded-lg bg-background">
                <div className="font-medium mb-3">Метрики эффективности</div>
                <div className="grid gap-2">
                  {stepData.feedback.metrics.map((metric, i) => (
                    <div key={i} className="p-2 border rounded bg-muted/10">
                      <div className="font-medium">{metric.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {metric.description}
                      </div>
                      {metric.target && (
                        <div className="mt-1 text-sm">
                          <span className="text-muted-foreground">Целевое значение:</span> {metric.target}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(!stepData.feedback?.methods?.length && !stepData.feedback?.metrics?.length) && (
              <div className="p-4 border rounded-lg bg-muted/10">
                <p className="text-muted-foreground">Методы обратной связи не определены</p>
              </div>
            )}
          </div>
        </div>
      );

    case 10: // Итоговая аттестация
      return (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-background">
            <div className="font-medium mb-2">Формат итоговой аттестации</div>
            <div className="text-sm text-muted-foreground mb-3">
              {stepData.finalAssessment?.format || "Формат не определен"}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                Продолжительность: {stepData.finalAssessment?.duration || "Не указана"}
              </Badge>
              <Badge variant="outline">
                Проходной балл: {stepData.finalAssessment?.passingScore || "Не указан"}
              </Badge>
            </div>
          </div>
          
          <div className="grid gap-4">
            {stepData.finalAssessment?.criteria?.map((criterion, i) => (
              <div key={i} className="p-4 border rounded-lg bg-background">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{criterion.name}</span>
                  <Badge variant="outline">
                    Вес: {criterion.weight || 0}%
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {criterion.description || "Описание критерия отсутствует"}
                </div>
              </div>
            ))}
          </div>
          
          {stepData.finalAssessment?.retake && (
            <div className="p-4 border rounded-lg bg-background">
              <div className="font-medium mb-2">Правила пересдачи</div>
              <div className="text-sm text-muted-foreground">
                {stepData.finalAssessment.retake.description}
              </div>
              <div className="mt-2">
                <Badge variant="outline">
                  Максимальное количество попыток: {stepData.finalAssessment.retake.maxAttempts || "Не ограничено"}
                </Badge>
              </div>
            </div>
          )}
          
          {(!stepData.finalAssessment?.format && !stepData.finalAssessment?.criteria?.length) && (
            <div className="p-4 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">Параметры итоговой аттестации не определены</p>
            </div>
          )}
        </div>
      );

    default:
      return (
        <div className="p-4 border rounded-lg bg-muted/10">
          <pre className="text-sm text-muted-foreground overflow-auto">
            {JSON.stringify(stepData, null, 2)}
          </pre>
        </div>
      );
  }
};

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen bg-muted/20"
    >
      {/* Левая панель навигации */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
        <ScrollArea className="h-full p-4 border-r bg-background">
          <h3 className="font-semibold mb-4 flex items-center">
            <BrainCircuit className="h-5 w-5 mr-2" />
            4С/ID
          </h3>
          {stepsConfig.map((step) => (
            <div
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={cn(
                "p-3 mb-2 rounded-lg cursor-pointer transition-colors relative",
                activeStep === step.id
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "hover:bg-muted/10 border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                {step.icon}
                <span className="text-sm">{step.title}</span>
                <Badge
                  variant={
                    stepStates[step.id]?.isValid ? "default" : "secondary"
                  }
                  className="ml-auto"
                >
                  {stepStates[step.id]?.progress}%
                </Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${stepStates[step.id]?.progress || 0}%` }}
                />
              </div>
            </div>
          ))}
        </ScrollArea>
      </ResizablePanel>

      {/* Основной контент */}
      <ResizablePanel defaultSize={60}>
        <div className="h-full bg-background flex flex-col">
          <div className="border-b p-4 bg-muted/10">
            <div className="flex items-center gap-3">
              {stepsConfig[activeStep - 1]?.icon}
              <h1 className="text-xl font-semibold">
                {stepsConfig[activeStep - 1]?.title}
              </h1>
              <Badge variant="outline" className="ml-auto">
                Шаг {activeStep} из {stepsConfig.length}
              </Badge>
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <InteractiveProgress
                step={stepsConfig[activeStep - 1]}
                total={stepsConfig.length}
                validation={
                  stepStates[activeStep] || {
                    progress: 0,
                    isValid: false,
                    validationStatus: false,
                  }
                }
              />

              {renderStepContent(courseData[activeStep - 1], activeStep)}

              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep((prev) => prev - 1)}
                >
                  Назад
                </Button>
                <Button
                  disabled={!stepStates[activeStep]?.isValid}
                  onClick={() =>
                    setActiveStep((prev) =>
                      Math.min(prev + 1, stepsConfig.length)
                    )
                  }
                >
                  {activeStep === stepsConfig.length
                    ? "Завершить курс"
                    : "Следующий шаг"}
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>

      {/* Правая панель справки */}
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
        <ScrollArea className="h-full p-4 border-l bg-background">
          <h3 className="font-semibold mb-4">Интерактивная справка</h3>
          <div className="prose prose-sm">
            <div className="p-3 mb-4 bg-muted/10 rounded-lg">
              <h4 className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4" /> Подсказки для текущего шага
              </h4>
              <ul className="space-y-2">
                {stepsConfig[activeStep - 1]?.hints?.map((hint, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {hint}
                  </li>
                ))}
                {(!stepsConfig[activeStep - 1]?.hints ||
                  stepsConfig[activeStep - 1]?.hints.length === 0) && (
                  <li>Подсказки для этого шага отсутствуют</li>
                )}
              </ul>
            </div>

            <div className="p-3 bg-muted/10 rounded-lg">
              <h4 className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4" /> Требования к выполнению
              </h4>
              <ul className="space-y-2">
                {getStepRequirements(activeStep).map((req, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default CourseInterface;
