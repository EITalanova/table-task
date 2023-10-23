import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// import { PrivateRoute } from "../hoc/PrivateRoute";

import { Layout } from "./Layout/Layout";

// import "../css/App.css";


const Login = lazy(() => import("../pages/Login/Login"));
const Table = lazy(() => import("../pages/Table/Table"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            // <PrivateRoute>
            <Login />
            // </PrivateRoute>
          }
        />
      

      <Route
          path="/table"
          element={
            // <PrivateRoute>
            <Table />
            // </PrivateRoute>
          }
        />

      </Route>
    </Routes>
  );
}

export default App;
