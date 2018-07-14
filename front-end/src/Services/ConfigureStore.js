import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(reducers, compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));
}
