import { Meteor } from 'meteor/meteor';

import { eventCollection } from './../imports/api/events';
import { clientCollection } from './../imports/api/clients';
import { vendorCollection} from '../imports/api/vendors';
import { vendorTypeCollection } from '../imports/api/vendorTypes';

function insertEvent({ date, startTime, endTime, price }) {
  eventsCollection.insert({date, startTime, endTime, price, createdAt: new Date()});
}

function insertClient({ firstName, lastName, email, phoneNum, street, city, state, zip }) {
  clientCollection.insert({firstName, lastName, email, phoneNumber, street, city, state, zip, createdAt: new Date()});
}

//vendorType: ID of the vendorType for th evendor in the venderType collection
//vendorName: name of the vendor
function insertVendors({ vendorType, vendorName }) {
  vendorCollection.insert({ vendorType, vendorName, createdAt: new Date()});
}

//vendorType: string containing the type of vendor 
function insertVendors({vendorType}) {
  vendorTypeCollection.insert({ vendorType, createdAt: new Date()});
}

Meteor.startup(() => {
    //Synchronize 'events' collection with every subscriber
    Meteor.publish("events/all", function() {
      return eventCollection.find();
    });

    //Synchronize 'clients' collection with every subscriber
    Meteor.publish("clients/all", function() {
      return clientCollection.find();
    });

    //Synchronize 'vendors' collection with every subscriber
    Meteor.publish("vendors/all", function() {
      return vendorCollection.find();
    });

    //Synchronize 'vendorTypes' collection with every subscriber
    Meteor.publish("vendorTypes/all", function() {
      return vendorTypeCollection.find();
    });
});
