import nft1 from '../public/nft.jpg'; 
import Image from 'next/image';

function CardDetails() {
  return (
    <div className="card-details">
      <div className="card-details__image">
        <Image className="nft-details-image" src={nft1} alt="Card" />
      </div>
      <div className="card-details__info">
        <div className="card-details__info__name">
          <h1>Card Name</h1>
        </div>
        <div className="card-details__info__description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum, nisl ut aliquam aliquam, nunc nisl aliquet nisl, eget
            aliquet nunc nisl sit amet nisl. Sed condimentum, nisl ut aliquam
            aliquam, nunc nisl aliquet nisl, eget aliquet nunc nisl sit amet
            nisl.
          </p>
        </div>
        <div className="card-details__info__price">
          <h2>Price: 0.1 ETH</h2>
        </div>
        <div className="play">
          <div className='play-btn'>
            <a href="#" ><span data-attr="Buy">Buy</span><span data-attr="Now">Now</span></a>
          </div>
          <div className='play-btn'>
            <a href="#" ><span data-attr="Now">Now</span><span data-attr="Sell">Now</span></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetails