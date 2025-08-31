import FoodCardsBox from ".";

export default {
  title: "molecules/FoodCardsBox",
  component: FoodCardsBox,
};

const cards = [
  {
    title: "Dish 1",
    ingredientsText: "Ingredients",
    ingredients: "Bread, sausage, cheese",
    onClick: () => alert("Dish 1"),
  },
  {
    title: "Dish 2",
    ingredientsText: "Ingredients",
    ingredients: "Bread",
    onClick: () => alert("Dish 1"),
  },
  {
    title: "Dish 3",
    ingredientsText: "Ingredients",
    ingredients:
      "Bread, sausage, cheese, Bread, sausage, cheese, Bread, sausage, cheese, Bread, sausage, cheese,Bread, sausage, cheese",
    onClick: () => alert("Dish 1"),
  },
  {
    title: "Dish 4",
    ingredientsText: "Ingredients",
    ingredients: "Bread, sausage, cheese",
    onClick: () => alert("Dish 1"),
  },
  {
    title: "Dish 5",
    ingredientsText: "Ingredients",
    ingredients: "Bread, sausage, cheese",
    onClick: () => alert("Dish 1"),
  },
  {
    title: "Dish 6",
    ingredientsText: "Ingredients",
    ingredients: "Bread, sausage, cheese",
    onClick: () => alert("Dish 1"),
  },
  {
    title: "Dish 7",
    ingredientsText: "Ingredients",
    ingredients: "Bread, sausage, cheese",
    onClick: () => alert("Dish 1"),
  },
];

export const Default = {
  args: {
    title: "Passanger 1",
    foodCards: cards,
  },
};
