import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Administracao/Restaurantes";
import FormularioNovoRestaurante from "./paginas/Administracao/FormularioNovoRestaurante";
import PaginaBaseAdmin from "./paginas/Administracao/PaginaBaseAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route
          path="restaurantes/novo"
          element={<FormularioNovoRestaurante />}
        />
        <Route
          path="restaurantes/:id"
          element={<FormularioNovoRestaurante />}
        />
      </Route>
    </Routes>
  );
}

export default App;
