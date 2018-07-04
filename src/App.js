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
          if (this.state.chatList.findIndex(e => e.id === doc.id) === -1) {
            let newMessage = doc.data()
            newMessage.id = doc.id
            newMessage.number = Math.floor(Math.random() * 11)
            // newMessage.expire = 60
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
      return <ul key={chat.id} className={ chat.number % 2 === 0 ? 'Color1' : 'Color2'}>{chat.message}</ul>
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
