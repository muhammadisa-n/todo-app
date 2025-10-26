"use client";

import Button from "@/components/Button";
import Column from "@/components/Column";
import { COLUMNS, INITIAL_TASKS } from "@/constanst/Task_constanst";
import { ITask } from "@/types/task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
const Test = () => {
  const [tasks, setTasks] = useState<ITask[]>([...INITIAL_TASKS]);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const taskId = active.id as string;
    const newStatus = over ? (over.id as ITask["status"]) : null;
    if (newStatus) {
      setTasks(() =>
        tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: newStatus,
              }
            : task
        )
      );
    }
  };
  return (
    <main className="p-4 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-500">Todo List App</h1>
        <Button>Add Task</Button>
      </div>
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </DndContext>
      </div>
    </main>
  );
};

export default Test;
