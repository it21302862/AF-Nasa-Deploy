import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Protected from "./pages/Protected";
import ParticlesComponent from "./components/Background";
import NasaHomePage from "./pages/NasaHome";
import PictureOfTheDay from "./pages/PictureOfTheDay";
import MarsImages from "./pages/MarkRoverPhotos";
import MarsRoverPhotos from "./pages/MarsRoverPhotos";

function App() {
  return (
    <div className="App px-2 md:px-0">
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
              path="/nasa-homepage"
              element={
                <Protected>
                  <NasaHomePage />
                </Protected>
              }
            />

            <Route
              path="/picture-of-the-day"
              element={
                <Protected>
                  <PictureOfTheDay />
                </Protected>
              }
            />

            <Route
              path="/mars-rover-photos"
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
