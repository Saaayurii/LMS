import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React, { useRef } from "react";

const StepTemplate = ({ data, onChange }) => {
  const fileInputRef = useRef(null);

  const handleInputChange = (field) => (e) => {
    onChange({ [field]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Файлы прикреплены:", files);
  };

  const handleNextClick = () => {
    const allFieldsFilled = Object.values(data).every((val) => val && val.trim() !== "");
    if (!allFieldsFilled) {
      toast.warning("Пожалуйста, заполните все поля перед переходом к следующему шагу.");
    } else {
      // Тут можно вызвать nextStep()
      console.log("Все поля заполнены. Можно переходить дальше.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">1. Учебные задачи</h2>
        <textarea
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          rows={4}
          placeholder="Опишите ключевые задачи обучения на этом этапе."
          value={data.objectives || ""}
          onChange={handleInputChange("objectives")}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">2. Поддержка выполнения</h2>
        <textarea
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          rows={4}
          placeholder="Опишите, что вы использовали для выполнения задачи."
          value={data.support || ""}
          onChange={handleInputChange("support")}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">3. Практическая информация</h2>
        <textarea
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          rows={4}
          placeholder="Что нужно знать для выполнения задач?"
          value={data.info || ""}
          onChange={handleInputChange("info")}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">4. Частичная практика</h2>
        <textarea
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          rows={4}
          placeholder="Опишите практику, которая позволила закрепить знания."
          value={data.practice || ""}
          onChange={handleInputChange("practice")}
        />
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">📎 Прикрепите файл (при необходимости)</h2>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        <Button onClick={() => fileInputRef.current.click()}>
          Прикрепить файл
        </Button>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleNextClick}>
          Далее
        </Button>
      </div>
    </div>
  );
};

export default StepTemplate;
