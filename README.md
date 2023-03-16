Chat App
A chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

Built With
JavaScript
React Native
Expo
Google Firestore Database
Links
GitHub repository Link



My Role
Full-Stack Web Developer

User Stories
As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family

As a user, I want to be able to send messages to my friends and family members to exchange the latest news.

As a user, I want to send images to my friends to show them what I’m currently doing.

As a user, I want to share my location with my friends to show them where I am.

As a user, I want to be able to read my messages offline so I can reread conversations at any time.

As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

Features
A page where users can enter their name and choose a background color for the chat screen before joining the chat.

A page displaying the conversation, as well as an input field and submit button.

The chat must provide users with two additional communication features: sending images and location data.

Data gets stored online and offline.

Setting up development environment
Install Expo CLI: npm install expo-cli -g
and login with your Expo account using expo login

Use npm ito install necessary project dependencies

Install the Expo App from your mobile devices App-/Playstore for testing or

Install
Android Studio or
XCode
to emulate mobile devices for testing

Setting up your Database
Sign in at Google Firebase.

Create a new project (you can use start in test mode)

In your project run npm install firebase to install Firestore/Firebase, then import it in your project

const firebase = require('firebase');
require('firebase/firestore');
In Firestore generate your configuration object. Click 'Settings' -> 'General' -> 'Your apps' -> 'Firestore for Web'
and copy your configuration to your project