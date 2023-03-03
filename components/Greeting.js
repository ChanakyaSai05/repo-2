import React from "react";

function Greeting() {
  const date = new Date();
  const hour = date.getHours();
  let timeOfDay;

  if (hour < 12) {
    timeOfDay = "morning";
  } else if (hour >= 12 && hour < 18) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }

  return <div>Good {timeOfDay}</div>;
}

export default Greeting;
