import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { CourseContextProvider } from './context/CourseContext.jsx';

//export const server = process.env.REACT_APP_API_URL;

export const server='https://courseforge-server-1.onrender.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
           <App />
      </CourseContextProvider>
 
    </UserContextProvider>
  </React.StrictMode>,
);
