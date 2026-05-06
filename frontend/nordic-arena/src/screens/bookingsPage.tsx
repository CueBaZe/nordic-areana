import Mainlayout from "../mainlayout";
import { useAuth } from "../components/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BookingsPage() {

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/forbidden');
        }
    }, []);

    return (
        <Mainlayout>
            <div>
                <p>Dine bookninger</p>
            </div>
        </Mainlayout>
    );
}