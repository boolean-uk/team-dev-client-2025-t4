import Card from "../card";
import Button from "../button";

// Completely hard coded as there's no data for Exercises

const MyExercises = () => {
    return(
        <>
            <Card>
                <h2 className="border-bottom">My Exercises</h2>
                <br/>
                <section>
                    <p>Modules: 2/7 completed</p>
                    <p>Units: 4/10 completed</p>
                    <p>Exercises: 34/58 completed</p>
                </section>
                <br/>
                <section >
                    <Button
                    text="See Exercises"
                    classes={`offwhite width-1/2`}
                    disabled={true}
                    />
                </section>
            </Card>
        </>
    )
}

export default MyExercises;