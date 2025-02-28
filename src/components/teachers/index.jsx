import Card from "../card";
import {useState, useEffect} from 'react';
import { getUsers } from '../../service/apiClient';
import UserListElement from "../UserListElement";
import "./style.css";


const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    /*
     Currently getting all users and filtering them in the frontend. 
      - Should probably be done in backend (?)
    */
    useEffect(() => {
        getUsers().then((users) => {
            const teachers = users.filter((user) => user.role === 'TEACHER');
            setTeachers(teachers);
            setIsLoading(false);
        });
    },[])

  return (
    <Card>
        <h1 className="border-bottom">Teachers</h1>
        {isLoading 
        ? <h4>Loading...</h4> 
        : teachers.map((teacher) => (
        <UserListElement key={teacher.id} user={teacher} />
      ))} 
    </Card>
    );
}

export default Teachers;