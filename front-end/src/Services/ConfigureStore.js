import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk, loggerMiddleware)),
  );
}
