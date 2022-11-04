import Image from 'next/image';
import feature1 from '../public/feature1.png';
import style from "../styles/hero.module.css"

function Features (){
    <div className={style.features}>
        <div className="features-child">
        {/* <div className="features-img"> */}
            <Image className='feature-img' src={feature1}/>
        {/* </div> */}
        <div className="features-desc">
        <div className='features-desc-heading'>
            <div className='features-desc-heading-big'>
                PLAY X EARN
            </div>
            <div className='features-desc-heading-small'>
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
            </div>
            </div>    
        </div>
        </div>
    </div>
}

export default Features;