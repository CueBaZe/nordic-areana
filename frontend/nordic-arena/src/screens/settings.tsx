import { useState } from "react";
import Mainlayout from "../mainlayout";
import { FaUser, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GrShieldSecurity } from "react-icons/gr";
import { useAuth } from "../components/authContext";

export default function Settings() {
    
    const [shownPage, setShownPage] = useState<string>('infomation');
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const { user } = useAuth();

    const handleChangeInfomation = async () => {
        if (name) {
            //run change name endpoint
        }
    }

    return (
        <Mainlayout>
            <div className="flex flex-col gap-[25px] justify-center items-center text-center text-[#0F176B]">

                <div className="flex flex-row w-[400px] h-[50px] bg-[#E0F2FE] rounded-xl items-center justify-between">
                    <div className="bg-[#1E3A8A] w-[10px] h-full rounded-l-xl"></div>
                    {shownPage === 'infomation' ? (
                        <FaUser size={24} color="#17229b"/>
                    ) : (
                        <FaUser onClick={() => {setShownPage('infomation')}} size={20} color="#0F176B" title="Infomation" className="cursor-pointer"/>
                    )}

                    {shownPage === 'password' ? (
                        <GrShieldSecurity size={24} color="#17229b"/>
                    ) : (
                        <GrShieldSecurity onClick={() => {setShownPage('password')}} size={20} color="#0F176B" title="Password" className="cursor-pointer"/>
                    )}

                    <div className="bg-[#1E3A8A] w-[10px] h-full rounded-r-xl"></div>
                </div>

                <div className="flex flex-col bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded-lg w-[300px] md:w-[450px] h-[500px] overflow-y-auto">
                    <div className="text-center bg-[#1E3A8A] rounded-t-lg p-2"> {/* Header */}
                        <h1 className="text-2xl text-white font-semibold">Settings ({shownPage})</h1>
                    </div>
                        {shownPage === 'infomation' && (
                            <>
                                <h1 className="text-xl font-semibold self-start mx-3 mt-4">Ændre infomation:</h1>

                                <div className="flex flex-col items-center justify-center gap-16 mt-8">
                                    <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* Name input */}
                                        <FaUser size={14} color="#0F176B"/>
                                        <input 
                                            className="text-xl" 
                                            type="text" 
                                            placeholder={user?.name} 
                                            onChange={(e) => {setName(e.target.value)}}
                                        />
                                    </div>

                                    <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* Email input */}
                                        <MdEmail size={14} color="#0F176B"/>
                                        <input 
                                            className="text-xl" 
                                            type="text" 
                                            placeholder={user?.email} 
                                            onChange={(e) => {setEmail(e.target.value)}}
                                        />
                                    </div>

                                    <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* Phone input */}
                                        <FaPhone size={14} color="#0F176B"/>
                                        <input 
                                            className="text-xl"
                                            type="text" 
                                            placeholder={user?.phone} 
                                            onChange={(e) => {setPhone(e.target.value)}}
                                        />
                                    </div>

                                    <div>
                                        <button onClick={handleChangeInfomation} className="bg-green-400 rounded-xl text-white text-xl font-semibold p-2 w-[100px] transtion-transform duration-300 hover:scale-110 cursor-pointer">
                                            Gem
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {shownPage === 'password' && (
                            <>
                                <h1 className="text-xl font-semibold self-start mx-3 mt-4">Ændre password:</h1>

                                <div className="flex flex-col items-center justify-center gap-16 mt-8 "> 
                                    <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* present password */}
                                        <input className="text-lg" type="password" placeholder="Nuværende password"/>
                                    </div>

                                    <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* new password */}
                                        <input className="text-lg" type="password" placeholder="Nyt password"/>
                                    </div>

                                    <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* repeat password */}
                                        <input className="text-lg" type="password" placeholder="Gentag password"/>
                                    </div>

                                    <div>
                                        <button className="bg-green-400 rounded-xl text-white text-xl font-semibold p-2 w-[100px] transtion-transform duration-300 hover:scale-110 cursor-pointer">
                                            Gem
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    

                </div>
            </div>
        </Mainlayout>
    );
}