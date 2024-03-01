import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioNovoRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      axios
        .get<IRestaurante>(
          `http://localhost:8000/api/v2/restaurantes/${parametros.id}/`
        )
        .then((response) => setNomeRestaurante(response.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const submeterFormulario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parametros.id) {
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado");
        });
    } else {
      axios
        .post("http://localhost:8000/api/v2/restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastrado");
        });
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" onSubmit={submeterFormulario}>
        <TextField
          value={nomeRestaurante}
          onChange={(e) => setNomeRestaurante(e.target.value)}
          label="Nome do Restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button
          sx={{ marginTop: 1 }}
          fullWidth
          type="submit"
          variant="outlined"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioNovoRestaurante;
