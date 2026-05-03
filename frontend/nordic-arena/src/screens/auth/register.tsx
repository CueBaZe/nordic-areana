import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function Register() {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleRegister = async () => {
        
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, email, phone, password })
            });

            const Data = await response.json()

            if (!response.ok) {
                let errorMessage = 'Der opsted en fejl'

                if (Data.errors) {

                    const firstField = Object.keys(Data.errors)[0]

                    errorMessage = Data.errors[firstField][0]
                } else if (Data.message) {
                    errorMessage = Data.message
                }
                
                setError(errorMessage);
                return;
            }

            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setSuccess('Bruger oprettet')
            return;

        } catch (err) {
            setError("Kunne ikke forbinde til serveren.")
        } finally {
            setLoading(false);
        }


    }

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-[#F0F9FF] overflow-hidden">
            
            <div className="md:absolute top-5 left-5">
                <img src={logo} alt="logo" width={150}/>
            </div>

            <div className="flex flex-col items-center w-[340px] md:w-[450px]">
                
                {/* Header */}
                <div className="bg-[#1E3A8A] border border-[#DBEAFE] w-full text-center rounded-t-lg">
                    <h1 className="text-white font-bold text-4xl p-2">Register</h1>
                </div>

                {/* Form Body */}
                <div className="flex flex-col bg-[#E0F2FE] w-full items-center rounded-b-lg gap-[30px]">

                    <div>
                        <div className="flex w-full h-[50px] text-center items-center mt-4"> {/* Error Box */}
                            {(error || success) && (
                                <div className="bg-[#DBEAFE] border border-1 border-[#C5D3E5] rounded-lg p-2">
                                    {error && ( 
                                        <p className="text-red-600 text-sm text-center font-medium">
                                            {error}
                                        </p>
                                    )}

                                    {success && (
                                        <p className="text-green-600 text-sm text-center font-medium">
                                            {success}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>  
                    </div>

                    <div className="flex flex-row items-center gap-[8px]"> {/* Navn input */}
                        <FaUser className="text-xl text-[#0F176B]"/>
                        <input 
                            type="text" 
                            className="text-center text-[#0F176B] text-2xl border border-[#C5D3E5] rounded p-2 w-[80%]" 
                            name="name"
                            placeholder="Navn"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>
                    
                    <div className="flex flex-row items-center gap-[8px]"> {/* Email input */}
                        <FaEnvelope className="text-xl text-[#0F176B]"/>
                        <input 
                            type="text" 
                            className="text-center text-[#0F176B] text-2xl border border-[#C5D3E5] rounded p-2 w-[80%]" 
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>

                    <div className="flex flex-row items-center gap-[8px]"> {/* Phone input */}
                        <FaPhone className="text-xl text-[#0F176B]"/>
                        <input 
                            type="text" 
                            className="text-center text-[#0F176B] text-2xl border border-[#C5D3E5] rounded p-2 w-[80%]" 
                            name="phone"
                            placeholder="Telefon nummer"
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                        />
                    </div>

                    <div className="flex flex-row items-center gap-[8px]"> {/* Password input */}
                        <FaLock className="text-xl text-[#0F176B]"/>
                        <input 
                            type="password" 
                            className="text-center text-[#0F176B] text-2xl border border-[#C5D3E5] rounded p-2 w-[80%]" 
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    {loading ? (
                        /* This shows when loading is true */
                        <button className="bg-[#1E3A8A] text-white text-xl py-2 px-10 rounded-xl opacity-70 cursor-not-allowed">
                            Loading...
                        </button>
                    ) : (
                        /* This shows when loading is false */
                        <button onClick={handleRegister} className="bg-[#1E3A8A] text-white text-xl py-2 px-10 rounded-xl transition duration-300 hover:scale-110 hover:bg-[#3F579C]">
                            Register
                        </button>
                    )}

                    <div className="mb-8">
                        <p className="text-md text-[#0F176B]">Har du en account? <Link to={'/login'}><span className="underline transition duration-300 hover:text-[#5C71AB]">Klik her</span></Link></p>
                    </div>

                </div>
            </div>
        </div>
    );
}