## Table of contents
[General info](#general-info)
[Technologies](#technologies)
[Setup](#setup)

## General Info
Recipair app is a mobile application that allows users to add recipes and create a shop list with ingredients for the selected recipes.
Users can create multiple shop lists and determine how many portions of each meal should be included in the shop list. 
Users can also add the items or ingredients not included in any recipe.

## Technologies
### Firebase real-time database
Firebase is a cloud-hosted NoSQL database that lets you store and sync data between your users in real-time.
### React
This project is built using React, a popular Javascript library
### Vite
Vite is a front-end tool for building web applications quickly.
### TypeScript
A strongly typed programming language that builds on JavaScript.
### Custom hooks
To manage state and encapsulate logic.
### React Router
React Router enables us to implement dynamic routing, allowing users to navigate between different pages and components seamlessly.

### Setup
1. Clone this repository.
2. Open the project in Visual Studio Code (or console) and enter the folder recipe-to-list-app.
3. Enter the command 'npm install'.
4. Create an account and create a new Firebase project.
5. Copy code from Firebase Project Settings and replace it in the files firebaseConfig.tsx (example code below).

```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcSL-",
  authDomain: "recipair-d6259.firebaseapp.com",
  databaseURL: "https://recipair-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recipair-d62",
  storageBucket: "recipair-dklj.appspot.com",
  messagingSenderId: "620102378428",
  appId: "1:620102378428:web:kljlj",
  measurementId: "G-95Q5WJH19L"
};
```
6. Copy your const firebaseConfig (from point 5) and replace it in useDatabase.tsx.
7. Enter commnad 'npm run dev'
8. Enjoy the app.

I suggest deploying it on Vercel and using it as a mobile app.
