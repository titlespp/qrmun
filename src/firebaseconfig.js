import * as firebase from 'firebase';

export const init = () => {
    var config = {
        apiKey: "AIzaSyDtIrG_4599tDvKpqtGabfk0gRGDOuGkfs",
        authDomain: "fungjaimun4.firebaseapp.com",
        databaseURL: "https://fungjaimun4.firebaseio.com",
        projectId: "fungjaimun4",
        storageBucket: "fungjaimun4.appspot.com",
        messagingSenderId: "990012855961"
    };
    firebase.initializeApp(config)
}