import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Login } from './components/pages/Login';
import { Sidebar } from './components/common/Sidebar';
import { AuthRoute } from './components/authentication/AuthRoute';
import { Packages } from './components/pages/packages/Packages';
import { Reviews } from './components/pages/Reviews';
import { Settings } from './components/pages/Settings';
import { Overview } from './components/Overview';
import { useStyletron } from 'baseui';

export function AppContainer() {
    const [css, theme] = useStyletron();
    const background = css({ backgroundColor: theme.colors.background });

    return (
        <div className={'h-full ' + background}>
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
        </div>
    );
}
