import Image from "next/image";
import ImagePlaceholder from "../../../../public/assets/images/placeholder-4-3.png";
import "./navCard.css";

type Props = {
  title: string;
  description: string;
  image?: string;
  onClick: () => void;
};

export default function NavCard({ title, description, image, onClick }: Props) {
  return (
    <div className="cardBox" onClick={onClick}>
      <Image
        className="cardImage"
        src={image || ImagePlaceholder}
        alt={"Card Image"}
      />
      <div className="cardTitle">{title}</div>
      <div className="cardDescription">{description}</div>
    </div>
  );
}
