const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor(){

        this.firebaseConfig = {
            
            apiKey: "AIzaSyAEREbdliY2_Lgn3tECP86HtWyJ45-EkVY",

            authDomain: "whatsapp-clone-4cd4c.firebaseapp.com",
        
            projectId: "whatsapp-clone-4cd4c",
        
            storageBucket: "gs://whatsapp-clone-4cd4c.appspot.com",
        
            messagingSenderId: "1080611069810",
        
            appId: "1:1080611069810:web:75d68bec44924d8fb8c7eb"
        
        }

        this.init();

    }

    init(){

        if (!window._initializedFirebase) {
            firebase.initializeApp(this.firebaseConfig);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;
        }
    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();

    }

    initAuth(){

        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result => {


                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user,
                    token
                });

            });
            
            
            }).catch(err=>{

                f(err);

            });

        

        }
    }
