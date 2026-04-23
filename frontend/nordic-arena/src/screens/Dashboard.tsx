import Mainlayout from "../mainlayout";
import sportImage from "../assets/sport.jpg";
import baneImage from "../assets/bane.jpg";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Mainlayout>
        <div className="flex flex-row gap-[250px]">
          <div className="bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded w-[450px] h-[450px] transition duration-300 hover:scale-105">
            <div className="flex w-full bg-[#1E3A8A] rounded-t h-[40px] items-center justify-center text-center">
              <h1 className="text-white text-2xl font-semibold">Book baner</h1>
            </div>
            <div className="flex items-center justify-center mt-4">
              <img 
                src={sportImage} 
                alt="sport" 
                className="w-[350px] h-[250px] object-cover rounded"
              />
            </div>
          </div>

          <div className="bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded w-[450px] h-[450px] transition duration-300 hover:scale-105">
            <div className="flex w-full bg-[#1E3A8A] rounded-t h-[40px] items-center justify-center text-center">
              <h1 className="text-white text-2xl font-semibold">Dine baner</h1>
            </div>
            <div className="flex items-center justify-center mt-4">
              <img 
                src={baneImage} 
                alt="sport" 
                className="w-[350px] h-[250px] object-cover rounded"
              />
            </div>
          </div>
        </div>
      </Mainlayout>
    </div>
  );
}


