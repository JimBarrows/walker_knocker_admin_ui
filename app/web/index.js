import {hashHistory, IndexRoute, Route, Router} from "react-router";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import {syncHistoryWithStore} from "react-router-redux";
import { createBrowserHistory } from 'history';
import Layout from "./components/Layout";
// import requireAuthentication from "./components/AuthenticatedComponent";
import store from "../store";
import index from "./containers/index.js";
import {client} from "../reducers";

const history = syncHistoryWithStore(hashHistory, store);
const mountNode = document.getElementById('root');

// let token = localStorage.getItem('token');
// if (token !== null) {
//     store.dispatch(loginUserSuccess(token));
// }
// <IndexRoute component={requireAuthentication(DeckList)}></IndexRoute>

ReactDOM.render(<ApolloProvider store={store} client={client}>
		<Router history={history}>
			<Route path="/" component={Layout}>
				<IndexRoute component={index}></IndexRoute>
			</Route>
		</Router>
	</ApolloProvider>
	, mountNode);
