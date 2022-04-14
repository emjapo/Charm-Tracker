import { Mongo } from 'meteor/mongo';

export const taskCollection = new Mongo.Collection('tasks');