import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from './components/pages/Home'
import DetailsMovie from './components/pages/DetailsMovie'
import Login from './components/pages/Login'
import Register from './components/pages/Register'




function App() {
  return (
    <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/detalhes/:movie" element={<DetailsMovie/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </Router>
  );
}

export default App;
