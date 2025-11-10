import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../data/store/useAuthStore";

const SingupPage = () => {
  const navigate = useNavigate();
  const {formData,user,loading,error,setFormData, login} = useAuthStore();


  const handleSubmit = async (e) => {
   e.preventDefault();
   login();
  }


  return (
    <div className="pt-10">
      <div className="bg-[#FAFAFA]  flex justify-around pt-30 h-170">
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
        <div className=" shadow drop-shadow-2xl h-130 w-100 bg-white ">
          <div className=" ml-15 pt-5">
            <h2 className="text-2xl">Sign UP In Here</h2>
            <p className=" text-[#26A66B] pt-5">
              View all of your reports and scheduled health
              <br /> exams in one location.
            </p>
            <form onSubmit={handleSubmit}>

              <div className="pt-10 ">
                <input
                  type="text"
                  name="name"
                  id=""
                  value={formData.name}
                  placeholder=" Name"
                  onChange={(e)=>setFormData("name", e.target.name)}
                  className="h-10 w-60  text-center  border  border-black  rounded-[14px]"
                />
                <br />
                <br />
                <input
                  type="number"
                  name="mobno"
                  id=""
                  value={formData.number}
                  placeholder="Mobile Number"
                  onChange={(e)=>setFormData("mobno", e.target.value)}

                  className="h-10 w-60  text-center  border  border-black  rounded-[14px]"
                />
                <br />
                <br />
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Email ID"
                 value={formData.email}
                  onChange={(e)=>setFormData("email", e.target.value)}

                  className="h-10 w-60  text-center  border  border-black  rounded-[14px]"
                />
                <br />
                <br />

                <input
                  type="password"
                  name="password"
                  id=""
                  value={formData.password}
                  placeholder="Password"
                  onChange={(e)=>setFormData("password", e.target.value)}

                  className="h-10 w-60  border text-center  border-black  rounded-[14px]"
                />
                <p className="text-[#26a66b] text-[17px]  pt-4">
                  Already SignIn? | <span className="cursor-pointer" onClick={() => navigate('/auth/login')}  >Login</span>
                </p>
                <div className="pt-5">
                  <CustomButton type={"submit"} title={`${loading ? "Loading...":"Submit"} `} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingupPage;
