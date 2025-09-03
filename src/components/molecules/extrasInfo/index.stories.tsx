import { useState } from "react";
import { ExtrasCardProps } from "@/components/atoms/extrasCard";
import { ExtrasCardsBoxProps } from "../extrasCardsBox";
import ExtrasInfo from ".";

export default {
  title: "molecules/ExtrasInfo",
  component: ExtrasInfo,
};

const sampleExtrasCards: ExtrasCardProps[] = [
  {
    title: "Loungue",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend turpis molestie nunc elementum, eu ullamcorper sem dapibus. Integer tristique enim nec risus vehicula, finibus porta nisl finibus.",
    price: "+50$",
    onClick: () => console.log("I am Example"),
    isSelected: false,
  },
  {
    title: "Transfer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend turpis molestie nunc elementum, eu ullamcorper sem dapibus. Integer tristique enim nec risus vehicula, finibus porta nisl finibus.",
    price: "+60$",
    onClick: () => console.log("I am Example"),
    isSelected: false,
  },
  {
    title: "Accomodation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend turpis molestie nunc elementum, eu ullamcorper sem dapibus. Integer tristique enim nec risus vehicula, finibus porta nisl finibus.",
    price: "+200$",
    onClick: () => console.log("I am Example"),
    isSelected: false,
  },
];

const sampleExtrasCardsBoxes: ExtrasCardsBoxProps[] = [
  {
    title: "Passenger 1",
    extrasCards: sampleExtrasCards,
  },
  {
    title: "Passenger 2",
    extrasCards: sampleExtrasCards,
  },
];

export const MultipleSelectable = {
  render: (args: any) => {
    const [isOpened, setIsOpened] = useState(false);
    const [extrasBoxes, setExtrasBoxes] = useState(sampleExtrasCardsBoxes);

    const handleCardClick = (boxIndex: number, cardIndex: number) => {
      const updatedBoxes = [...extrasBoxes];
      updatedBoxes[boxIndex] = {
        ...updatedBoxes[boxIndex],
        extrasCards: updatedBoxes[boxIndex].extrasCards.map((card, idx) =>
          idx === cardIndex
            ? { ...card, isSelected: !card.isSelected } // toggle selection
            : card
        ),
      };
      setExtrasBoxes(updatedBoxes);
    };

    return (
      <ExtrasInfo
        {...args}
        isOpened={isOpened}
        onClick={() => setIsOpened((prev) => !prev)}
        extrasCardsBoxes={extrasBoxes.map((box, boxIndex) => ({
          ...box,
          extrasCards: box.extrasCards.map((card, cardIndex) => ({
            ...card,
            onClick: () => handleCardClick(boxIndex, cardIndex),
          })),
        }))}
      />
    );
  },
  args: {
    title: "Extras",
    continueWithoutMealText: "Continue without extras",
    nextButtonText: "Next",
    isNextDisabled: false,
  },
};
