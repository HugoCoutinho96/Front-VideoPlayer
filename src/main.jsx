import React from 'react'
import ReactDOM from 'react-dom/client'
import {Home} from "./pages/Home"
import GlobalStyled from "./styles/global"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyled/>
      <Home/>
  </React.StrictMode>,
)
