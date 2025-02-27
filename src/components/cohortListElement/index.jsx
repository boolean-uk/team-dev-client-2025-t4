import "./style.css";
import ProfileCircle from "../profileCircle";
import SquareBracketsIcon from "../../assets/icons/squareBracketsIcon";

function CohortListElement() {

    {/*TODO: add handling cohort info*/}
    
    return (
        <div className="cohortListElement">
            <div className="cohortIcon"><SquareBracketsIcon></SquareBracketsIcon></div> {/*TODO: add colored circle around icon (and correct icon)*/}
            <div className="cohortListElementTitle"><p>Software Development</p></div>
            <div className="cohortListElementTimeframe"><p>Cohort 4</p></div>
        </div>
    )
}

export default CohortListElement;