import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SingupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobno: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log("here i form data....")
    console.log(formData);

    try {
      //  http://localhost:4000 - frontend 
      const response =  await axios.post("http://localhost:4000/auth/signup", formData)
      console.log("here is resons",response.data);


    } catch (e) {
      console.log("Errororororor23423423",e.response)
    }



  }

  // 'cors ' => cross origin resource service 

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
                  placeholder=" Name"
                  onChange={handleChange}
                  className="h-10 w-60  text-center  border  border-black  rounded-[14px]"
                />
                <br />
                <br />
                <input
                  type="number"
                  name="mobno"
                  id=""
                  placeholder="Mobile Number"
                  onChange={handleChange}

                  className="h-10 w-60  text-center  border  border-black  rounded-[14px]"
                />
                <br />
                <br />
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Email ID"
                  onChange={handleChange}

                  className="h-10 w-60  text-center  border  border-black  rounded-[14px]"
                />
                <br />
                <br />

                <input
                  type="password"
                  name="password"
                  id=""
                  placeholder="Password"
                  onChange={handleChange}

                  className="h-10 w-60  border text-center  border-black  rounded-[14px]"
                />
                <p className="text-[#26a66b] text-[17px]  pt-4">
                  Already SignIn? | <span className="cursor-pointer" onClick={() => navigate('/auth/login')}  >Login</span>
                </p>
                <div className="pt-5">
                  <CustomButton type={"submit"} title="Sign Up" />
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
