import Sell from "../../Components/Sell.js";
import Features from "../../Components/Option.js"
import New from "../../Components/New.js";
import Navbar from '../../Components/nav.js';


function index() {
  let person={
    name: 'Lin Lanying', imageId: '1bX5QH6'
  }
  return (
    <div>
      <Navbar/>
        <Sell person={person}/>
    </div>
  )
}

export default index 