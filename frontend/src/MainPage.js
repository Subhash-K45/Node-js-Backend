import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    
    const handleLoginClick = () => {
        navigate("/login");
  };

  return (
    <div>
      <p onClick={handleLoginClick}>Login to Proceed</p>
    </div>
  );
};

export default MainPage;
