import React from 'react'
import "./Footer.scss"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className='bottom'>
          <div className='left'>
            <h2>Talshow</h2>
            <span>International Business</span>
          </div>
          <div className='right'>
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer