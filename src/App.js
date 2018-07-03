import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { init as firebaseInit } from './firebaseconfig'
import firebase from 'firebase'




class App extends Component {

  constructor(props) {
    super(props);
    firebaseInit()
    this.state = {
      chatList: [],
      totalChat: 0 
    }
  }

  componentDidMount() {
    
    let db = firebase.firestore()
    db.settings({ timestampsInSnapshots: true })
    var doc = db.collection('messages')
    var observer = doc.orderBy("date_created").onSnapshot(querySnapshot => {
        let chat = querySnapshot.docs.map(doc => {
        let isNew = true
        this.state.chatList.forEach(e => {
          if (e.id === doc.id) {
            isNew = false
          }
        })
        if (isNew) {
          let newMessage = doc.data()
          newMessage.id = doc.id
          this.setState(prev => ({
            chatList: [...prev.chatList,newMessage],
            totalChat: (prev.totalChat + 1)
          }), () => {
            console.log(this.state)
          })
        }
        return doc.data()
      })
      
    }, err => {
      console.log(err)
    }, () => {
      
    })
    
  }

  render() {
    
    let chatlog = this.state.chatList.map((chat) => {
      return <ul key={chat.date_created}>{chat.message}</ul>
    })

    return (
      <div className="App">
      <div>{chatlog}</div>
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
