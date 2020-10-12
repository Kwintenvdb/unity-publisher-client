import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Overview from './components/Overview';
import './styles/tailwind.css';
import './styles/main.scss';
import { Reviews } from './components/pages/Reviews';
import { Sidebar } from './components/common/Sidebar';

function App() {
    return (
        <Router>
            <div className="h-full">
                {/* <div className="header">
                    <div className="container">
                        <div className="flex items-center">
                            <h1 className="flex-1">Unity Publisher Client</h1>
                            <a href="https://publisher.assetstore.unity3d.com/">Go to Unity Publisher Administration</a>
                        </div>
                    </div>
                </div> */}
                {/* <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/reviews">Reviews</Link>
                            </li>
                        </ul>
                    </nav>
                </div> */}

                <div className="flex h-full">
                    <div className="self-stretch">
                        <Sidebar></Sidebar>
                    </div>

                    <div className="max-h-full w-full py-10 px-16 overflow-y-auto">
                        <Switch>
                            <Route path="/reviews">
                                <Reviews></Reviews>
                            </Route>

                            <Route path="/" exact strict>
                                <Overview></Overview>
                            </Route>
                        </Switch>
                    </div>
                </div>


            </div>
        </Router>
    );
}

export default App;
