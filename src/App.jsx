import "./App.css"
import LoginPage from "./components/pages/login/LoginPage.jsx";
import RegistrationPage from "./components/pages/registration/RegistrationPage.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App(){

   return (
       <BrowserRouter>
<Routes>
   <Route path="/" element={<HomePage/>}/>
   <Route path="/login" element={<LoginPage/>}/>
   <Route path="/register" element={<RegistrationPage/>}/>
</Routes>
       </BrowserRouter>
   );
}

export default App;
