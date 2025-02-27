import Card from "../card";
import CohortInfoElement from "../cohortInfoElement";
import UserListElement from "../UserListElement";
import "./style.css";
import {useState, useEffect} from 'react';
import { getUsers } from '../../service/apiClient';

function MyCohort() {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //TODO: add filtering of users by cohort. Currently all students are displayed

    useEffect(() => {
        getUsers().then((users) => {
            const students = users.filter((user) => user.role === 'STUDENT');
            setStudents(students);
            setIsLoading(false);
        });
    },[]);

    return (
        <>
            <Card>
                <div className="border-bottom">
                    <h1>My cohort</h1>
                </div>
                <div className="border-bottom">
                    <CohortInfoElement />
                </div>
                <div>
                    <ul className="studentList">
                    {isLoading 
                    ? <h4>Loading...</h4> 
                    : students.map((student) => (
                            <UserListElement key={student.id} user={student} />
                        ))}
                    </ul>
                </div>
            </Card>
        </>
    )
};

export default MyCohort;