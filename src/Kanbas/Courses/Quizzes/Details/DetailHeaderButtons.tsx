import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router";
export default function DetailHeaderButtons({ path }: { path: string }) {
    const navigate = useNavigate();
    
    return (
        <div>
            <button className="btn btn-primary" onClick={() => {navigate(path)}}>Preview</button>
            <button className="btn btn-danger">
                <FaPencil className="me-2" />
                Edit</button>
        </div>
    );
}