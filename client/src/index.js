import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App.js";
import reportWebVitals from "./web/reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { store } from './app/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

