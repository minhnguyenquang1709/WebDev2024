import { Route, Routes } from "react-router-dom";
import "./App.css";

import Main from "./components/main/Main";
import Form from "./components/FormCreate/Form";
import FormView from "./components/formView/FormView";
import AuthPage from "./components/AuthPage/AuthPage";
import FormUserInput from "./components/FormUserInput/FormUserInput";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/main" element={<Main />} />
                <Route path="/create-form" element={<Form />} />
                <Route path="/form/:idForm" element={<FormView />} />
                <Route path="/form/input/:idForm" element={<FormUserInput />} />
            </Routes>
        </>
    );
}

export default App;
