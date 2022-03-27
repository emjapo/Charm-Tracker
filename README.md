# Charm-Tracker
****************
Charm Tracker keeps track of events, including the tasks needed to host an event, timing and payment for an event, and vendors needed to run the event. Users are updated on deadlines through email and an in app notification. Reports can be run about specific events.

Up to date as of: 3/27/22

## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Contact Info](#contact-info)
5. [FAQs](#faqs)

## General Info
Current Version: 0.28
* A stable internet connection is needed to access the Charm Tracker.
* Payment information stores calculations only, no actual electronic payment is taken/stored.


## Technologies
Code info here (what packages we using, module list/description)
### Packages used:
* [@babel/runtime](https://babeljs.io/docs/en/babel-runtime) - version 7.15.4
* [meteor-node-stubs](https://github.com/meteor/node-stubs) - version 1.1.0
* [prop-types](https://www.npmjs.com/package/prop-types) - version 15.8.1
* [react](https://www.npmjs.com/package/react) - version 17.0.2
* [react-dom](https://www.npmjs.com/package/react-dom) - version 17.0.2

### Components:
* Login Page - Handles user authentication and password retrieval.
* Vendor Input - Handles adding and removing vendors, adding and removing vendor types, and uploading new additions or changes to the internal MongoDB.
* Event Input - Handles creating a new event, including contact info of client and event details like location and price, and includes uploading to MongoDB.
* Report Generation - Handles queries that search the MongoDB for data by searching a date range, name of event, or both. Report output is printed to the screen.
* Edit Event - Handles editing existing events in the MongoDB. Event information is edited here, not contact info (PENDING).
* Calendar - Handles viewing of events on a calendar, as well as showing upcoming tasks that need to be done for the day and tasks associated with the event selected from the calendar.
* Activity Stream - Gives a greater view of upcoming tasks for users to complete, including past due, upcoming, and today's tasks.
* Email Notifications - A component that interacts with the MongoDB to find event tasks that are scheduled a certain amount of days in advance and sends out email notifications to the user about them.

## Start Script
* meteor run

## Installation
install info here (maybe irrelevant?)

## Contact Info
Team Members: Emily Port, Ryan Lumbert, Gerald Wheaton, Marley Jenkins, and Nick Casale
Who to Contact: ???

## FAQs
Any user questions can go here, maybe have team 3 run through our code?
