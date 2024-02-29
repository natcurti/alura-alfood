import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const FormularioNovoRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const submeterFormulario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/v2/restaurantes/", {
        nome: nomeRestaurante,
      })
      .then(() => {
        alert("Restaurante cadastrado");
      });
  };

  return (
    <form onSubmit={submeterFormulario}>
      <TextField
        value={nomeRestaurante}
        onChange={(e) => setNomeRestaurante(e.target.value)}
        label="Nome do Restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
};

export default FormularioNovoRestaurante;
