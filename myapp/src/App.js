import logo from "./logo.svg";
import "./App.css";

import ListResults from "./components/ListResults";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <div className="container">
        <ListResults />
      </div>
    </Fragment>
  );
}

export default App;
