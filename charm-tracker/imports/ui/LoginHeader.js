import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class LoginHeader extends React.Component {
    render() { // #FIXME: image won't display
        return (
            <div>
                <img src='/public/images/southerncharmslogo.png' alt='Southern Charms logo'></img> 
            </div>
        );
    }
};