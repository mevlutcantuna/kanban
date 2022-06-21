import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="w-screen h-screen pt-40 flex justify-center bg-lightBlack">
      <div className="w-full max-w-sm h-80 flex flex-col items-center">
        <h1 className="text-gray-300 text-3xl">Sign Up</h1>
        <form className="w-full flex flex-col mt-10">
          <input
            className="bg-transparent border-solid border-[1px] border-black rounded p-2 mb-4 text-[#ccc]"
            placeholder="Full Name"
            type="text"
          />
          <input
            className="bg-transparent border-solid border-[1px] border-black rounded p-2 mb-4 text-[#ccc]"
            placeholder="Email"
            type="email"
          />
          <input
            className="bg-transparent border-solid border-[1px] border-black rounded p-2 mb-4 text-[#ccc]"
            placeholder="Password"
            type="password"
          />
          <button className="bg-[#9BA3AF] rounded p-2 mb-4 hover:bg-[#65686b]">
            Signup
          </button>
        </form>
        <div className="w-full flex justify-start text-[#cccccc] mt-4">
          <span className="mr-4 ">Already have account?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
