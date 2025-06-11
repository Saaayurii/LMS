import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  Clock,
  Zap,
  BookOpen,
  Target,
  CheckCircle2,
} from "lucide-react";
import { Step1 } from "./Step1.jsx";
import { Step2 } from "./Step2.jsx";
import { Step3 } from "./Step3.jsx";
import { Step4 } from "./Step4.jsx";
import { Step5 } from "./Step5.jsx";
import { Step6 } from "./Step6.jsx";
import { Step7 } from "./Step7.jsx";
import { Step8 } from "./Step8.jsx";
import { Step9 } from "./Step9.jsx";
import { Step10 } from "./Step10.jsx";
import CoursePreview from "./CoursePreview.jsx";
import CourseInterface from "./CourseInterface.jsx";

// Основной компонент LMS
const LMS = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [showCoursePreview, setShowCoursePreview] = useState(false);

  const steps = [
    {
      title: "Сбор учебных задач",
      component: Step1,
      icon: Target,
      category: "Учебные задачи",
      description: "Определите аутентичные задачи для обучения",
    },
    {
      title: "Определение критериев оценки",
      component: Step2,
      icon: CheckCircle2,
      category: "Учебные задачи",
      description: "Установите критерии оценки выполнения",
    },
    {
      title: "Создание последовательности задач",
      component: Step3,
      icon: Brain,
      category: "Учебные задачи",
      description: "Организуйте задачи в логической последовательности",
    },
    {
      title: "Структурирование вспомогательной информации",
      component: Step4,
      icon: BookOpen,
      category: "Вспомогательная информация",
      description: "Создайте материалы поддержки",
    },
    {
      title: "Анализ когнитивных стратегий",
      component: Step5,
      icon: Brain,
      category: "Вспомогательная информация",
      description: "Определите необходимые мыслительные стратегии",
    },
    {
      title: "Анализ ментальных моделей",
      component: Step6,
      icon: Brain,
      category: "Вспомогательная информация",
      description: "Проанализируйте ментальные модели",
    },
    {
      title: "Проектирование своевременной информации",
      component: Step7,
      icon: Clock,
      category: "Своевременная информация",
      description: "Спроектируйте информацию точно в момент необходимости",
    },
    {
      title: "Анализ когнитивных правил",
      component: Step8,
      icon: Zap,
      category: "Своевременная информация",
      description: "Определите когнитивные правила и процедуры",
    },
    {
      title: "Анализ предварительных знаний",
      component: Step9,
      icon: BookOpen,
      category: "Своевременная информация",
      description: "Проанализируйте требуемые предварительные знания",
    },
    {
      title: "Разработка частичной практики",
      component: Step10,
      icon: Target,
      category: "Частичная практика",
      description: "Создайте упражнения для отработки навыков",
    },
  ];

  const StepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepChange = (data) => {
    setFormData({
      ...formData,
      [currentStep]: { ...formData[currentStep], ...data },
    });
  };

  const validateCurrentStep = () => {
    const currentData = formData[currentStep];
    if (!currentData) return false;

    // Базовая валидация для каждого шага
    switch (currentStep) {
      case 0:
        return currentData.tasks && currentData.tasks.length > 0;
      case 1:
        return currentData.criteria && currentData.criteria.length > 0;
      case 2:
        return currentData.sequence && currentData.sequence.length > 0;
      default:
        return true;
    }
  };

  const isStepComplete = (stepIndex) => {
    return completedSteps.has(stepIndex);
  };

  return (
   <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Заголовок и введение */}
        <div className="bg-white dark:bg-gray-800 border-b">
          <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">
              Мастер проектирования курса по методологии 4C/ID
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Пройдите все 10 обязательных шагов для создания эффективного
              учебного курса
            </p>
  
            {/* Прогресс-бар */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Прогресс: Шаг {currentStep + 1} из {steps.length}
                </span>
                <span>{Math.round(progress)}% завершено</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
  
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Боковая панель навигации */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg">Навигация по шагам</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isComplete = isStepComplete(index);
                    const isAccessible = index <= currentStep || isComplete;
  
                    return (
                      <button
                        key={index}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          isActive
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : isComplete
                            ? "bg-green-50 border-green-200 text-green-700"
                            : isAccessible
                            ? "hover:bg-gray-50 border-gray-200"
                            : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                        onClick={() => isAccessible && setCurrentStep(index)}
                        disabled={!isAccessible}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4" />
                          <span className="text-xs font-medium">
                            {step.category}
                          </span>
                        </div>
                        <div className="text-sm font-medium">
                          {index + 1}. {step.title}
                        </div>
                        {isComplete && (
                          <div className="flex items-center gap-1 mt-1">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-600">
                              Завершено
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
  
            {/* Основной контент */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      {React.createElement(steps[currentStep].icon, {
                        className: "h-6 w-6 text-blue-600",
                      })}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        {steps[currentStep].title}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {steps[currentStep].description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <StepComponent
                    data={formData[currentStep] || {}}
                    onChange={handleStepChange}
                  />
                </CardContent>
              </Card>
  
              {/* Навигационные кнопки */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Назад
                </Button>
  
                <div className="flex gap-2">
                  {currentStep === steps.length - 1 ? (
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        if (validateCurrentStep()) {
                          setCompletedSteps(
                            (prev) => new Set([...prev, currentStep])
                          );
                          setShowCoursePreview(true);
                          alert(
                            "Поздравляем! Вы успешно завершили создание курса по методологии 4C/ID!"
                          );
                        }
                      }}
                      disabled={!validateCurrentStep()}
                    >
                      Завершить курс
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!validateCurrentStep()}
                    >
                      Далее
                    </Button>
                  )}
                </div>
              </div>
  
             
  
              {/* Индикатор валидации */}
              {!validateCurrentStep() && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Заполните все обязательные поля для продолжения
                  </p>
                </div>
              )}
  
              {showCoursePreview && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-auto">
                  <div className="max-w-6xl mx-auto p-6">
                    <CoursePreview
                      formData={formData}
                      steps={steps}
                      onExport={(type) => {
                        if (type === "pdf") {
                          // Логика экспорта PDF
                        } else {
                          setShowCoursePreview(false);
                        }
                      }}
                    />
                    <Button
                      className="mt-4"
                      onClick={() => setShowCoursePreview(false)}
                    >
                      Вернуться к редактированию
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
       <CourseInterface courseData={formData} />
   </>
  );
};

export default LMS;
