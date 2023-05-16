import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import { notes } from './db/notes.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <App notes={notes}/>
)
