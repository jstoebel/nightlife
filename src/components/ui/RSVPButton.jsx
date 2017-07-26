import React, {Component} from 'react';
import { render } from 'react-dom';
import {Button} from 'react-bootstrap'

import axios from 'axios'

export default class rsvpButton extends Component {
    constructor(props) {
        super(props)
        this.render = this.render.bind(this);
    }

    handleRSVP(event) {

        console.log('hello from handleRSVP')
        console.log(cookie.load('token'))

        axios({
            method: 'POST',
            url: `${API_URL}/bars/rsvp/`,
            data: {rsvp: true},
            headers: {'Authorization': cookie.load('token')},
            json: true,
        }).then((response) => {
            console.log("request succeeeded")
            console.log(response)
        }).catch((error) => {
            console.warn("requested failed")
            console.warn(error)
        })

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