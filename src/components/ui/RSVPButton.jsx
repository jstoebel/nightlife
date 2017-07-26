import React, {Component} from 'react';
import { render } from 'react-dom';
import {Button} from 'react-bootstrap'
import _ from 'lodash'

import axios from 'axios'

export default class rsvpButton extends Component {
    constructor(props) {
        super(props)

        this.render = this.render.bind(this);
        this.handleRSVP = this.handleRSVP.bind(this);
        const currentBarIds = this.props.currentRSVPs.map((bar, i) => bar.barId)

        this.state = {
            alreadyAttending: _.includes(currentBarIds, this.props.bar.id)
        }

    }

    handleRSVP(event) {
        // console.log(this.props.bar)
        axios({
            method: 'POST',
            url: `${API_URL}/bars/rsvp/`,
            data: {
                rsvp: !this.state.alreadyAttending,
                bar: {
                    barId: this.props.bar.id,
                    name: this.props.bar.name,
                }
            },
            headers: {'Authorization': cookie.load('token')},
        }).then((response) => {
            console.log("request succeeeded")
            console.log(response)
            // TODO: refetch bars here!
        }).catch((error) => {
            console.warn("requested failed")
            console.warn(error)
        })

    }

    render() {
        return (
            <Button
                bsStyle={this.state.alreadyAttending ? "default" : "primary"}
                bsSize="xsmall"
                onClick={this.handleRSVP }
            >
            {this.state.alreadyAttending ? "changed my mind" : "I'll be there"}
            </Button>
        )
    }
}