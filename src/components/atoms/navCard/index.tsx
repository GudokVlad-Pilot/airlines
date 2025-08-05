// import ImagePlaceholder from "../../../../public/assets/images/placeholder-4-3.png";
import "./navCard.css";
import CardMedia from "@mui/material/CardMedia";

export type NavCardProps = {
  title: string;
  description: string;
  image?: string;
  onClick: () => void;
};

export default function NavCard({
  title,
  description,
  image,
  onClick,
}: NavCardProps) {
  return (
    <div className="cardBox" onClick={onClick}>
      <CardMedia
        className="cardImage"
        component="img"
        image={image || "/assets/images/placeholder-4-3.png"}
        title="Card Image"
      />
      <div className="cardTitle">{title}</div>
      <div className="cardDescription">{description}</div>
    </div>
  );
}
