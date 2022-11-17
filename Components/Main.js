import Image from "next/image";
import backwall from "../public/backwall.jpg";
import backwall2 from "../public/backwall2.jpg";
import home from "../public/home.jpeg";

function Main() {
  return (
    <div className="img_container">
      <Image className="homeImg" src={backwall2} alt={"Home"} />
      <div className="home_desc">
        <div className="home-desc-main">
          If you <span>WANT</span> it,
          <br />
          Let &pos; s <span>SHOOT</span>!
        </div>
        <div className="play-btn">
          <a href="#">
            <span data-attr="Play">Play</span>
            <span data-attr="Now">Now</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Main;
