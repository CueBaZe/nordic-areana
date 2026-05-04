import { FaLock, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "./authContext";
import ProfileInfo from "./profileInfo";
import { useState } from "react";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [showProfileInfo, setShowProfileInfo] = useState<boolean>(false);

    return (
        <div className="flex items-center justify-between h-20 bg-[#1E3A8A] px-6">
            <div className="flex flex-row items-center">
                <Link to={'/'} className="transition duration-300 hover:cursor-pointer trans hover:scale-110">
                    <img src={logo} alt="logo" width={100} height={20} />
                </Link>
                <h1 className="text-white text-4xl font-bold p-4">Nordic Arena</h1>
            </div>
            {!user && (
                <Link to={'/login'}>
                    <div className="flex flex-col items-center justify-center text-white text-center hover:cursor-pointer">
                        <FaLock className="text-2xl" />
                        <span className="text-md">Login</span>
                    </div>
                </Link>
            )}

            {user && (
                <div className="flex flex-col relative">
                    <div
                        onClick={() => setShowProfileInfo(prev => !prev)}
                        className="flex flex-col items-center justify-center text-white text-center hover:cursor-pointer"
                    >
                        <FaUser className="text-2xl" />
                        <span className="text-md">{user['name']}</span>
                    </div>

                    {showProfileInfo && (
                        <div className="absolute top-full mt-2 right-0">
                            <ProfileInfo />
                        </div>
                    )}
                </div>
            )}

        </div>
    )
}