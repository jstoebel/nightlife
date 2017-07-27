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
        this.alreadyAttending = this.alreadyAttending.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        // const currentBarIds = this.props.currentRSVPs.map((bar, i) => bar.barId)

        this.state = {
            alreadyAttending: this.alreadyAttending(this.props)
        }

    }

    componentWillReceiveProps(nextProps) {

        if (this.props.currentRSVPs !== nextProps.currentRSVPs) {
            // currnentRSVPs is different. Change state to rerender!

            this.setState({
                alreadyAttending: this.alreadyAttending(nextProps)
            })
        } // end if
    }

    alreadyAttending(props) {
        // determines if the user in this session is already attending this bar
        // props(object): the props to consider (typically this.props or nextProps)
        const currentBarIds = props.currentRSVPs.map((bar, i) => bar.barId)
        return _.includes(currentBarIds, props.bar.id)
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
            this.props.onFetchBars() //reload rsvps into the store.
        }).catch((error) => {
            if (error.response.status == 401) {
                // user isn't logged in
                window.location.href = '/login';
                this.props.onAddError("Please login!")
            } else {
                console.warn(`request failed with code ${error.response.status}: ${error.response.statusText}`)
            }
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