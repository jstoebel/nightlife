import React, {Component} from 'react';
import { render } from 'react-dom';
import {Alert} from 'react-bootstrap'

export default class ErrorMessage extends Component {
    constructor(props) {
        super(props)
        this.render = this.render.bind(this);
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    }

    handleAlertDismiss(event) {
        // close the error message and remove from store
        this.props.removeError(this.props.idx)
    }

    render() {
        // a single error message
        return (
            <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
              <h4>{this.props.message}</h4>
            </Alert>
        )
    }
}