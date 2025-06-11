import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  Form, FormField, FormItem, FormLabel, 
  FormControl, FormMessage, FormDescription 
} from "@/components/ui/form";
import { 
  Input, Textarea, Select, SelectTrigger, 
  SelectValue, SelectContent, SelectItem 
} from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ChevronDown, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const DynamicForm = ({ 
  schema, 
  initialValues, 
  onSubmit, 
  submitText = "Сохранить",
  layout = 'vertical'
}) => {
  const form = useForm({ defaultValues: initialValues });

  const renderField = (fieldSchema, index) => {
    switch (fieldSchema.type) {
      case 'text':
        return (
          <FormField
            key={fieldSchema.name}
            control={form.control}
            name={fieldSchema.name}
            render={({ field }) => (
              <FormItem className={cn(layout === 'horizontal' && 'grid grid-cols-4 items-center gap-4')}>
                <div className={cn("space-y-1", layout === 'horizontal' && 'col-span-1')}>
                  <FormLabel>{fieldSchema.label}</FormLabel>
                  {fieldSchema.description && (
                    <FormDescription>{fieldSchema.description}</FormDescription>
                  )}
                </div>
                <div className={cn(layout === 'horizontal' ? 'col-span-3' : 'w-full')}>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder={fieldSchema.placeholder}
                      type={fieldSchema.inputType || 'text'}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        );

      case 'array':
        return (
          <FormField
            key={fieldSchema.name}
            control={form.control}
            name={fieldSchema.name}
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>{fieldSchema.label}</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => field.onChange([...field.value, fieldSchema.defaultItem || ''])}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить элемент
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-48 border rounded-lg p-2">
                    {field.value?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2 group">
                        <FormControl>
                          <Input
                            value={item}
                            onChange={(e) => {
                              const newArray = [...field.value];
                              newArray[index] = e.target.value;
                              field.onChange(newArray);
                            }}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => field.onChange(field.value.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </ScrollArea>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        );

      case 'select':
        return (
          <FormField
            key={fieldSchema.name}
            control={form.control}
            name={fieldSchema.name}
            render={({ field }) => (
              <FormItem className={cn(layout === 'horizontal' && 'grid grid-cols-4 items-center gap-4')}>
                <div className={cn("space-y-1", layout === 'horizontal' && 'col-span-1')}>
                  <FormLabel>{fieldSchema.label}</FormLabel>
                  {fieldSchema.description && (
                    <FormDescription>{fieldSchema.description}</FormDescription>
                  )}
                </div>
                <div className={cn(layout === 'horizontal' ? 'col-span-3' : 'w-full')}>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={fieldSchema.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fieldSchema.options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        );

      case 'complex':
        return (
          <div key={fieldSchema.name} className="space-y-4 border p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <fieldSchema.icon className="h-5 w-5" />
              <h4 className="font-medium">{fieldSchema.label}</h4>
            </div>
            
            {fieldSchema.fields.map((nestedField, index) => (
              <div key={nestedField.name} className="pl-6">
                {renderField(nestedField, index)}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6"
      >
        <div className="space-y-4">
          {schema.map((field, index) => renderField(field, index))}
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="gap-2">
            {form.formState.isSubmitSuccessful && (
              <CheckCircle className="h-4 w-4" />
            )}
            {submitText}
          </Button>
          
          <Button 
            type="button" 
            variant="secondary"
            onClick={() => form.reset()}
          >
            Сбросить
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DynamicForm;