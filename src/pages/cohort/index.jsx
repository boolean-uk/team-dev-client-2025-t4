import MyExercises from "../../components/myExercises";
import MyCohort from "../../components/myCohort";
import Teachers from "../../components/teachers";

function Cohort() {
    return (
        <>
            <main>
                <MyCohort />
            </main>
            <aside>
                <Teachers />
                <MyExercises />
            </aside>
        </>
    )
}

export default Cohort;