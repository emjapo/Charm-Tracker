import React from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { eventCollection } from '../imports/api/events';
import { clientCollection } from '../imports/api/clients';
import { vendorCollection } from '../imports/api/vendors';
import { vendorTypeCollection } from '../imports/api/vendorTypes';

// import { UP_Collection_Access } from './../imports/api/user_posts.js';
import App from "./../imports/ui/App.js"

Meteor.startup(function () {
  Tracker.autorun(function () {
    // need to check for updates from the db here so that way the changes will be reflected everywhere else
    let vendors = vendorCollection.find({}).fetch()
    let vendorTypes = vendorTypeCollection.find({}).fetch()
    let clients = clientCollection.find({}).fetch()
    let events = eventCollection.find({}).fetch()

    ReactDom.render(
      <App />,
      document.getElementById("react-target")
    )
  })
})
