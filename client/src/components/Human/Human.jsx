import React from 'react';
import "./Human.css";
//style={{backgroundImage: `url(${props.backgroundImage})`}}
const Human = (props) => {
  return (
    <section className="human text-center">
      {props.children}
              {/* <div className="arrow-container animated fadeInDown">
                <div className="arrow-2">
                <a href='#arr'> <i className="glyphicon glyphicon-arrow-right"></i></a>
                </div>
                <div className="arrow-1 animated hinge infinite zoomIn"></div>
              </div> */}
          
    </section>
  )
}

export default Human;