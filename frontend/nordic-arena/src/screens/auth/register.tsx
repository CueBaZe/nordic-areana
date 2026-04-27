import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";


export default function Register() {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-[#F0F9FF] overflow-hidden">
            
            <Link to={'/'}>
                <div className="md:absolute top-5 left-5">
                    <img src={logo} alt="logo" width={150}/>
                </div>
            </Link>

            <div className="flex flex-col items-center w-[340px] md:w-[450px]">
                
                {/* Header */}
                <div className="bg-[#1E3A8A] border border-[#DBEAFE] w-full text-center rounded-t-lg">
                    <h1 className="text-white font-bold text-4xl p-2">Register</h1>
                </div>

                {/* Form Body */}
                <div className="flex flex-col bg-[#E0F2FE] w-full items-center rounded-b-lg gap-[30px] py-12">
                    <div className="flex flex-row items-center gap-[8px]"> {/* Navn input */}
                        <FaUser className="text-xl text-[#0F176B]"/>
                        <input 
                            type="text" 
                            className="text-center text-[#0F176B] text-2xl border border-[#C5D3E5] rounded p-2 w-[80%]" 
                            name="name"
                            placeholder="Navn"
                        />
                    </div>
                    
                    <div className="flex flex-row items-center gap-[8px]"> {/* Email input */}
                        <FaEnvelope className="text-xl text-[#0F176B]"/>
                        <input 
                            type="text" 
                            className="text-center text-[#0F176B] text-2xl border border-[#C5D3E5] rounded p-2 w-[80%]" 
                            name="email"
                            placeholder="Email"
                        />
                    </div>

                    <div className="flex flex-row items-center gap-[8px]"> {/* Phone input */}
                        <FaPhone className="text-xl text-[#0F176B]"/>
                        <input 
                            type="text" 
                            className="text-center text-[#0F176B] text-2xl border border-[#C5D3E5] rounded p-2 w-[80%]" 
                            name="phone"
                            placeholder="Telefon nummer"
                        />
                    </div>

                    <div className="flex flex-row items-center gap-[8px]"> {/* Password input */}
                        <FaLock className="text-xl text-[#0F176B]"/>
                        <input 
                            type="password" 
                            className="text-center text-[#0F176B] text-2xl border border-[#C5D3E5] rounded p-2 w-[80%]" 
                            name="password"
                            placeholder="Password"
                        />
                    </div>

                    <button className="bg-[#1E3A8A] text-white text-xl py-2 px-10 rounded-xl transition duration-300 hover:scale-110 hover:bg-[#3F579C]">
                        Register
                    </button>

                    <div>
                        <p className="text-md text-[#0F176B]">Har du en account? <Link to={'/login'}><span className="underline transition duration-300 hover:text-[#5C71AB]">Klik her</span></Link></p>
                    </div>

                </div>
            </div>
        </div>
    );
}