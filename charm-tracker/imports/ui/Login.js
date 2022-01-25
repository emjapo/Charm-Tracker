import React from 'react';
import { Meteor } from 'meteor/meteor';
import LoginHeader from './LoginHeader';

export default class Login extends React.Component {
    render() { // OAuth URI is not compatable with localhost:3000
        return (
            <div>
                <LoginHeader />
                <p>login</p>
            </div>
        );
    }
};