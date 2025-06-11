import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  // Обработка успешных мутаций
  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess, markCompleteData, markInCompleteData, refetch]);

  // Инициализация текущей лекции при загрузке данных
  useEffect(() => {
    if (data?.data?.courseDetails?.lectures?.length > 0 && !currentLecture) {
      setCurrentLecture(data.data.courseDetails.lectures[0]);
    }
  }, [data, currentLecture]);

  // Отладочная информация для поиска проблемы
  useEffect(() => {
    if (data?.data?.courseDetails?.lectures) {
      console.log("Все лекции:", data.data.courseDetails.lectures);
      data.data.courseDetails.lectures.forEach(lecture => {
        console.log(`Лекция ${lecture.lectureTitle}, URL: ${lecture.videoUrl}`);
      });
    }
    
    if (currentLecture) {
      console.log("Текущая лекция:", currentLecture);
      console.log("Текущий URL видео:", currentLecture.videoUrl);
    }
  }, [data, currentLecture]);

  if (isLoading) return <p>Загрузка ...</p>;
  if (isError) return <p>Не удалось загрузить детали курса</p>;
  if (!data?.data) return <p>Данные курса не найдены</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  // Проверяем, есть ли лекции в курсе
  if (!courseDetails.lectures || courseDetails.lectures.length === 0) {
    return <p>Этот курс не содержит лекций</p>;
  }

  // Определяем активную лекцию
  const activeLecture = currentLecture || courseDetails.lectures[0];
  
  // Убеждаемся, что URL видео существует, используя запасной вариант
  // Добавляем проверку и устанавливаем значение по умолчанию
  const videoUrl = activeLecture.videoUrl || "https://samplelib.com/lib/preview/mp4/sample-5s.mp4";
  console.log("Финальный URL для видео:", videoUrl);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    try {
      await updateLectureProgress({ courseId, lectureId });
      refetch();
    } catch (error) {
      console.error("Не удалось обновить прогресс лекции:", error);
      toast.error("Не удалось обновить прогресс");
    }
  };

  const handleSelectLecture = (lecture) => {
    console.log("Выбрана лекция:", lecture);
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };
  
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  // Проверка наличия URL для видео перед рендерингом
  const shouldRenderVideo = Boolean(videoUrl);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Отображение названия курса */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Завершенный</span>
            </div>
          ) : (
            "Отметить как завершен"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Секция видео */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            {shouldRenderVideo ? (
              <video
                key={videoUrl} // Добавляем ключ для принудительного перерендеринга при изменении URL
                src={videoUrl}
                controls
                className="w-full h-auto md:rounded-lg"
                onPlay={() => handleLectureProgress(activeLecture._id)}
              />
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                <p className="text-gray-500">Видео не доступно</p>
              </div>
            )}
          </div>
          {/* Отображение заголовка текущей лекции */}
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Лекция ${
                courseDetails.lectures.findIndex(
                  (lec) => lec._id === activeLecture._id
                ) + 1
              }: ${activeLecture.lectureTitle}`}
            </h3>
          </div>
        </div>
        {/* Боковая панель с лекциями */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Курс лекция</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === activeLecture._id
                    ? "bg-gray-200 dark:bg-gray-800"
                    : ""
                } `}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Завершенный
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;