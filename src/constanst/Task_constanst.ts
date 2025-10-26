import { IColumn, ITask } from "@/types/task";

const COLUMNS: IColumn[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];
const INITIAL_TASKS: ITask[] = [
  {
    id: "1",
    status: "TODO",
    title: "Design homepage",
    description: "Create wireframes and mockups for the new homepage.",
  },
  {
    id: "2",
    status: "IN_PROGGRESS",
    title: "Develop login feature",
    description: "Implement authentication using OAuth2.",
  },
  {
    id: "3",
    status: "DONE",
    title: "Set up database",
    description: "Install and configure PostgreSQL database.",
  },
];
export { COLUMNS, INITIAL_TASKS };
