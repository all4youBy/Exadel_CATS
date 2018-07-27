import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';

const loggerMiddleware = createLogger();
export const history = createHistory();
const middlewareRouter = routerMiddleware(history);
export function configureStore() {
  return createStore(reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware, middlewareRouter)));
}
export const store = configureStore();
export default store;
