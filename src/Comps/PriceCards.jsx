import React from 'react'

const PriceCards = ({display, primaryColor}) => {
  return (
    <React.Fragment>
      <section>
        <h2 id={display.color} className="price-hd">
          Subscribe to get gain access to all Analysis on Trends.
          <br />
          <br />
          Ad free!
        </h2>

        <div className='cards'>
          <div id={display.primaryBg}>
            <h3 id={display.color}>Monthly Plan</h3>
            <h4 id={primaryColor.color}>$49.99</h4>

            <br /> 

            <p id={display.color}>
              +1 Month Free
              <br />
              (On first Subscription)
            </p>
 

            <button id={primaryColor.bgColor}>Subscribe</button>
          </div>

          <div id={display.primaryBg}>
            <h3 id={display.color}>3 Month Plan</h3>

            <h4 id={primaryColor.color}>$134.99</h4>
            <strike id={display.color}>$149.99</strike>

            <p id={display.color}>
              +1 Month Free
              <br />
              (On first Subscription)
            </p> 

            <button id={primaryColor.bgColor}>Subscribe</button>
          </div>

          <div id={display.primaryBg}>
            <h3 id={display.color}>Annual Plan</h3>

            <h4 id={primaryColor.color}>$499.99</h4>
            <strike id={display.color}>$599.99</strike>

            <p id={display.color}>
              +2 Months Free 
              <br />
              (On first Subscription)
            </p>
            <h4 className='best' id={primaryColor.bgColor}>Best Value</h4>

            <button id={primaryColor.bgColor}>Subscribe</button>
          </div>

        </div>
        <br />
        <br />
        <br />
        <br />


      </section>
    </React.Fragment>
  )
}

export default PriceCards