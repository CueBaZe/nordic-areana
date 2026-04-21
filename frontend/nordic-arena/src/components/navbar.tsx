import { FaLock } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Navbar() {
    return (
        <div className="flex items-center justify-between h-20 bg-[#1E3A8A] px-6">
            <div className="flex flex-row items-center">
                <img src={logo} alt="logo" width={100} height={20} />
                <h1 className="text-white text-4xl font-bold p-4">Nordic Arena</h1>
            </div>
            <div className="flex flex-col items-center justify-center text-white text-center hover:cursor-pointer">
                <FaLock className="text-2xl" />
                <span className="text-md">Login</span>
            </div>
        </div>
    )
}