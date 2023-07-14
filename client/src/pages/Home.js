import React from "react";

const Home = () => {
  return (
    <div>
      <div className="book-here">
        <h2>Book Your Appointment Here!</h2>
      </div>
      <div className="info-input">
        <label>Enter name and email:</label>
        <input type="text" id="name" name="Name" />
        <input type="text" id="email" name="Email" />
      </div>
      <div className="services">
        <label>Select a service:</label>
        <button className="service-btn">Haircut</button>
        <button className="service-btn">Color</button>
        <button className="service-btn">Perm</button>
        <button className="service-btn">Extensions</button>
        <button className="service-btn">Style</button>
      </div>
    </div>
  );
};

export default Home;
