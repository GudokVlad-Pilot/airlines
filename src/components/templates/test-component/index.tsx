import "./testcomponent.css";

type Props = {
  text: string;
};

export default function TestComponent({ text }: Props) {
  return <div className="testbox">{text}</div>;
}
