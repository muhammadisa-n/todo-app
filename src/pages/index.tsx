import Button from "@/components/Button";
import Column from "@/components/Column";
import ModalConfirm from "@/components/ModalConfirm";
import ModalTask from "@/components/ModalTask";
import { COLUMNS, INITIAL_TASKS } from "@/constanst/Task_constanst";
import { ITask } from "@/types/task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { FormEvent, useEffect, useState } from "react";
const App = () => {
  const [tasks, setTasks] = useState<ITask[]>([...INITIAL_TASKS]);
  const [showModalAddTask, setShowModalAddTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{
    activity: string;
    task: ITask;
  } | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const taskId = active.id as string;
    const newStatus = over ? (over.id as ITask["status"]) : null;
    if (newStatus) {
      setTasks(() =>
        tasks.map((prevTask) =>
          prevTask.id === taskId
            ? {
                ...prevTask,
                status: newStatus,
              }
            : prevTask
        )
      );
    }
  };

  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTask: ITask = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: "TODO",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    event.currentTarget.reset();
    setShowModalAddTask(false);
  };

  const handleUpdateTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedTask: ITask = {
      id: selectedTask?.task?.id as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: selectedTask?.task?.status as ITask["status"],
    };
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    event.currentTarget.reset();
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    setTasks((prevTask) =>
      prevTask.filter((task) => task.id !== selectedTask?.task?.id)
    );
    setSelectedTask(null);
  };

  return (
    <main className="p-4 min-h-screen flex flex-col overflow-hidden">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-500">Todo List App</h1>
        <Button onClick={() => setShowModalAddTask(true)}>Add Task</Button>
      </div>
      <div className="flex gap-8 flex-1">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              setSelectedTask={setSelectedTask}
            />
          ))}
        </DndContext>
      </div>
      {showModalAddTask && (
        <ModalTask
          onCancel={() => setShowModalAddTask(false)}
          onSubmit={handleAddTask}
        />
      )}
      {selectedTask?.activity === "update" && (
        <ModalTask
          onCancel={() => setSelectedTask(null)}
          onSubmit={handleUpdateTask}
          type="Update"
          selectedTask={selectedTask.task}
        />
      )}
      {selectedTask?.activity === "delete" && (
        <ModalConfirm
          onCancel={() => setSelectedTask(null)}
          onConfirm={handleDeleteTask}
          message="Are you sure you want to delete this task? This action cannot be undone."
          title="Delete Task"
          type="Delete"
        />
      )}
    </main>
  );
};

export default App;
