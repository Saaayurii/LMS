import React, { useState } from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Folder,
  FileText,
  ChevronRight,
  ChevronDown,
  GripVertical,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const CourseStructureTree = ({ data, onSelect }) => {
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [selectedItem, setSelectedItem] = useState(null);
  const [dragItem, setDragItem] = useState(null);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      newSet.has(moduleId) ? newSet.delete(moduleId) : newSet.add(moduleId);
      return newSet;
    });
  };

  const handleSelect = (item) => {
    setSelectedItem(item.id);
    onSelect?.(item);
  };

  const handleDragStart = (e, item) => {
    setDragItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    if (!dragItem || dragItem.id === target.id) return;

    // Логика перемещения элементов
    console.log(`Move ${dragItem.id} to ${target.id}`);
  };

  const renderTree = (items) => (
    <div className="space-y-1">
      {items.modules.map((module) => (
        <div key={module.id} className="space-y-1">
          <Collapsible open={expandedModules.has(module.id)}>
            <div className="flex items-center gap-1 group">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => toggleModule(module.id)}
                >
                  {expandedModules.has(module.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>

              <div
                className={cn(
                  "flex items-center flex-1 p-2 rounded hover:bg-accent cursor-pointer",
                  selectedItem === module.id && "bg-accent"
                )}
                onClick={() => handleSelect(module)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, module)}
              >
                <GripVertical 
                  className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100"
                  draggable
                  onDragStart={(e) => handleDragStart(e, module)}
                />
                <Folder className="h-4 w-4 mr-2 text-yellow-500" />
                <span className="text-sm">{module.title}</span>
              </div>
            </div>

            <CollapsibleContent className="ml-6">
              {module.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={cn(
                    "flex items-center p-2 ml-6 rounded hover:bg-accent cursor-pointer",
                    selectedItem === lesson.id && "bg-accent"
                  )}
                  onClick={() => handleSelect(lesson)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lesson)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, lesson)}
                >
                  <GripVertical className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100" />
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">{lesson.title}</span>
                </div>
              ))}

              <Button
                variant="ghost"
                size="sm"
                className="ml-6 text-muted-foreground"
                onClick={() => console.log('Add new lesson')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить урок
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );

  return (
    <ScrollArea className="h-[calc(100vh-180px)]">
      {renderTree(data)}
    </ScrollArea>
  );
};

export default CourseStructureTree;