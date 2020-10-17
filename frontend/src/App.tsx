import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { createLightTheme, LightTheme, BaseProvider, lightThemePrimitives } from 'baseui';

import Overview from './components/Overview';
import './styles/tailwind.css';
import './styles/main.scss';
import { Reviews } from './components/pages/Reviews';
import { Sidebar } from './components/common/Sidebar';
import { Settings } from './components/pages/Settings';

const engine = new Styletron();

const theme = createLightTheme({}, {
    colors: {
        linkText: LightTheme.colors.accent,
        linkVisited: LightTheme.colors.accent500,
        linkHover: LightTheme.colors.accent600
    }
});

console.log(theme);


function App() {
    return (
        <StyletronProvider value={engine}>
            {/* baseprovider div needs class h-full */}
            <BaseProvider theme={theme} overrides={{
                AppContainer: {
                    style: {
                        height: '100%'
                    }
                }
            }}>
                <Router>
                    <div className="h-full">
                        <div className="flex h-full">
                            <div className="self-stretch">
                                <Sidebar></Sidebar>
                            </div>

                            <div className="max-h-full w-full py-10 px-16 overflow-y-auto">
                                <Switch>
                                    <Route path="/reviews">
                                        <Reviews></Reviews>
                                    </Route>

                                    <Route path="/settings">
                                        <Settings></Settings>
                                    </Route>

                                    <Route path="/" exact strict>
                                        <Overview></Overview>
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </Router>
            </BaseProvider>
        </StyletronProvider>
    );
}

export default App;
