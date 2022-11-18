import Image from 'next/image';
import feature1 from '../public/feature1.png';

export default function Features (){
    <div>
        <div className="features-child">
            <Image className='feature-img' src={feature1}/>
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