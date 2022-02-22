import React from 'react';
import { Meteor } from 'meteor/meteor';

/*
The login header differs from the header and is only used on pages dealing with login and registration
*/

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