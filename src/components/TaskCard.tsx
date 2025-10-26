import { ISelectedTask, ITask } from "@/types/task";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

interface TaskCardProps {
  task: ITask;
  setSelectedTask: ({ activity, task }: ISelectedTask) => void;
}
const TaskCard = (props: TaskCardProps) => {
  const { task, setSelectedTask } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="flex justify-between bg-neutral-50 rounded-lg shadow-sm p-4 cursor-grab hover:shadow-md "
      style={style}
    >
      <div>
        <h3 className="font-medium text-neutral-700">{task.title}</h3>
        <p className="text-neutral-500 mt-2 text-sm">{task.description}</p>
      </div>
      <div
        className="cursor-pointer relative text-neutral-500"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <HiDotsHorizontal />
        <div
          className={`absolute right-0 top-0 p-2 w-48 rounded-lg bg-white shadow-md transition-all duration-200 ${
            showDropdown ? "flex flex-col" : "hidden"
          }`}
        >
          <div
            className="cursor-pointer hover:bg-neutral-100 rounded-md p-2"
            onMouseDown={() => setSelectedTask({ activity: "update", task })}
          >
            Update
          </div>
          <div
            className="cursor-pointer hover:bg-neutral-100 rounded-md p-2 text-red-500"
            onMouseDown={() => setSelectedTask({ activity: "delete", task })}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskCard;
