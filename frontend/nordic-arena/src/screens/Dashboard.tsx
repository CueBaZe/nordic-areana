  import Mainlayout from "../mainlayout";
  import sportImage from "../assets/sport.jpg";
  import baneImage from "../assets/bane.jpg";
  import { Link } from "react-router-dom";

  export default function Dashboard() {
    return (
      <div className="flex flex-col min-h-screen">
        <Mainlayout>
          <div className="flex flex-col mt-8 mb-8 md:m-0 md:flex-row gap-[50px] md:gap-[250px]">
            <Link to="/booking">
              <div className="bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded w-[450px] h-[400px] transition duration-300 hover:scale-105">
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

                <div className="flex items-center justify-center text-center m-4 h-[60px]">
                  <p className="text-[#0F176B] text-lg">Book nemt en af vores baner i vores åbningstider. Reservationer foretages i intervaller á 60 minutter.</p>
                </div>  
              </div>
            </Link>

            <div className="bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded w-[450px] h-[400px] transition duration-300 hover:scale-105">
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

              <div className="flex items-center justify-center text-center m-4 h-[60px]">
                <p className="text-[#0F176B] text-lg">Få et overblik over dine aktuelle reservationer.</p>
              </div>  
              
            </div>
          </div>
        </Mainlayout>
      </div>
    );
  }


