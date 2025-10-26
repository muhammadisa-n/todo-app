import { FormEvent } from "react";
import Button from "./Button";
import { ITask } from "@/types/task";

interface ModalTaskProps {
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  type?: "Add" | "Update";
  selectedTask?: ITask;
}
const ModalTask = (props: ModalTaskProps) => {
  const { onCancel, onSubmit, type = "Add", selectedTask } = props;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 ">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-bold text-neutral-700 mb-4">{type} Task</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <label htmlFor="title" className="flex flex-col gap-1">
            <span className="font-semibold text-neutral-600">Title</span>
            <input
              type="text"
              placeholder="Insert Task Title..."
              className="rounded-lg border border-neutral-300 p-2 "
              name="title"
              required
              id="title"
              defaultValue={selectedTask?.title}
            />
          </label>
          <label htmlFor="description" className="flex flex-col gap-1">
            <span className="font-semibold text-neutral-600">Description</span>
            <textarea
              placeholder="Insert Task Description..."
              className="rounded-lg border border-neutral-300 p-2 "
              name="description"
              required
              id="description"
              defaultValue={selectedTask?.description}
            />
          </label>
          <div className="flex w-full items-center justify-end gap-2 cursor-pointer">
            <Button color={"bg-neutral-700"} onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{type} Task</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ModalTask;
