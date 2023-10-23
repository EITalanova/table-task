import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.scss";
import App from "./components/App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { persistor } from "./redux/store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="/table-task">
      <React.StrictMode>
        <App />
        </React.StrictMode>
        </BrowserRouter>
   </PersistGate>
  </Provider> 
);