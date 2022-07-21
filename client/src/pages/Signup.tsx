import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { REGISTER } from "../graphql/auth";
import { errorMessage, successMessage } from "../lib/utils";
import { Spin } from "antd";

const Signup = () => {
  const [inputs, setInputs] = useState<any>({ fullName: "", email: "", password: "" })
  const navigate = useNavigate()

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const [register, { loading, error }] = useMutation(REGISTER, {
    variables: {
      "user": {
        "fullName": inputs.fullName,
        "email": inputs.email,
        "password": inputs.password
      }
    }
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (inputs.fullName === '' || inputs.email === '' || inputs.password === '') {
      return alert('Please fill in all fields');
    }

    await register()

    successMessage('Register is successed...')
    return navigate('/login')
  }

  useEffect(() => {
    if (error) {
      errorMessage(error.message)
    }
  }, [error])

  return (
    <Spin spinning={loading} >
      <div className="w-screen h-screen pt-40 flex justify-center bg-lightBlack">
        <div className="w-full max-w-sm h-80 flex flex-col items-center">
          <h1 className="text-gray-300 text-3xl">Sign Up</h1>
          <form onSubmit={submit} className="w-full flex flex-col mt-10">
            <input
              value={inputs.fullName}
              onChange={handleInputsChange}
              name="fullName"
              className="bg-transparent border-solid border-[1px] border-black rounded p-2 mb-4 text-[#ccc]"
              placeholder="Full Name"
              type="text"
            />
            <input
              value={inputs.email}
              onChange={handleInputsChange}
              name="email"
              className="bg-transparent border-solid border-[1px] border-black rounded p-2 mb-4 text-[#ccc]"
              placeholder="Email"
              type="email"
            />
            <input
              value={inputs.password}
              onChange={handleInputsChange}
              name="password"
              className="bg-transparent border-solid border-[1px] border-black rounded p-2 mb-4 text-[#ccc]"
              placeholder="Password"
              type="password"
            />
            <button className="bg-[#9BA3AF] rounded p-2 mb-4 hover:bg-[#65686b]" type="submit">
              Signup
            </button>
          </form>
          <div className="w-full flex justify-start text-[#cccccc] mt-4">
            <span className="mr-4 ">Already have account?</span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Signup;
