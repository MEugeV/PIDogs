import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk"
// import {composeWithDevTools} from "redux-devtools-extension" //no lo tengo importado

// const middleware= [thunk]


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));


// const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;

// const store= createStore(
//     reducer,
//     compose(
//         composeEnhancer(applyMiddleware(thunk))))



// const store = createStore(
//     reducer, 
//     composeWithDevTools(applyMiddleware(thunk)));

export default store

// import thunkMiddleware from 'redux-thunk'

// const store = createStore(
// reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(thunkMiddleware),
// );


//Todo lo que compose hace es permitirte escribir funciones transformadoras anidades fácilmente