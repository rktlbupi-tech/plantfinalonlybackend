import React from "react";

const CustomButton = ({ title, onClick, type, className }) => {
  const defaultClasses = "bg-green-600 hover:bg-green-700 cursor-pointer text-center text-white px-6 py-2 rounded-md transition-all hover:translate-x-2 duration-300";
  const combinedClasses = className ? `${defaultClasses} ${className}` : defaultClasses;
  
  return (
    <button
      onClick={onClick}
      type={type}
      className={combinedClasses}
    >
      {title}
    </button>
  );
};

export default CustomButton;
