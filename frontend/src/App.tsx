import { BaseProvider, createLightTheme, LightTheme, lightThemePrimitives } from 'baseui';
import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { AuthProvider } from './components/authentication/AuthContext';
import { AuthRoute } from './components/authentication/AuthRoute';
import { Sidebar } from './components/common/Sidebar';
import { Overview } from './components/Overview';
import { Login } from './components/pages/Login';
import { Packages } from './components/pages/Packages';
import { Reviews } from './components/pages/Reviews';
import { Settings } from './components/pages/Settings';
import './styles/main.scss';
import './styles/tailwind.css';

const engine = new Styletron();

const borderRadius = LightTheme.borders.radius200;

const theme = createLightTheme({

    // primaryFontFamily: 'Source Sans Pro'
}, {
    borders: {
        surfaceBorderRadius: borderRadius,
        buttonBorderRadius: borderRadius,
        inputBorderRadius: borderRadius
    },
    colors: {
        linkText: LightTheme.colors.accent,
        linkVisited: LightTheme.colors.accent500,
        linkHover: LightTheme.colors.accent600,
        tableHeadBackgroundColor: '#f9f9f9'
    },
    typography: {
        ParagraphSmall: {
            fontSize: '16px'
        }
    },
});

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
                            {/* <ReactQueryDevtools initialIsOpen /> */}

                            <Router>
                                <Switch>
                                    <Route path="/login">
                                        <Login></Login>
                                    </Route>
                                    <Route>
                                        <div className="h-full">
                                            <div className="flex h-full">
                                                <div className="self-stretch">
                                                    <Sidebar></Sidebar>
                                                </div>

                                                <div className="max-h-full w-full py-10 px-16 overflow-y-auto">
                                                    <Switch>
                                                        <AuthRoute path="/packages">
                                                            <Packages></Packages>
                                                        </AuthRoute>

                                                        <AuthRoute path="/reviews">
                                                            <Reviews></Reviews>
                                                        </AuthRoute>

                                                        <AuthRoute path="/settings">
                                                            <Settings></Settings>
                                                        </AuthRoute>

                                                        <AuthRoute path="/" exact strict>
                                                            <Overview></Overview>
                                                        </AuthRoute>
                                                    </Switch>
                                                </div>
                                            </div>
                                        </div>
                                    </Route>
                                </Switch>
                            </Router>
                        </ReactQueryCacheProvider>
                    </BaseProvider>
                </StyletronProvider>
            </AuthProvider>
        </div>


    );
}

export default App;
