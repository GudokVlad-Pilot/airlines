import CardMedia from "@mui/material/CardMedia";
import { IoIosCheckmarkCircle } from "react-icons/io";
import "./extrasCard.css";

export type ExtrasCardProps = {
  isStatic?: boolean;
  isSelected?: boolean;
  title: string;
  image?: string;
  description: string;
  price: string;
  onClick?: () => void;
};

export default function ExtrasCard({
  isStatic,
  isSelected,
  title,
  image,
  description,
  price,
  onClick,
}: ExtrasCardProps) {
  return (
    <div
      className={`extrasCardBox ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      style={{ cursor: isStatic ? "default" : "pointer" }}
    >
      <div className="extrasCardImageBox">
        <CardMedia
          className="extrasCardImage"
          component="img"
          image={image || "/assets/images/placeholder-4-3.png"}
        />
        {isSelected && (
          <IoIosCheckmarkCircle className="extrasCardCheckmark" size={60} />
        )}
      </div>
      <div className="extrasCardText">
        <div className="extrasCardTitle">{title}</div>
        <div className="extrasCardDescription">{description}</div>
        <div className="extrasCardPrice">{price}</div>
      </div>
    </div>
  );
}
