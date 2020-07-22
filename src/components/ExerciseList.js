import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Exercise from './Exercise';

class ExerciseList extends Component {
    state = {
        exercises: []
    }

    componentDidMount = () => {
        this.fetchExercises()
    };

    fetchExercises = () => {
        axios.get('/exercises')
            .then(res => this.setState({exercises: res.data}))
            .catch(err => console.log(err.message));
    };

    deleteExercise = (id) => {
        axios.delete(`/${id}`)
            .then(res => console.log(res.data))
            .then(() => this.setState(prevState => ({exercises: prevState.filter(exe => exe._id !== id)})))
    }

    createExeList = () => {
        return this.state.exercises.map(exercise => <Exercise exercise={exercise} deleteExecise={this.deleteExercise} key={exercise._id}/>)
    }

    render() {
        return (
            <div className="my-5">
                <h3>All Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createExeList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExerciseList;
