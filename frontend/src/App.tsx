import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { createLightTheme, LightTheme, BaseProvider } from 'baseui';

import './styles/tailwind.css';
import './styles/main.scss';
import { Overview } from './components/Overview';
import { Reviews } from './components/pages/Reviews';
import { Sidebar } from './components/common/Sidebar';
import { Settings } from './components/pages/Settings';

import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider, useQuery } from 'react-query';
import { AuthRoute } from './components/authentication/AuthRoute';
import { Login } from './components/pages/Login';
import { AuthProvider } from './components/authentication/AuthContext';

const engine = new Styletron();

const theme = createLightTheme({
    primaryFontFamily: 'Source Sans Pro'
}, {
    colors: {
        linkText: LightTheme.colors.accent,
        linkVisited: LightTheme.colors.accent500,
        linkHover: LightTheme.colors.accent600
    },
    typography: {
        ParagraphSmall: {
            fontSize: '16px'
        }
    }
});

console.log(theme);

const queryCache = new QueryCache();

function App() {
    return (
        <div className="h-full">

            <AuthProvider>
                <StyletronProvider value={engine}>
                    {/* baseprovider div needs class h-full */}
                    <BaseProvider theme={theme} overrides={{
                        AppContainer: {
                            style: {
                                height: '100%'
                            }
                        }
                    }}>
                        <ReactQueryCacheProvider queryCache={queryCache}>
                            <ReactQueryDevtools initialIsOpen />

                            <Router>
                                <div className="h-full">
                                    <div className="flex h-full">
                                        <div className="self-stretch">
                                            <Sidebar></Sidebar>
                                        </div>

                                        <div className="max-h-full w-full py-10 px-16 overflow-y-auto">
                                            <Switch>
                                                <AuthRoute path="/reviews">
                                                    <Reviews></Reviews>
                                                </AuthRoute>

                                                <AuthRoute path="/settings">
                                                    <Settings></Settings>
                                                </AuthRoute>

                                                <Route path="/login">
                                                    <Login></Login>
                                                </Route>

                                                <AuthRoute path="/" exact strict>
                                                    <Overview></Overview>
                                                </AuthRoute>
                                            </Switch>
                                        </div>
                                    </div>

                                </div>
                            </Router>
                        </ReactQueryCacheProvider>
                    </BaseProvider>
                </StyletronProvider>
            </AuthProvider>
        </div>


    );
}

export default App;
