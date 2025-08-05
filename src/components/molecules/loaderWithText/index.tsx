import LoaderRadar from "@/components/atoms/loaderRadar";
import "./loaderWithText.css";

type Props = {
  text: string;
};

export default function LoaderWithText({ text }: Props) {
  return (
    <div className="loaderWithTextBox">
      <div className="textOfTheRadar">{text}</div>
      <LoaderRadar />
    </div>
  );
}
