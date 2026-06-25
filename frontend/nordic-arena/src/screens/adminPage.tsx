import { useEffect } from "react";
import Mainlayout from "../mainlayout";
import { useAuth } from "../components/authContext";
import { useNavigate } from "react-router-dom";


export default function AdminPage() {

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/forbidden');
        }
    }, [user, navigate]);   
    
    return (
        <div className="flex flex-col min-h-screen">
            <Mainlayout>
                <div>

                </div>
            </Mainlayout>
        </div>
    );
}