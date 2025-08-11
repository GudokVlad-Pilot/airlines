import CustomButton, {
  CustomButtonProps,
} from "@/components/atoms/customButton";
import CardMedia from "@mui/material/CardMedia";
import "./notFoundLayout.css";

type Props = {
  title: string;
  description: string;
  customButton: CustomButtonProps;
};

export default function NotFoundLayout({
  customButton,
  title,
  description,
}: Props) {
  return (
    <div className="notFoundLayoutBox">
      <CardMedia
        className="notFoundLayoutImage"
        component="img"
        image={"/assets/images/question_fox.png"}
        // title="Not Found Layout Image"
      />
      <div className="notFoundLayoutRightPart">
        <div className="notFoundLayoutTextBox">
          <div className="notFoundLayoutTitle">{title}</div>
          <div className="notFoundLayoutDescription">{description}</div>
        </div>
        <CustomButton {...customButton} />
      </div>
    </div>
  );
}
