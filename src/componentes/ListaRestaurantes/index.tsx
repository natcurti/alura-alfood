import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";
import { Button, TextField } from "@mui/material";

interface IParametrosBusca {
  ordering?: string;
  search?: string;
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proxPagina, setProxPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");
  const [busca, setBusca] = useState("");

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes).then((response) => {
      setRestaurantes(response.data.results);
      setProxPagina(response.data.next);
      setPaginaAnterior(response.data.previous);
    });
  };

  const buscarRestaurante = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const opcoes = {
      params: {} as IParametrosBusca,
    };
    if (busca) {
      opcoes.params.search = busca;
    }
    carregarDados("http://localhost:8000/api/v1/restaurantes/", opcoes);
  };

  useEffect(() => {
    carregarDados("http://localhost:8000/api/v1/restaurantes/");
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <form onSubmit={buscarRestaurante}>
        <h2>Busque seu restaurante preferido:</h2>
        <TextField
          id="outlined-basic"
          label="Restaurante"
          variant="outlined"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <Button variant="outlined" type="submit">
          Buscar
        </Button>
      </form>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {
        <button
          onClick={() => carregarDados(paginaAnterior)}
          disabled={!paginaAnterior}
        >
          Página Anterior
        </button>
      }
      {
        <button
          onClick={() => carregarDados(proxPagina)}
          disabled={!proxPagina}
        >
          Próxima página
        </button>
      }
    </section>
  );
};

export default ListaRestaurantes;
