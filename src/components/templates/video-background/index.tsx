// import BgVideo from "../../assets/videos/clouds.mp4";
import "./videoBackground.css";

export default function VideoBackground() {
  return (
    <video autoPlay loop muted className="bg-vid">
      {"Your browser does not support the video tag."}
      <source src="assets/videos/clouds.mp4" type="video/mp4" />{" "}
    </video>
  );
}
