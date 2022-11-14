import CardDetails from "../../Components/CardDetails.js";
import Navbar from "../../Components/nav.js";
import swal from "sweetalert2";
import Router from "next/router.js";
function index({ currentuser }) {
  if (!currentuser) {
    swal.fire({
      icon: "error",
      title: "Cannot access page before signing in",
      text: "Redirecting to Auth page",
    });
    Router.push("/auth");
  }
  return (
    <div>
      <Navbar />
      <CardDetails />
    </div>
  );
}

export default index;
