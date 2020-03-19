import React from "react";
import "./Human.css";

const Human = (props) => {
  return (
    <section 
      className="human text-center"
      style={{backgroundImage: `url(${props.backgroundImage})`}}>
        {props.children}
      </section>
  )
}

export default Human;