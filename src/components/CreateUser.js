import React, { Component } from 'react'

class CreateUser extends Component {
    state = {
        username: ''
    }

    handleChange = e => this.setState({username: e.target.value})
    
    handleSubmit = e => {
        e.preventDefault();
        const newUser = this.state.username;
        console.log(newUser);
        this.setState({username: ''})
    }

    render() {
        const {username} = this.state;
        return (
            <div className="my-5">
                <h3>Create New User</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Create New User</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser
