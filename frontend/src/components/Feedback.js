import React from "react";
import Icon from '../components/styling/icon'
import "../components/styling/Feedback.css";

const Feedback = () => {
  return (
    <button className="message-icon" onClick={()=>console.log('Feedback Button Clicked')}>
      <Icon icon={'mdi:message'} style={{color: 'white'}}/>
    </button>
  );
};

export default Feedback;
