import NavCard, { NavCardProps } from "@/components/atoms/navCard";
import "./navCardsRow.css";

type Props = {
  navCards: NavCardProps[];
};

export default function NavCardsRow({ navCards }: Props) {
  if (!navCards || navCards.length === 0) return null;

  return (
    <div className="cardsRowBox">
      {navCards.map((navCard, index) => (
        <NavCard
          key={index}
          title={navCard.title}
          description={navCard.description}
          image={navCard.image}
          onClick={navCard.onClick}
        />
      ))}
    </div>
  );
}
