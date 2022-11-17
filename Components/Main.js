import Image from "next/image";
// import backwall from "../public/backwall.jpg";
import backwall from "../public/backwall.png";
import home from "../public/home.jpeg";

function Main() {
  return (
    <div className="img_container">
      <Image className="homeImg" src={backwall} alt={"Home"} />
      <div className="home_desc">
        <div className="home-desc-main">
          If you <span>WANT</span> it,
          <br />
          Let's <span>SHOOT</span>!
        </div>
        <div className="play-btn" target="_blank">
          <a href="https://azulul.itch.io/mirai-shooter">
            <span data-attr="Play">Play</span>
            <span data-attr="Now">Now</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Main;
