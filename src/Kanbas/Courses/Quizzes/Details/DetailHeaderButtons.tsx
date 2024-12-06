import { FaPencil } from "react-icons/fa6";

export default function DetailHeaderButtons() {
    return (
        <div>
            <button className="btn btn-primary">Preview</button>
            <button className="btn btn-danger">
                <FaPencil className="me-2" />
                Edit</button>
        </div>
    );
}