import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../assets/LogoutIcon";
import { generateUserLogo } from "../lib/utils";
import { IUser } from "../types";

type IProps = {
  user: IUser
}

const Header: React.FC<IProps> = ({ user }) => {
  const navigate = useNavigate()
  const logo = generateUserLogo(user?.fullName)

  const logout = () => {
    localStorage.removeItem('token')
    return navigate('/login', { replace: true })
  }

  return (
    <div className="flex items-center justify-between py-8 px-4 bg-[#202020]">
      <h1 className="text-3xl mb-0 text-gray-300 uppercase">kanban </h1>
      <div className="flex items-center">
        <span className="mr-4 text-xl text-gray-300 md:hidden">{user?.fullName}</span>
        <span className="rounded-full p-2 bg-gray-100 uppercase mr-4">{logo}</span>
        <button onClick={logout}>
          <LogoutIcon color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default memo(Header);
