import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

const FormularioNovoPrato = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState<string>("");
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null);
  const parametros = useParams();

  const selecionarArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImagem(e.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("tags/")
      .then((response) => setTags(response.data.tags));
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((response) => setRestaurantes(response.data));
  }, []);

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`).then((response) => {
        setNomePrato(response.data.nome);
        setDescricao(response.data.descricao);
        setTag(response.data.tag);

        const restauranteDoPrato = restaurantes.find(
          (item) => item.id === response.data.restaurante
        )?.nome;
        if (restauranteDoPrato) {
          setRestaurante(restauranteDoPrato);
        }
      });
    }
  }, [parametros, restaurantes]);

  const submeterFormulario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parametros.id) {
      console.log(nomePrato, descricao, tag, restaurante, imagem);
      const idDoRestaurante = restaurantes.find(
        (item) => item.nome === restaurante
      )?.id;
      console.log(idDoRestaurante);
      http
        .put(`pratos/${parametros.id}/`, {
          nome: nomePrato,
          descricao: descricao,
          tag: tag,
          restaurante: idDoRestaurante,
        })
        .then(() => {
          alert("Prato atualizado com sucesso!");
        });
    } else {
      const formData = new FormData();
      formData.append("nome", nomePrato);
      formData.append("descricao", descricao);
      formData.append("tag", tag);
      formData.append("restaurante", restaurante);
      if (imagem) {
        formData.append("imagem", imagem);
      }
      http
        .request({
          url: "pratos/",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
        .then(() => {
          setNomePrato("");
          setRestaurante("");
          setTag("");
          setDescricao("");
          alert("Prato cadastrado com sucesso!");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Pratos
      </Typography>
      <Box component="form" onSubmit={submeterFormulario}>
        <TextField
          value={nomePrato}
          onChange={(e) => setNomePrato(e.target.value)}
          label="Nome do Prato"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />
        <TextField
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          label="Descrição"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />
        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem value={tag.value} key={tag.id}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Restaurante</InputLabel>
          <Select
            labelId="select-tag"
            value={restaurante}
            onChange={(e) => setRestaurante(e.target.value)}
          >
            {restaurantes.map((restaurante) => (
              <MenuItem value={restaurante.nome} key={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input type="file" onChange={selecionarArquivo} />

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

export default FormularioNovoPrato;
