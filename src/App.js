import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from './components/pages/Home'
import DetailsMovie from './components/pages/DetailsMovie'

function App() {
  return (
    <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/detalhes/:movie" element={<DetailsMovie/>}/>
        </Routes>
    </Router>
  );
}

export default App;
