import React from 'react';
import { Meteor } from 'meteor/meteor';
import LoginHeader from '../LoginHeader';

export default class Login extends React.Component {
    render() { // OAuth URI is not compatable with localhost:3000
        return (
            <div className='login'>
                <LoginHeader />
                <form className='login'>
                    <label>Username</label>
                    <input type='text' id='username' name='username'></input>
                    <label>Password</label>
                    <input type='password' id='password' name='password'></input>
                    <a href='#' className='login-link'>Forgot Password?</a>
                    <input type='submit' id='login'></input>
                </form>
            </div>
        );
    }
};