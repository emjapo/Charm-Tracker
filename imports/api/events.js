import { Mongo } from 'meteor/mongo';

export const eventCollection = new Mongo.Collection('events');