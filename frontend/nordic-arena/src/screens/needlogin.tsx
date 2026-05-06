import { MdErrorOutline } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function NeedLogin() {
    return (
        <div className="relative bg-[#F0F9FF]">
            <div className="absolute top-5 left-5">
                <Link to={'/'}>
                    <FaArrowLeftLong size={50} className="text-[#0F176B] transition duration-300 hover:text-[#5C71AB] hover:scale-110"/>
                </Link>    
            </div>

            <div className="flex flex-col w-full min-h-screen items-center justify-center text-center gap-[20px]">
                <MdErrorOutline size={125} className="text-red-500"/>
                <h1 className="text-[#0F176B] text-4xl text-red-500 font-bold">Fejl 401</h1>

                <div className="gap-2 text-[#0F176B] text-lg">
                    <p>Du skal være logget ind for at tilgå denne side</p>
                    <p>gå til <Link to={'/login'}><span className="underline transition duration-300 hover:text-[#5C71AB]">login</span></Link></p>
                    <p></p>
                </div>
            </div>
        </div>
    );
}