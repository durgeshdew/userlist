import "./App.css";
import UserList from "./components/userList";
import UserDetails from "./components/userDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/errorBoundry";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserList />} errorElement={<ErrorBoundary />}/>
            <Route path="/user/:username" element={<UserDetails />} errorElement={<ErrorBoundary />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
