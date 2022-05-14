import { createStore, applyMiddleware} from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import composeWithDevTools from 'redux';

import thunk from 'redux-thunk';
import RootReducer from './Reducer/RootReducer';



const Store = createStore(
    RootReducer,
    applyMiddleware(thunk)
)


export default Store