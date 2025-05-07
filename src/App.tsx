import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
import Navbar from './components/Navbar';
import Servicos from './pages/Servicos';
import Contato from './pages/Contato';
import Cases from './pages/Cases.tsx';
import Sobre from './pages/Sobre';
import Footer from './components/Footer';
import Login from './components/Login'; // Importando o componente Login
import Admin from './components/Admin';
import CaseList from './components/CaseList';
import AddCase from './components/AddCase';
import EditCase from './pages/EditCase';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="add" element={<AddCase />} />
          <Route path="edit/:id" element={<EditCase />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
