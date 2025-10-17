import React from "react";

const CustomButton = ({ title, onClick,type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-green-600 hover:bg-greenbg hover: border hover:border-primary hover:text-primary    cursor-pointer text-center max-w-32  text-white px-6 py-2 rounded-md transition-all hover:translate-x-2  duration-300"
    >
      {title}
    </button>
  );
};

export default CustomButton;
