import { Meteor } from 'meteor/meteor';
<<<<<<< HEAD
import { LinksCollection } from '/imports/api/links';

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
    });

    insertLink({
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com'
    });

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com'
    });

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com'
    });
  }
=======
import SimpleSchema from 'simpl-schema';

import { eventCollection } from './../imports/api/events';
import { clientCollection } from './../imports/api/clients';
import { vendorCollection} from '../imports/api/vendors';
import { vendorTypeCollection } from '../imports/api/vendorTypes';



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

  Meteor.methods({
    'vendors.updateEventsAdd'({ newVendorType }) {
      new SimpleSchema({
        newVendorType: { type: String },
      }).validate({ newVendorType });

      // get the current date and format it to html dtate input format
      var q = new Date();
      var month = q.getMonth()+1
      if (month < 10) {
        month = "0" + month
      }
      var date = q.getFullYear()+ "-" + month + "-" + q.getDate();
      console.log(date)
      eventCollection.update({ date: { $gt: date } }, { $set: { [newVendorType]: null } }, { multi: true })
    }
  });

  Meteor.methods({
    'vendors.updateEventsRemove'({ oldVendorType }) {
      new SimpleSchema({
        oldVendorType: { type: String },
      }).validate({ oldVendorType });

      // get the current date and format it to html dtate input format
      var q = new Date();
      var month = q.getMonth() + 1
      if (month < 10) {
        month = "0" + month
      }
      var date = q.getFullYear() + "-" + month + "-" + q.getDate();
      console.log(date)
      eventCollection.update({ date: { $gt: date } }, { $unset: {[oldVendorType]: ""}} , { multi: true } )
    }
  });
>>>>>>> development
});
