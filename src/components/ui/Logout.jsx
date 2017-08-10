import React, {Component} from 'react';

export default class Logout extends Component {

    constructor(props) {
        super(props);
     
    }
    componentWillMount() {
        // logout the user
        this.props.onLogout()
        this.props.onAddError("You've been logged out.")
        this.props.history.push('/')
    }

    render() {
        return(
            <div>{"logging you out..."}</div>
        )
    }
}