import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_USER } from "../constants";



//inscription 
export const actionSignup = (email, password) => {
    return async (dispatch ) =>  { 
        // HTTP Request 
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCq00bz80qMmtNppIBO--jzBlaO5oCGxow", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: email, 
                password: password,
                returnSecureToken : true,
            })
        })

        //response 
        if(!response.ok){
            const dataObj = await response.json();
            const msgError = dataObj.error.message;
            let messageError = "Oups ! Nous avons un problème lors de la connexion !";
            if (msgError == "EMAIL_EXISTS"){
                messageError= "Cette adresse email existe déjà !"
            }
            throw new Error(messageError)
        }

        const dataObj = await response.json(); 
        dispatch(actionAuthUser(dataObj.localId, dataObj.idToken))
        const expiresIn = parseInt(dataObj.expiresIn) * 1000;
        const expireDate = new Date().getTime() + expiresIn ;
        const dateTokenExpire = new Date(expireDate).toISOString();
        saveToAsyncStorage(dataObj.idToken,dataObj.localId, dateTokenExpire )

    }
}

//connexion
export const actionLogin = (email, password) => {
    return async ( dispatch) =>  { 
        // HTTP Request 
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCq00bz80qMmtNppIBO--jzBlaO5oCGxow", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: email, 
                password: password,
                returnSecureToken : true,
            })
        })
        //response 
        if(!response.ok){
            const dataObj = await response.json();
            const msgError = dataObj.error.message;
            let messageError = "Oups ! Nous avons un problème lors de la connexion !";
            if (msgError == "EMAIL_NOT_FOUND"){
                messageError= "Adresse email introuvable !"
            }
            if (msgError == "INVALID_PASSWORD"){
                messageError= "Mot de passe incorrect !"
            }
            throw new Error(messageError)
        }
    
        const dataObj = await response.json();

        //dispatch
        dispatch(actionAuthUser(dataObj.localId, dataObj.idToken))

        const expiresIn = parseInt(dataObj.expiresIn) * 1000;
        const expireDate = new Date().getTime() + expiresIn ;
        const dateTokenExpire = new Date(expireDate).toISOString();
        saveToAsyncStorage(dataObj.idToken,dataObj.localId, dateTokenExpire )
    }
}

//enregistrer la data dans AsyncStorage 

const saveToAsyncStorage = async (token,userId, dateTokenExpire )=> { 
    AsyncStorage.setItem("user", JSON.stringify({
        token: token,
        userId: userId, 
        dateTokenExpire: dateTokenExpire
    }))
}

//auth Action 
const actionAuthUser = (userId, token) => {
    return { 
        type:AUTH_USER,
        userId: userId,
        token: token, 
    }
}