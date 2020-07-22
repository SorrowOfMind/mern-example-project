import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise = () => {
    const [exercise,
        setExercise] = useState({username: '', description: '', duration: 0, date: new Date()});
    const [users,
        setUsers] = useState([]);

    useEffect(() => {
        setUsers(['test user 1', 'test user 2']);
        setExercise(prevExercise => ({
            ...prevExercise,
            username: 'test user 1'
        }))
    }, [])

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
        console.log(newExercise);
        window.location = '/';
    }
    return (
        <div className="my-5">
            <h3>Create New Exercise Excerpt</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username :</label>
                    <select
                        // ref="userInput"
                        required
                        className="form-control"
                        value={exercise.user}
                        name="username"
                        onChange={handleChange}
                        >
                        {users.map(user => (<option key={user} value={user}>{user}</option>))}
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
