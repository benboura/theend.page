
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import App from './App.jsx'
import Create from './pages/Create.jsx'
import View from './pages/View.jsx'
import Gallery from './pages/Gallery.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<Create />} />
        <Route path="/end/:id" element={<View />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
