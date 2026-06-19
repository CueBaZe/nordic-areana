import { useState } from "react";
import Mainlayout from "../mainlayout";
import { FaUser, FaPhone, FaLock, FaLockOpen } from "react-icons/fa";
import { MdEmail, MdLockReset } from "react-icons/md";
import { GrShieldSecurity } from "react-icons/gr";
import { useAuth } from "../components/authContext";

export default function Settings() {
    
    const [shownPage, setShownPage] = useState<string>('infomation');

    //---------------------------(To Infomation change)-------------------------------------------------------
    const [name, setName] = useState<string>(''); //name
    const [nameError, setNameError] = useState<string>('');

    const [email, setEmail] = useState<string>(''); //email
    const [emailError, setEmailError] = useState<string>('');

    const [phone, setPhone] = useState<string>(''); //phone
    const [phoneError, setPhoneError] = useState<string>('');

    const { user, update } = useAuth();

    const [ loading, setLoading ] = useState<boolean>(false);

    const handleChangeInfomation = async () => { 
        setNameError('');
        setEmailError('');
        setPhoneError('');

        let pendingNameError = '';
        let pendingEmailError = '';
        let pendingPhoneError = '';

        let nameSuccess = false;
        let emailSuccess = false;
        let phoneSuccess = false;

        try {
            setLoading(true);

            const promises = [];

            if (name) {
                promises.push ( //adds this section to promises
                    fetch(`http://127.0.0.1:8000/api/changeName/${user?.id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${user?.token}`
                        },
                        body: JSON.stringify({
                            'newName': name,
                        }),
                    })
                    .then (async (response) => {
                        const data = await response.json()

                        if (!response.ok) {
                            pendingNameError = data.errors.newName[0];
                        } else {
                            nameSuccess = true;
                        }
                    })
                );
            }

            if (email) {
                promises.push( //adds this section to promises
                    fetch(`http://127.0.0.1:8000/api/changeEmail/${user?.id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${user?.token}`
                        },
                        body: JSON.stringify({
                            'newEmail': email,
                        }),
                    })
                    .then(async (response) => {
                        const data = await response.json();

                        if (!response.ok) {
                            pendingEmailError = data.errors.newEmail[0];
                        } else {
                            emailSuccess = true;
                        }
                    })
                );
            }

            if (phone) { 
                promises.push( //adds this section to promises
                    fetch(`http://127.0.0.1:8000/api/changeNumber/${user?.id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${user?.token}`
                        },
                        body: JSON.stringify({
                            'newNumber': phone,
                        }),
                    })
                    .then(async (response) => {
                        const data = await response.json();

                        if (!response.ok) {
                            pendingPhoneError = data.errors.newNumber[0];
                        } else {
                            phoneSuccess = true;
                        }
                    })
                );
            }

            const updateFields: {name?: string, email?: string, phone?: string} = {};

            await Promise.all(promises); //runs throug all promises

            if (pendingNameError && pendingNameError.length > 0) { setNameError(pendingNameError); }
            if (pendingEmailError && pendingEmailError.length > 0) {setEmailError(pendingEmailError);}
            if (pendingPhoneError && pendingPhoneError.length > 0) {setPhoneError(pendingPhoneError);}

            if (nameSuccess) { updateFields.name = name; setName('') }
            if (emailSuccess) { updateFields.email = email; setEmail('') }
            if (phoneSuccess) { updateFields.phone = phone; setPhone('') }

            if (Object.keys(updateFields).length > 0) {
                update(updateFields);
            }
            

        } catch (errors) {
            console.log(errors);
        } finally {
            setLoading(false);
        }
    }

    //---------------------------(To Password change)-------------------------------------------------------

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
{/*---------------------------------------(Infomation page)-------------------------------------------- */}
                        {shownPage === 'infomation' && (
                            <>
                                <h1 className="text-xl font-semibold self-start mx-3 mt-4">Ændre infomation:</h1>

                                <div className="flex flex-col items-center justify-center gap-14 mt-8">
                                    <div>
                                        <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* Name input */}
                                            <FaUser size={14} color="#0F176B"/>
                                            <input 
                                                className="text-xl" 
                                                type="text" 
                                                placeholder={user?.name} 
                                                onChange={(e) => {setName(e.target.value)}}
                                                value={name}
                                            />
                                        </div>

                                        {nameError && (
                                            <div>
                                                <p className="text-xs text-red-600 font-semibold">{nameError}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* Email input */}
                                            <MdEmail size={14} color="#0F176B"/>
                                            <input 
                                                className="text-xl" 
                                                type="text" 
                                                placeholder={user?.email} 
                                                onChange={(e) => {setEmail(e.target.value)}}
                                                value={email}
                                            />
                                        </div>

                                        {emailError && (
                                            <div>
                                                <p className="text-xs text-red-600 font-semibold">{emailError}</p>
                                            </div>
                                        )}    
                                    </div>        
                                    
                                    <div>
                                        <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* Phone input */}
                                            <FaPhone size={14} color="#0F176B"/>
                                            <input 
                                                className="text-xl"
                                                type="text" 
                                                placeholder={user?.phone} 
                                                onChange={(e) => {setPhone(e.target.value)}}
                                                value={phone}
                                            />
                                        </div>

                                        {phoneError && (
                                            <div>
                                                <p className="text-xs text-red-600 font-semibold">{phoneError}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        {!loading ? (
                                            <button onClick={handleChangeInfomation} className="bg-green-400 rounded-xl text-white text-xl font-semibold p-2 w-[100px] transtion-transform duration-300 hover:scale-110 cursor-pointer">
                                                Gem
                                            </button>
                                        ) : (
                                            <button className="bg-gray-400 rounded-xl text-white text-xl font-semibold w-[100px] cursor-disabled p-2">
                                                Loading...
                                            </button>
                                        )}
                                        
                                    </div>
                                </div>
                            </>
                        )}

{/*---------------------------------------(Password page)-------------------------------------------- */}
                        {shownPage === 'password' && (
                            <>
                                <h1 className="text-xl font-semibold self-start mx-3 mt-4">Ændre password:</h1>

                                <div className="flex flex-col items-center justify-center gap-16 mt-8 "> 
                                    <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* present password */}
                                        <FaLockOpen size={14} color="#0F176B" />
                                        <input className="text-lg" type="password" placeholder="Nuværende password"/>
                                    </div>

                                    <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* new password */}
                                        <FaLock size={14} color="#0F176B" />
                                        <input className="text-lg" type="password" placeholder="Nyt password"/>
                                    </div>

                                    <div className="flex flex-row gap-2 justify-center items-center border border-1 border-[#C5D3E5] rounded-lg p-1"> {/* repeat password */}
                                        <MdLockReset size={14} color="#0F176B" />
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