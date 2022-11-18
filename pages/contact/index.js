import Contact from "../../Components/Contact";
import Navbar from "../../Components/nav";
function index({ currentuser }) {
  return (
    <div>
      <Navbar currentuser={currentuser} />
      <Contact />
    </div>
  );
}

export default index;
