import { useState } from 'react';
import SearchIcon from "../../assets/icons/searchIcon";
import Card from "../card";
import TextInput from "../form/textInput";
import './style.css';
import UserListElement from '../UserListElement';
import DropDown from '../dropDown';
import Collapsible from '../collapsible';


function StudentInfo() {
    const [searchPeopleVal, setSearchPeopleVal] = useState('');
    const [searchNotesVal, setSearchNotesVal] = useState('');

    

    const onChangeSearchPeople = (e) => {
        setSearchPeopleVal(e.target.value);
    };

    const onChangeSearchNotes = (e) => {
        setSearchNotesVal(e.target.value);
    };

    return (
        <>
            <Card>
                <div className="border-bottom">
                    <div className="studentInfoTop">
                        <h1>Student info</h1>
                        <form className="searchField" onSubmit={(e) => e.preventDefault()}>
                            <TextInput icon={<SearchIcon />} placeholder="Search for people" value={searchPeopleVal} name="SearchPeople" onChange={onChangeSearchPeople} />
                        </form>
                    </div>
                </div>

                <div className="border-bottom">
                    <div className="course_cohort_student">
                        {/*TODO: add drop-down lists*/}
                        <div>
                            <p className="greyText">Course</p>
                            <DropDown />
                        </div>
                        <div>
                            <p className="greyText">Cohort</p>
                            <DropDown />
                        </div>
                        <div>
                            <p className="greyText">Student</p>
                            <DropDown />
                        </div>
                    </div>
                </div>

                {/*TODO: replace static data with data from API*/}
                <div className="gridCohortStuff">
                    <div className="innerGridCohortStuff right-border">
                        <div>
                            <h2>Cohort Exercises</h2>
                        </div>
                        <div>
                            <p className="greyText">Course</p>
                            <h4>Software Development</h4>
                        </div>
                        <div>
                            <Collapsible label={
                                <>
                                    <p className="greyText">Module</p>
                                    <h4>User Interface with HTML & CSS</h4>
                                </>
                            }>
                                <div className="grid-collapsible-inner">
                                    <div>
                                        <Collapsible label={
                                    <>
                                        <p className="greyText">Unit</p>
                                        <h5>TDD</h5>
                                    </>
                                        }>
                                            <p className="greyText">Cohort Exercises</p>
                                            <input type="checkbox" id="c1" /><label for="c1">Ex1</label><br/>
                                            <input type="checkbox" id="c2" /><label for="c2">Ex2</label><br/>
                                        </Collapsible>
                                    </div>
                                    <div>
                                        <Collapsible label={
                                    <>
                                        <p className="greyText">Unit</p>
                                        <h5>Spotify</h5>
                                    </>
                                        }>
                                            <p className="greyText">Cohort Exercises</p>
                                            <input type="checkbox" id="c1" /><label for="c1">Ex1</label><br/>
                                            <input type="checkbox" id="c2" /><label for="c2">Ex2</label><br/>
                                        </Collapsible>
                                    </div>
                                    <div>
                                        <Collapsible label={
                                    <>
                                        <p className="greyText">Unit</p>
                                        <h5>Twitter</h5>
                                    </>
                                        }>
                                            <p className="greyText">Cohort Exercises</p>
                                            <input type="checkbox" id="c1" /><label for="c1">Ex1</label><br/>
                                            <input type="checkbox" id="c2" /><label for="c2">Ex2</label><br/>
                                        </Collapsible>
                                    </div>
                                    <div>
                                        <Collapsible label={
                                    <>
                                        <p className="greyText">Unit</p>
                                        <h5>JS Fundamentals</h5>
                                    </>
                                        }>
                                            <p className="greyText">Cohort Exercises</p>
                                            <input type="checkbox" id="c1" /><label for="c1">Ex1</label><br/>
                                            <input type="checkbox" id="c2" /><label for="c2">Ex2</label><br/>
                                        </Collapsible>
                                    </div>
                                </div>
                            </Collapsible>
                        </div>
                    </div>

                    <div className="innerGridCohortStuff">
                        <div>
                            <div className="border-bottom">
                                <h2>Notes</h2>
                            </div>
                            {/* <UserListElement /> */}
                            <form className="searchField" onSubmit={(e) => e.preventDefault()}>
                                <TextInput icon={<SearchIcon />} placeholder="Search notes" value={searchNotesVal} name="SearchNotes" onChange={onChangeSearchNotes} />
                            </form>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
};

export default StudentInfo;