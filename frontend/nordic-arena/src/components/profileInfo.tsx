import { useAuth } from "./authContext";
import { FaUser, FaPhone } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

export default function ProfileInfo() {
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col w-[200px] items-center justify-center text-center bg-[#F0F9FF] border border-1 border-[#DBEAFE] rounded z-10 gap-[5px]">
            <h1 className="text-[#0F176B] text-lg font-bold mb-2">Profil Info ({user?.role})</h1>
            <div className="flex flex-row gap-[5px] text-center items-center justify-center">
                <FaUser size={12} color="#0F176B" />
                <p className="text-[#0F176B] text-sm">{user?.email}</p>
            </div>

            <div className="flex flex-row gap-[5px] text-center items-center justify-center">
                <FaPhone size={12} color="#0F176B"/>
                <p className="text-[#0F176B] text-sm">{user?.phone}</p>
            </div>
            <button onClick={logout}><CiLogout title="Log ud" className="text-2xl text-red-600 font-bold transtion duration-300 hover:scale-110" /></button>
        </div>
    );
}