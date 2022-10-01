const { createSlice, configureStore } = require("@reduxjs/toolkit");

const usersSlice = createSlice({
    name:'users',
    initialState:[{
        token : null,
        userId: null,
    }],
    reducers : {
        addTask:  (state, action) => {
            const nexTask = {
                id: Date.now(),
                done:false,
                text: action.payload
            };
            state.push(nexTask)
        },
        toggleTask: (state, action) => {
            const task = state.find((t) => t.id === action.payload)
            task.done = !task.done;
        },
        deleteTask: (state, action) => {
            state = state.filter((t) => t.id !== action.payload)
            return state
        },
        actionSignup:  (email, password) => {
            return async ( ) =>  { 
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

    }

})

export const store2 = configureStore({
    reducer: {
        todo: usersSlice.reducer
    }
}) 


export const {addTask , deleteTask , toggleTask,actionSignup } = usersSlice.actions