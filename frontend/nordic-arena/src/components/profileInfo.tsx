import { useAuth } from "./authContext";
import { FaUser, FaPhone } from "react-icons/fa";

export default function ProfileInfo() {
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col w-[200px] items-center justify-center text-center bg-[#F0F9FF] border border-1 border-[#DBEAFE] rounded z-10 gap-[5px]">
            <h1 className="text-[#0F176B] text-lg font-bold mb-2">Profil Info</h1>
            <div className="flex flex-row gap-[5px] text-center items-center justify-center">
                <FaUser size={12} color="#0F176B" />
                <p className="text-[#0F176B] text-sm">{user?.email}</p>
            </div>

            <div className="flex flex-row gap-[5px] text-center items-center justify-center">
                <FaPhone size={12} color="#0F176B"/>
                <p className="text-[#0F176B] text-sm">{user?.phone}</p>
            </div>
            <button onClick={logout} className="bg-red-600 w-[70px] text-white font-bold mb-3 mt-2 border border-1 border-red-500 rounded transition duration-300 hover:bg-red-700 hover:cursor-pointer">Log ud</button>
        </div>
    );
}