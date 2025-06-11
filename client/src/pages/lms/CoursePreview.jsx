"use client";

import React, { useMemo, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, ListChecks } from "lucide-react";
import CourseInterface from "./CourseInterface";

const CoursePreview = ({ formData = {}, steps = [], onExport }) => {
  const [activeView, setActiveView] = useState("overview");

  const safeFormData = useMemo(() =>
    Array.isArray(formData)
      ? formData
      : Object.keys(formData)
          .sort((a, b) => a - b)
          .map((k) => formData[k]), [formData]);

  const analyzeComponent = (steps, weights) => {
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    return steps.reduce(
      (acc, curr, idx) => ({
        value: acc.value + (curr ? weights[idx] : 0),
        issues: [...acc.issues, ...(!curr ? [`Отсутствует шаг ${idx + 1}`] : [])],
        strengths: [...acc.strengths, ...(curr ? [`Заполнен шаг ${idx + 1}`] : [])],
      }),
      { value: 0, issues: [], strengths: [] }
    );
  };

  const analysis = useMemo(() => ({
    completeness: Math.round((safeFormData.filter(Boolean).length / 10) * 100),
    components: {
      learningTasks: analyzeComponent(safeFormData.slice(0, 3), [30, 25, 20]),
      supportiveInfo: analyzeComponent(safeFormData.slice(3, 6), [40, 30, 30]),
      timelyInfo: analyzeComponent(safeFormData.slice(6, 9), [40, 30, 30]),
      practice: analyzeComponent([safeFormData[9]], [100]),
    },
  }), [safeFormData]);

  const SectionCard = ({ title, score }) => (
    <div className="flex justify-between items-center rounded-lg border px-5 py-4 bg-white shadow-sm">
      <div className="text-lg font-medium">{title}</div>
      <Badge
        variant="outline"
        className={`text-sm font-semibold px-3 py-1 rounded-full ${
          score >= 80
            ? "text-green-700 border-green-500"
            : score >= 60
            ? "text-yellow-700 border-yellow-500"
            : "text-red-700 border-red-500"
        }`}
      >
        {score}%
      </Badge>
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-8 p-6 bg-muted min-h-screen">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Eye className="h-6 w-6 text-blue-600" />
              Превью курса
            </h1>
            
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onExport?.("pdf")}>
              <Download className="w-4 h-4 mr-2" />
              Экспорт в PDF
            </Button>
          </div>
        </div>
  
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-background border rounded-lg p-1">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="analysis">Анализ</TabsTrigger>
            <TabsTrigger value="content">Контент</TabsTrigger>
            <TabsTrigger value="export">Экспорт</TabsTrigger>
          </TabsList>
  
          <TabsContent value="overview">
            <div className="grid gap-4">
              <SectionCard title="Учебные задачи" score={analysis.components.learningTasks.value} />
              <SectionCard title="Вспомогательная информация" score={analysis.components.supportiveInfo.value} />
              <SectionCard title="Своевременная информация" score={analysis.components.timelyInfo.value} />
              <SectionCard title="Практика" score={analysis.components.practice.value} />
            </div>
          </TabsContent>
  
          <TabsContent value="content">
            <div className="grid gap-4">
              {safeFormData.map((step, index) => (
                <Card key={index} className="bg-white shadow-sm border">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">
                      <ListChecks className="inline w-4 h-4 mr-2 text-blue-600" />
                      Шаг {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {step ? JSON.stringify(step, null, 2) : "Пустой шаг"}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
  
      
  
    </>
  );
};

export default CoursePreview;
