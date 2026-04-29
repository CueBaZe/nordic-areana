import { FaUser, FaLock } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleLogin = async () => {
        //fetch login endpoint
        setLoading(true);
        setErrors([]);

        try {
            const response = await fetch('http://127.0.0.1/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const Data = await response.json();

            if (!response.ok) {
                let errorMessage = "Der opstod en fejl.";

            if (Data.errors) {

                const firstField = Object.keys(Data.errors)[0];

                errorMessage = Data.errors[firstField][0];
            } else if (Data.message) {
                errorMessage = Data.message;
            }

            setErrors([errorMessage]);
            } else {
                if (Data.user) {
                    console.log(Data.user);
                    //redirect to dashboard with userData
                }
            }


            }
        catch (err) {
            setErrors(["Kunne ikke forbinde til serveren."]);
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
                    <h1 className="text-white font-bold text-4xl p-2">Login</h1>
                </div>

                {/* Form Body */}

                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                    className="flex flex-col bg-[#E0F2FE] w-full items-center rounded-b-lg gap-[50px]"
                >
                    <div>
                            <div className="flex w-full h-[50px] text-center items-center"> {/* Error Box */}
                                {errors.length > 0 && (
                                    <div className="bg-[#DBEAFE] border border-1 border-[#C5D3E5] rounded-lg p-2">
                                        <p className="text-red-600 text-sm text-center font-medium">
                                            {errors[0]}
                                        </p>
                                    </div>
                                )}
                            </div>
                    </div>

                    <div className="flex flex-row items-center gap-[8px]"> {/* Email input */}
                        <FaUser className="text-xl text-[#0F176B]"/>
                        <input 
                            type="text" 
                            className="text-center text-[#0F176B] text-xl border border-[#C5D3E5] rounded p-2 w-[90%]" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    
                    <div className="flex flex-row items-center gap-[8px]"> {/* Password input */}
                        <FaLock className="text-xl text-[#0F176B]"/>
                        <input 
                            type="password" 
                            className="text-center text-[#0F176B] text-xl border border-[#C5D3E5] rounded p-2 w-[90%]" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    {loading ? (
                        /* This shows when loading is TRUE */
                        <button className="bg-[#1E3A8A] text-white text-xl py-2 px-10 rounded-xl opacity-70 cursor-not-allowed">
                            Loading...
                        </button>
                    ) : (
                        /* This shows when loading is FALSE */
                        <button 
                            type="submit"
                            className="bg-[#1E3A8A] text-white text-xl py-2 px-10 rounded-xl transition duration-300 hover:scale-110 hover:bg-[#3F579C]"
                        >
                            Login
                        </button>
                    )}

                    <div className="flex flex-col text-center gap-[2px]">
                        <p className="text-md text-[#0F176B]">Ingen account? <Link to={'/register'}><span className="underline transition duration-300 hover:text-[#5C71AB]">Klik her</span></Link></p>
                        <Link to={'/'}>
                            <p className="text-sm text-[#0F176B] transition duration-300 hover:text-[#5C71AB] underline">Forsæt som gæst</p>
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
}