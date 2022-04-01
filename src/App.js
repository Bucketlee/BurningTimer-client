import { Routes, Route } from "react-router-dom";

import AppPage from "./components/AppPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import MainPage from "./components/MainPage";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/auth/login" element={<LoginPage />} />
        <Route exact path="/auth/signup" element={<SignupPage />} />
        {/* <Route path="/help/id" element={<FindIdPage />} /> */}
        {/* <Route path="/help/password" element={<FindPasswordPage />} /> */}
        <Route exact path="/app" element={<AppPage />} />
        <Route exact path="/app/:page" element={<AppPage />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
