import { type ReactNode } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

interface MainLayoutProps {
    children: ReactNode;
}

function Mainlayout({ children }: MainLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-[#F0F9FF]">
            <Navbar></Navbar>
            <div className="flex flex-1 min-h-[900px] items-center justify-center">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Mainlayout;
