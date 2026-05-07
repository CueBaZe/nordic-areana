import Mainlayout from "../mainlayout";
import footballImage from "../assets/football.jpg";
import paddleImage from "../assets/paddle.jpg"
import tennisImage from "../assets/tennis.jpg"
import badmintonImage from "../assets/badminton.jpg"
import bordtennisImage from "../assets/bordtennis.jpg"

export default function BookingPage() {


    return (
        <Mainlayout> 
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-[25px] mt-4 mb-4">
                <div className="bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded w-[350px] md:w-[450px] h-[400px] transition duration-300 hover:scale-105">
                    <div className="flex w-full bg-[#1E3A8A] rounded-t h-[40px] items-center justify-center text-center">
                        <h1 className="text-white text-2xl font-semibold">Padel</h1>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <img 
                            src={paddleImage}
                            alt="paddle" 
                            className="w-[350px] h-[250px] object-cover rounded"
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center text-center m-4 h-[60px]">
                        <p className="text-[#0F176B] text-md md:text-lg">Booking af padelbane: Reservation sker i intervaller af 60 minutter. Lån af bat og bolde er inkluderet i prisen.</p>
                    </div> 

                </div>

                <div className="bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded w-[350px] md:w-[450px] h-[400px] transition duration-300 hover:scale-105">
                    <div className="flex w-full bg-[#1E3A8A] rounded-t h-[40px] items-center justify-center text-center">
                        <h1 className="text-white text-2xl font-semibold">Tennis</h1>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <img 
                            src={tennisImage}
                            alt="paddle" 
                            className="w-[350px] h-[250px] object-cover rounded"
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center text-center m-4 h-[60px]">
                        <p className="text-[#0F176B] text-md md:text-lg">Booking af tennisbane: Reservation sker i intervaller af 60 minutter. Lån af bat og bolde er inkluderet i prisen.</p>
                    </div> 

                </div>

                <div className="bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded w-[350px] md:w-[450px] h-[400px] transition duration-300 hover:scale-105">
                    <div className="flex w-full bg-[#1E3A8A] rounded-t h-[40px] items-center justify-center text-center">
                        <h1 className="text-white text-2xl font-semibold">Badminton</h1>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <img 
                            src={badmintonImage}
                            alt="paddle" 
                            className="w-[350px] h-[250px] object-cover rounded"
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center text-center m-4 h-[60px]">
                        <p className="text-[#0F176B] text-md md:text-lg">Booking af badmintonbane: Reservation sker i intervaller af 60 minutter. Lån af bat og bolde er inkluderet i prisen.</p>
                    </div> 

                </div>

                <div className="bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded w-[350px] md:w-[450px] h-[400px] transition duration-300 hover:scale-105">
                    <div className="flex w-full bg-[#1E3A8A] rounded-t h-[40px] items-center justify-center text-center">
                        <h1 className="text-white text-2xl font-semibold">Bordtennis</h1>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <img 
                            src={bordtennisImage}
                            alt="paddle" 
                            className="w-[350px] h-[250px] object-cover rounded"
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center text-center m-4 h-[60px]">
                        <p className="text-[#0F176B] text-md md:text-lg">Booking af bordtennisbane: Reservation sker i intervaller af 60 minutter. Lån af bat og bolde er inkluderet i prisen.</p>
                    </div> 

                </div>

                <div className="bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded w-[350px] md:w-[450px] h-[400px] transition duration-300 hover:scale-105">
                    <div className="flex w-full bg-[#1E3A8A] rounded-t h-[40px] items-center justify-center text-center">
                        <h1 className="text-white text-2xl font-semibold">Fodbold</h1>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <img 
                            src={footballImage}
                            alt="paddle" 
                            className="w-[350px] h-[250px] object-cover rounded"
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center text-center m-4 h-[60px]">
                        <p className="text-[#0F176B] text-md md:text-lg">Booking af fodboldbane: Reservation sker i intervaller af 60 minutter. Lån af bolde er inkluderet i prisen.</p>
                    </div> 

                </div>
                
            </div>
        </Mainlayout>
    );
}