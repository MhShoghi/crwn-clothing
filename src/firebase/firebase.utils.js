import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"

const config = {
    apiKey: "AIzaSyAN-HqSrWJ_57Lm-BtkVOUAWFZGN1AcnNw",
    authDomain: "mhsh-crwn-clothing.firebaseapp.com",
    databaseURL: "https://mhsh-crwn-clothing.firebaseio.com",
    projectId: "mhsh-crwn-clothing",
    storageBucket: "mhsh-crwn-clothing.appspot.com",
    messagingSenderId: "487985575385",
    appId: "1:487985575385:web:da868a9e89827e6395d5c8"
};

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();



export const createUserProfileDocument = async (userAuth, ...additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists){

        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }catch (e) {
            console.log("error : "+ e)
        }
    }


    return userRef;
};
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    'prompt': 'select_account'
})

export const SignInWithGoogle = () => auth.signInWithPopup(provider);
export default firestore;