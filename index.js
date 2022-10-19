//npm i express
//npm i axios

const express = require("express");
const axios = require("axios");
const app = express();

//PEGAR TOKEN JWT
app.get("/", async (req, res) => {
  var token;
  await axios
    .post("https://urlparasolicitartoken", {
      user: "usuario",
      password: "senha",
    })
    .then((response) => {
      token = response.data.token.split(" ")[1];
    })
    .catch((err) => {
      console.log(err);
    });

  //PEGAR DADOS DA API
  await axios
    .get("https://urlparasolicitardadosdaapi", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      res.send(response.data);
      console.log("TOKEN USADO PARA ESTA CONSULTA: " + token);
      save(response.data.content); // FUNÇÃO NÃO DECLARADA NESSE CODIGO, MAS É PARA SALVAR NO BANCO DE DADOS
    })
    .catch((err) => {
      console.log(err);
    });
});
