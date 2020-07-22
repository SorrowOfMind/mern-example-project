import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = (props) => {
    const [exercise, setExercise] = useState({
        username: '', 
        description: '', 
        duration: 0, 
        date: new Date()
    });
    const [users ,setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`/exercises/${props.match.params.id}`)
            .then(res => {
                const {username, description, duration, date} = res.data;
                setExercise({
                    username,
                    description,
                    duration,
                    date: new Date(date)
                });
            })
            .catch(err => console.log(err.message));

        axios.get('/users')
            .then(res => setUsers(res.data))
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
        axios.put(`/exercises/update/${props.match.params.id}`, newExercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.message));
        window.location = '/';
    }
    return (
        <div className="my-5">
            <h3>Edit Exercise</h3>
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
                        {users && users.map(user => (<option key={user._id} value={user.username}>{user.username}</option>))}
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
                    <button type="submit" className="btn btn-primary">Edit Log</button>
                </div>
            </form>
        </div>
    )
}

export default EditExercise
