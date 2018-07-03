import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { init as firebaseInit } from './firebaseconfig'
import firebase from 'firebase'




class App extends Component {

  constructor() {
    super();
    firebaseInit()
    this.state = {
      chatList: [] 
    }
  }

  componentDidMount() {
    
    let db = firebase.firestore()
    db.settings({ timestampsInSnapshots: true })
    var doc = db.collection('messages')
    var observer = doc.orderBy("date_created").onSnapshot(querySnapshot => {
      // console.log(querySnapshot.docs.map(doc => {
      //   return doc.data()
      // }))
      
      let chat = querySnapshot.docs.map(doc => {
        return doc.data()
      })

      console.log(chat)

      this.setState(prevState => ({
        arrayvar: [...prevState.arrayvar, newelement]
      }))
        
    }, err => {
      console.log(err)
    }, () => {
      
    })
    
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      </div>
    );
  }
}

export default App;
