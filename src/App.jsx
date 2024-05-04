import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Protected from "./pages/Protected";
import ParticlesComponent from "./components/Background";
import PictureOfTheDay from "./pages/PictureOfTheDay";
import MarsRoverPhotos from "./pages/MarsRoverPhotos";


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
            <Route path="/sign-in" element={<SignIn />} />

            <Route
              path="/picture-of-the-day"
              element={
                <Protected>
                  <PictureOfTheDay />
                </Protected>
              }
            />

            <Route
              path="/mars-rover-photos/:roverName"
              element={
                <Protected>
                  <MarsRoverPhotos />
                </Protected>
              }
            />
          </Routes>
          <ParticlesComponent id="particles"></ParticlesComponent>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
