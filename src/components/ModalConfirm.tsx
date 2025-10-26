import Button from "./Button";

interface ModalConfirmProps {
  onCancel: () => void;
  onConfirm: () => void;
  type?: "Confirm" | "Delete";
  message: string;
  title: string;
}
const ModalConfirm = (props: ModalConfirmProps) => {
  const { onCancel, onConfirm, type = "Confirm", message, title } = props;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 ">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-bold text-neutral-700 mb-4">{title}</h2>
        <div className="gap-4 flex flex-col">
          <p className="text-neutral-700">{message}</p>
          <div className="flex w-full items-center justify-end gap-2 cursor-pointer">
            <Button color={"bg-neutral-700"} onClick={onCancel}>
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              color={`${type === "Delete" ? "bg-red-500" : ""}`}
            >
              {type}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalConfirm;
