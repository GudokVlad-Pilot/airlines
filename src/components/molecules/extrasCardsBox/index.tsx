import ExtrasCard, { ExtrasCardProps } from "@/components/atoms/extrasCard";
import "./extrasCardsBox.css";

export type ExtrasCardsBoxProps = {
  extrasCards: ExtrasCardProps[];
  title: string;
};

export default function ExtrasCardsBox({
  extrasCards,
  title,
}: ExtrasCardsBoxProps) {
  return (
    <div className="extrasCardsBoxBox">
      <div className="extrasCardsBoxTitle">{title}</div>
      <div className="extrasCardsContainer">
        {extrasCards.map((card, index) => (
          <ExtrasCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
