import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";

import HomePage from "./components/pages/HomePage.jsx";
import LoginPage from "./components/pages/login/LoginPage.jsx";
import ProfilePage from "./components/pages/profile/ProfilePage.jsx";
import RegistrationPage from "./components/pages/registration/RegistrationPage.jsx";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegistrationPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
