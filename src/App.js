import "./App.css";
import React from "react";
import Weather from "./Weather";
import Search from "./Search";

function App() {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Weather />
      <Search />
    </div>
  );
}

export default App;
