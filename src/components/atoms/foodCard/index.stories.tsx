import FoodCard from ".";

export default {
  title: "atoms/FoodCard",
  component: FoodCard,
};

export const Default = {
  args: {
    title: "Dish 1",
    ingredientsText: "Ingredients",
    ingredients: "Bread, sausage, cheese",
    onClick: () => console.log("I am Example"),
  },
};

export const Dish2 = {
  args: {
    title: "Dish 2",
    ingredientsText: "Ingredients",
    ingredients: "Bread, cheese",
    onClick: () => console.log("I am Example"),
  },
};

export const Dish3 = {
  args: {
    title: "Dish 3",
    ingredients: "Bread, salt",
    ingredientsText: "Ingredients",
    onClick: () => console.log("I am Example"),
  },
};

export const Dish4 = {
  args: {
    title: "Dish 4",
    ingredients:
      "Bread, salt, Bread, sausage, cheese, Bread, sausage, cheese, Bread, sausage, cheese, Bread, sausage, cheese",
    ingredientsText: "Ingredients",
    onClick: () => console.log("I am Example"),
  },
};

export const Selected = {
  args: {
    isSelected: true,
    title: "Dish 1",
    ingredientsText: "Ingredients",
    ingredients: "Bread, sausage, cheese",
    onClick: () => console.log("I am Example"),
  },
};
