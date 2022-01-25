import React from 'react';
// import { UP_Collection_Access } from './../api/user_posts.js';
import Title from './Title.js';
import Login from './Login.js';
import PropTypes from 'prop-types';

export default class App extends React.Component {
    render() {
        return (
            <>
                <Title title={this.props.passedPropTitle} />
                <Login />
            </>
        );
    }
};

App.propTypes = {
    passedPropTitle: PropTypes.string.isRequired
};