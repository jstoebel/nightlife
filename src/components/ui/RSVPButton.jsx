import React, {Component} from 'react';
import { render } from 'react-dom';
import {Button} from 'react-bootstrap'

export default class rsvpButton extends Component {
    constructor(props) {
        super(props)
        this.render = this.render.bind(this);
    }

    handleRSVP(event) {
        // axios.post('/api/users/rsvp/')
        console.log('hello from handleRSVP')
    }

    handleUnRSVP(event) {
        console.log('hello from handleUnRSVP')
    }

    render() {
        return (
            <Button
                bsStyle={this.props.attending ? "default" : "primary"}
                bsSize="xsmall"
                onClick={this.props.attending ? this.UnhandleRSVP : this.handleRSVP }
            >
            {this.props.attending ? "changed my mind" : "I'll be there"}
            </Button>
        )
    }
}