import React from 'react';
import Overview from './components/Overview';
import './styles/tailwind.css';
import './styles/main.scss';

function App() {
    return (
        <div>
            <div className="header">
                <div className="container">
                    <div className="flex items-center">
                        <h1 className="flex-1">Unity Publisher Client</h1>
                        <a href="https://publisher.assetstore.unity3d.com/">Go to Unity Publisher Administration</a>
                    </div>
                </div>
            </div>
            <div className="container">

                <Overview></Overview>
            </div>
        </div>
    );
}

export default App;
