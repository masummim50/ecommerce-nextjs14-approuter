import React from 'react';

import './animation.css'
const Loading = () => {
    return (
        <div className="h-[100vh] w-full flex justify-center items-center">
            <div className="container">
  <div className="circleone circle"></div>
  <div className="circletwo circle"></div>
  <div className="circlethree circle"></div>
  <div className="circlefour circle"></div>
</div>
        </div>
    );
};

export default Loading;