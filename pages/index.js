import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';  // Add any CSS file for global styles
import App from '../client/pages/App';  // Import your main App component

// This will render your React app into the DOM (in the 'root' div in index.html)
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
