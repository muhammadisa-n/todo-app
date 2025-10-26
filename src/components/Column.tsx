import { IColumn, ISelectedTask, ITask } from "@/types/task";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
  column: IColumn;
  tasks: ITask[];
  setSelectedTask: ({ activity, task }: ISelectedTask) => void;
}
const Column = (props: ColumnProps) => {
  const { column, tasks, setSelectedTask } = props;
  const { setNodeRef, over } = useDroppable({
    id: column.id,
  });
  return (
    <div
      className={`flex flex-1 w-80 flex-col rounded-lg bg-neutral-100 p-4 ${
        over?.id === column.id &&
        "bg-neutral-200 outline-2 outline-dashed outline-neutral-400"
      }`}
    >
      <h2 className="mb-4 font-semibold text-neutral-700">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-col flex-1 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            setSelectedTask={setSelectedTask}
          />
        ))}
      </div>
    </div>
  );
};
export default Column;
