import React from 'react';
import Overview from './components/Overview';
import './styles/tailwind.css';
import './styles/main.scss';

function App() {
    return (
        <div>
            <div className="header">
                <div className="container">
                    <h1>Unity Publisher Client</h1>
                </div>
            </div>
            <div className="container">

                <Overview></Overview>
            </div>
        </div>
    );
}

export default App;
