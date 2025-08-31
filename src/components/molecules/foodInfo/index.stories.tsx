import { useState } from "react";
import FoodInfo from ".";
import { FoodCardsBoxProps } from "../foodCardsBox";
import { FoodCardProps } from "@/components/atoms/foodCard";

export default {
  title: "molecules/FoodInfo",
  component: FoodInfo,
};

const sampleFoodCards: FoodCardProps[] = [
  {
    title: "Chicken Salad",
    image: "/assets/images/placeholder-4-3.png",
    ingredientsText: "Ingredients",
    ingredients: "Chicken, Lettuce, Tomato",
    isSelected: false,
  },
  {
    title: "Vegan Bowl",
    image: "/assets/images/placeholder-4-3.png",
    ingredientsText: "Ingredients",
    ingredients: "Quinoa, Beans, Avocado",
    isSelected: false,
  },
  {
    title: "Pasta Carbonara",
    image: "/assets/images/placeholder-4-3.png",
    ingredientsText: "Ingredients",
    ingredients: "Pasta, Bacon, Cheese",
    isSelected: false,
  },
  {
    title: "Chicken Salad",
    image: "/assets/images/placeholder-4-3.png",
    ingredientsText: "Ingredients",
    ingredients: "Chicken, Lettuce, Tomato",
    isSelected: false,
  },
  {
    title: "Vegan Bowl",
    image: "/assets/images/placeholder-4-3.png",
    ingredientsText: "Ingredients",
    ingredients: "Quinoa, Beans, Avocado",
    isSelected: false,
  },
  {
    title: "Pasta Carbonara",
    image: "/assets/images/placeholder-4-3.png",
    ingredientsText: "Ingredients",
    ingredients: "Pasta, Bacon, Cheese",
    isSelected: false,
  },
];

const sampleFoodCardsBoxes: FoodCardsBoxProps[] = [
  {
    title: "Passenger 1",
    foodCards: sampleFoodCards,
  },
  {
    title: "Passenger 2",
    foodCards: sampleFoodCards,
  },
];

export const OnlyOneSelectable = {
  render: (args: any) => {
    const [isOpened, setIsOpened] = useState(false);
    const [foodBoxes, setFoodBoxes] = useState(sampleFoodCardsBoxes);

    const handleCardClick = (boxIndex: number, cardIndex: number) => {
      const updatedBoxes = [...foodBoxes];
      updatedBoxes[boxIndex].foodCards = updatedBoxes[boxIndex].foodCards.map(
        (card, idx) => ({
          ...card,
          isSelected: idx === cardIndex, // only the clicked card is selected
        })
      );
      setFoodBoxes(updatedBoxes);
    };

    return (
      <FoodInfo
        {...args}
        isOpened={isOpened}
        onClick={() => setIsOpened((prev) => !prev)}
        foodCardsBoxes={foodBoxes.map((box, boxIndex) => ({
          ...box,
          foodCards: box.foodCards.map((card, cardIndex) => ({
            ...card,
            onClick: () => handleCardClick(boxIndex, cardIndex),
          })),
        }))}
      />
    );
  },
  args: {
    title: "Food on Board",
    continueWithoutMealText: "Continue without a meal",
    nextButtonText: "Next",
    isNextDisabled: false,
  },
};
