import { useState } from "react";
import Mainlayout from "../mainlayout";
import { FaUser, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Settings() {
    
    const [shownPage, setShownPage] = useState<string>('infomation');

    return (
        <Mainlayout>
            <div className="flex flex-col md:flex-row gap-[25px] justify-center items-center text-center text-[#0F176B]">
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
                                        <input className="text-xl" type="text" placeholder="Navn" />
                                    </div>

                                    <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* Email input */}
                                        <MdEmail size={14} color="#0F176B"/>
                                        <input className="text-xl" type="text" placeholder="Email" />
                                    </div>

                                    <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* Phone input */}
                                        <FaPhone size={14} color="#0F176B"/>
                                        <input className="text-xl" type="text" placeholder="Telefon Nummer" />
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
                                </div>
                            </>
                        )}
                    

                </div>
            </div>
        </Mainlayout>
    );
}