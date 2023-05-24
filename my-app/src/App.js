import "./App.css";
import Navbar from "./Components/Navbar";
import TextForm from "./Components/TextForm";
import About from "./Components/About";
import React, { useState } from "react";
import Alert from "./Components/Alert";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [Mode, setMode] = useState("light"); // whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const toggleMode = () => {
    if (Mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#495057";
      showAlert("Dark Mode has been enabled.", "success");
      document.title = "TextUtils Darkmode";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light Mode has been enabled.", "success");
      document.title = "TextUtils Lightmode";
    }
  };
 
  let active = document.getElementsByClassName('abouts').className = 'active';

  return (
    <>
      <BrowserRouter>
        <Navbar
          title="TextUtils"
          aboutText="AboutUs"
          Mode={Mode}
          toggleMode={toggleMode}
          activeMode = {active}
        />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route exact path="/about" element={<About />}></Route>
            <Route
              exact path="/"
              element={
                <TextForm
                  heading="Enter Text to Analyse"
                  Mode={Mode}
                  showAlert={showAlert}
                />
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
