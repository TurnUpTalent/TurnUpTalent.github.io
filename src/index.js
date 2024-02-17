import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import {HashRouter, Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import Profile from "./views/admin/profile";

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<BrowserRouter basename={'demo'}>
					<Switch>
						<Route path={`/auth`} component={AuthLayout} />
						<Route path="admin/profile/:id" element={<Profile authed={true}/>} />
						<Route path={`/admin`} component={AdminLayout} />
						<Route path={`/rtl`} component={RtlLayout} />
						<Route
							path="*"
							render={() => (
									<Redirect to="/admin"/> )
						}
						/>
						<Redirect from='/' to='/admin/default' />
					</Switch>
				</BrowserRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
