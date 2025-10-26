import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  color?: string;
}
const Button = (props: ButtonProps) => {
  const { children, type = "button", onClick, color } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg ${
        color ? color : "bg-blue-500"
      } px-3 py-2 text-white font-semibold`}
    >
      {children}
    </button>
  );
};
export default Button;
