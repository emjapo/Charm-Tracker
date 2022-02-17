import { Meteor } from 'meteor/meteor';

import { eventsCollection } from '/imports/api/events';
import { clientCollection } from '/imports/api/clients';
import { vendorCollection } from '/imports/api/vendors';

function insertEvent({ date, startTime, endTime, price }) {
  eventsCollection.insert({date, startTime, endTime, price, createdAt: new Date()});
}

function insertClient({ firstName, lastName, email, phoneNum, street, city, state, zip }) {
  clientCollection.insert({firstName, lastName, email, phoneNum, street, city, state, zip, createdAt: new Date()});
}

function insertVendors({ vendorType, vendorName }) {
  vendorCollection.insert({ vendorType, vendorName, createdAt: new Date()});
}

Meteor.startup(() => {
    //Synchronize 'events' collection with every subscriber
    Meteor.publish("events/all", function() {
      return eventsCollection.find();
    });

    //Synchronize 'clients' collection with every subscriber
    Meteor.publish("clients/all", function() {
      return clientCollection.find();
    });

    //Synchronize 'vendors' collection with every subscriber
    Meteor.publish("vendors/all", function() {
      return vendorCollection.find();
    });
});
