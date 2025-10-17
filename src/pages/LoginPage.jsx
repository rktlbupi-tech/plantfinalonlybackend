import React from "react";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import axios from "axios";


const LoginPage = () => {

  const handleSubmit = async () => {
   


  }


  return (
    <div className="pt-10">
      <div className="bg-[#FAFAFA]  flex justify-around pt-30 h-150">
        <div className="">
          <h2 className="text-5xl text-black  font-bold">
            it’s important to take <br />
            care of your <span className="text-[#8F3E97]">
              health{" "}
            </span>even <br />
            if you seem healthy.
          </h2>
          <p className="text-[#696969] text-xl  pt-10">
            at the health checkup we analyze your
            <br /> body for any hidden problems
          </p>
          <div className="pt-10 ">
            {" "}
            <CustomButton title="Read More " />
          </div>
        </div>
        <div className=" shadow drop-shadow-2xl h-100 w-100 bg-white ">
          <div className=" ml-15 pt-5">
            <h2 className="text-2xl">Login In Here</h2>
            <p className=" text-[#26A66B] pt-5">
              View all of your reports and scheduled health
              <br /> exams in one location.
            </p>
            <div className="pt-10 ">
              <input
                type="text"
                name=""
                id=""
                placeholder="Mobile /Email ID"
                className="h-10 w-60  text-center  border  border-black  rounded-[14px]"
              />
              <br />
              <br />
              <input
                type="text"
                name=""
                id=""
                placeholder="Password"
                className="h-10 w-60  border text-center  border-black  rounded-[14px]"
              />
              <p className="text-[#26a66b] text-[17px]  pt-4">
                Forget Password? | Register
              </p>
              <div className="pt-5">
                <CustomButton onClick={handleSubmit} title="Login" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
