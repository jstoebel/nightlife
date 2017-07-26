import React, {Component} from 'react';
import { render } from 'react-dom';
import {Alert} from 'react-bootstrap'

export default class rsvpButton extends Component {
    constructor(props) {
        super(props)
        this.render = this.render.bind(this);
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    }

    handleAlertDismiss(event) {
        console.log('handleAlertDismiss')
        console.log(this)
        this.props.removeError(this.props.idx)
    }

    render() {
        return (
            <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
              <h4>{this.props.message}</h4>
            </Alert>
        )
    }
}