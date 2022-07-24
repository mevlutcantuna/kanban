import { useMutation } from "@apollo/client";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../graphql/auth";
import { errorMessage, isAuthanticated } from "../lib/utils";

const Login = () => {
  const [inputs, setInputs] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [login, { data, error, loading }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await login({
      variables: { user: { email: inputs.email, password: inputs.password } },
    });

    if (res.data) {
      // when logining,add token to local storage
      localStorage.setItem('token', res.data.login.token)
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    //it shows error messages
    if (error) {
      errorMessage(error.message);
    }
  }, [error]);


  useEffect(() => {
    // if user is authanticated, redirects to home page
    if (isAuthanticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate, data]);

  return (
    <Spin spinning={loading}>
      <div className="w-screen h-screen pt-40 flex justify-center bg-lightBlack">
        <div className="w-full max-w-sm h-80 flex flex-col items-center">
          <h1 className="text-gray-300 text-3xl">Log In</h1>
          <form onSubmit={submit} className="w-full flex flex-col mt-10">
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
            <button
              type="submit"
              className="bg-[#9BA3AF] rounded p-2 mb-4 hover:bg-[#65686b]"
            >
              Login
            </button>
          </form>
          <div className="w-full flex justify-start text-[#cccccc] mt-4">
            <span className="mr-4 ">Don't you have an account?</span>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Login;
