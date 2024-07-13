import React, { useState } from "react";

import "./landing.css";

import Lottie from "lottie-react";
import fireworks from "../../Lotties/fireworks.json";
import hi from "../../Lotties/hi.json";

const Landing = () => {
  return (
    <div className="main">
      {/* fonts from google fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      ></link>
      <div className="fire">
        <Lottie className="lottie" animationData={fireworks} />
        <Lottie className="lottie" animationData={fireworks} />
      </div>
      <h1 className="heading">Movie Store</h1>
      <div className="last">
        <div className="para">
          <p>Welcome to the site, where your movie collection finds a home.</p>
        </div>
        <div className="character">
          <div className="content">Scroll to view...</div>
          <div className="back">
            <p>
              <Lottie className="lottie" animationData={hi} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
