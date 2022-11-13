import Profile from '../../Components/Profile';
import MyCards from '../../Components/MyCard.js'
import Navbar from '../../Components/nav.js';

function index() {
  return (
    <div>
        <Navbar/>
        <Profile/>
        <MyCards/>
    </div>
  )
}

export default index  