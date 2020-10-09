import React from 'react';
import Overview from './components/Overview';
import './styles/main.scss';
import './styles/tailwind.css';

function App() {
    return (
        <div className="container">
            <h1>Unity Publisher Client</h1>

            <Overview></Overview>
        </div>
    );
}

export default App;
