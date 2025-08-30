import "./bottomBar.css";
import { colors } from "../../styles/colors";

type Props = {
  copyright: string;
  createdby: string;
  backgroundColor?: string;
  basicColor?: string;
};

export default function BottomBar({
  copyright,
  createdby,
  backgroundColor,
  basicColor,
}: Props) {
  return (
    <div
      className="bottomBarBox"
      style={{ backgroundColor: backgroundColor || colors.primary }}
    >
      <div
        className="copyrightText"
        style={{ color: basicColor || colors.basic }}
      >
        {copyright}
      </div>

      <div
        className="createdByBox"
        style={{ color: basicColor || colors.basic }}
      >
        <div
          className="createdByText"
          style={{ color: basicColor || colors.basic }}
        >
          {createdby}&nbsp;
        </div>
        <div className="linkVladandCharlie">
          <a
            href="https://gudokvlad.com/"
            target="blank"
            rel="noopener noreferrer"
          >
            GudokVlad
          </a>
        </div>
        <div
          className="createdByText"
          style={{ color: basicColor || colors.basic }}
        >
          &nbsp;&&nbsp;
        </div>
        <div className="linkVladandCharlie">
          <a
            href="https://www.instagram.com/charlieandarchitecture"
            target="blank"
            rel="noopener noreferrer"
          >
            Charlie
          </a>
        </div>
      </div>
    </div>
  );
}
