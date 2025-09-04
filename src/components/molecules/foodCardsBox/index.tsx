import FoodCard, { FoodCardProps } from "@/components/atoms/foodCard";
import "./foodCardsBox.css";

export type FoodCardsBoxProps = {
  foodCards: FoodCardProps[];
  title: string;
};

export default function FoodCardsBox({ foodCards, title }: FoodCardsBoxProps) {
  return (
    <div className="foodCardsBoxBox">
      <div className="foodCardsBoxTitle">{title}</div>
      <div className="foodCardsContainer">
        {foodCards.map((card, index) => (
          <FoodCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
