import MyCohort from "../../components/myCohort";
import Teachers from "../../components/teachers";
import './style.css';

function Cohort() {
    return (
        <>
            <main>
                <MyCohort />
            </main>
            <aside>
                <Teachers />
            </aside>
        </>
    )
}

export default Cohort;