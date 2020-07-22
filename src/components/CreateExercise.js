import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise = () => {
    const [exercise,
        setExercise] = useState({username: '', description: '', duration: 0, date: new Date()});
    const [users,
        setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('/users')
            .then(res => setUsers(res.data))
            .then(() => setExercise(prevExercise => ({
                ...prevExercise, username: [users][0].username}))
            )
            .catch(err => console.log(err.message));
    }

    const handleChange = e => {
        const {value, name} = e.target;
        setExercise(prevExercise => ({
            ...prevExercise,
            [name]: value
        }));
    }

    const handleDateChange = date => {
        setExercise(prevExercise => ({
            ...prevExercise,
            date
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        const newExercise = {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        }
        axios.post('/exercises/add', newExercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.message));
        window.location = '/';
    }
    return (
        <div className="my-5">
            <h3>Create New Exercise Excerpt</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username :</label>
                    <select
                        required
                        className="form-control"
                        value={exercise.user}
                        name="username"
                        onChange={handleChange}
                        >
                        {users && users.map(user => (<option key={user.username} value={user.username}>{user.username}</option>))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={exercise.description}
                        onChange={handleChange}
                        name="description"
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes):</label>
                    <input 
                        type="text"
                        className="form-control"
                        name="duration"
                        value={exercise.duration}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="d-block">Date:</label>
                    <DatePicker 
                        selected={exercise.date}
                        onChange={handleDateChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Create Log</button>
                </div>
            </form>
        </div>
    )
}

export default CreateExercise
