import Card from "../card";
import Button from "../button";
import "./style.css";

// Completely hard coded as there's no data for Exercises

const MyExercises = () => {
    return(
        <>
            <Card>
                <h2 className="border-bottom">My Exercises</h2>
                <br/>
                <section class="stats">
                <div className="row">
                    <span>Modules:</span> 
                    <span>2/7 completed</span>
                </div>
                <div className="row">
                    <span>Units:</span> 
                    <span>4/10 completed</span>
                </div>
                <div className="row">
                    <span>Exercises:</span> 
                    <span>34/58 completed</span>
                </div>
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