import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import ExerciseList from "./components/ExerciseList";
import CreateExercise from "./components/CreateExercise";
import EditExercise from "./components/EditExercise";
import CreateUser from "./components/CreateUser";

function App() {
    return (
        <Router>
            <div className="container">
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={ExerciseList}/>
                    <Route path="/edit/:id" component={EditExercise}/>
                    <Route path="/create" component={CreateExercise}/>
                    <Route path="/user" component={CreateUser}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
