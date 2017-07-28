import React, {Component} from 'react';
import { render } from 'react-dom';
import {Field} from 'redux-form';
import {} from 'react-bootstrap'

import axios from 'axios'

export default class SearchBar extends Component {
    
    constructor(props) {
        super(props)
        this.render = this.render.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    // handleFormSubmit() {
    //     console.log('hello from handleFormSubmit')
    // }

    handleFormSubmit(formProps) {
        this.props.onSearchBars(formProps.search)
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div>
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div>
                  <Field
                    name="search"
                    className="form-control"
                    component="input"
                    type="text"
                    placeholder="Enter a city or zip code"
                  />
                </div>
              </form>
            </div>

        )
    }
 
}