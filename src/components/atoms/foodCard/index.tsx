import CardMedia from "@mui/material/CardMedia";
import { IoIosCheckmarkCircle } from "react-icons/io";
import "./foodCard.css";

export type FoodCardProps = {
  isStatic?: boolean;
  isSelected?: boolean;
  title: string;
  image?: string;
  categories?: string;
  ingredientsText: string;
  ingredients: string;
  onClick?: () => void;
};

export default function FoodCard({
  isStatic,
  isSelected,
  title,
  image,
  categories,
  ingredientsText,
  ingredients,
  onClick,
}: FoodCardProps) {
  return (
    <div
      className={`foodCardBox ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      style={{ cursor: isStatic ? "default" : "pointer" }}
    >
      <div className="foodCardImageBox">
        <CardMedia
          className="foodCardImage"
          component="img"
          image={image || "/assets/images/placeholder-4-3.png"}
        />
        {isSelected && (
          <IoIosCheckmarkCircle className="foodCardCheckmark" size={60} />
        )}
      </div>
      <div className="foodCardText">
        {/* <div className="foodCardAllergies">{categories}</div> */}
        <div className="foodCardTitle">{title}</div>
        <div className="foodCardIngredients">
          {ingredientsText}: {ingredients}
        </div>
      </div>
    </div>
  );
}
