import React from 'react';
import "./Human.css";
//style={{backgroundImage: `url(${props.backgroundImage})`}}
const Human = (props) => {
  return (
    <section className="human text-center">
      {props.children}
    </section>
  )
}

export default Human;