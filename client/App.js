import "./App.css";
import React from "react";
import TextForm from "./components/textForm";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Navbar />
      </React.Fragment>

      <div className="text-center btnBox">
        <a href="/textExtraction" class="btn btn-primary prButton btn-lg">
          textExtraction
        </a>
        <a href="/reviewExtrator" class="btn btn-primary prButton btn-lg">
          reviewExtractor
        </a>
      </div>
    </div>
  );
}

export default App;
