import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class LoginHeader extends React.Component {
    render() { 
        return (
            <div className='login-header'>
                <img src='/images/southerncharmslogo.png' alt='Southern Charms logo'></img> 
                <h1>Charm Tracker</h1>
            </div>
        );
    }
};