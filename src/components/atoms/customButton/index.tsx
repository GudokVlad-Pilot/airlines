// import "./customButton.css";

export type CustomButtonProps = {
  title: string;
  icon?: string;
  onClick: () => void;
};

export default function CustomButton({ title, onClick }: CustomButtonProps) {
  return (
    <button className="customButtonBox" onClick={onClick}>
      <div>{title}</div>
    </button>
  );
}
