const express = require("express");
const router = require("express").Router();
const multer = require("multer");
const knex = require("../database/connection.js");
const fs = require("fs");
const path = require("path");

// configurações do multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
// -----------------------------------------

//ROTA DE TESTE
router.get("/teste", (req, res) => {
  res.send("ESTE É UMA ROTA DE TESTE");
});

// ROTA PARA VER TODAS AS IMAGENS
router.get("/pictures", async (req, res) => {
  await knex
    .select(["id", "name", "src"])
    .table("pictures")
    .orderBy("id", "desc")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// ROTA PARA VER A IMAGEM ESPECIFICA
router.get("/picture/:id", async (req, res) => {
  var id = req.params.id;

  await knex
    .select(["id", "name", "src"])
    .where({ id: id })
    .table("pictures")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// ROTA PARA INSERIR IMAGEM
router.post("/picture", upload.single("file"), async (req, res) => {
  const imageName = req.body.name;
  const src = req.file.filename;

  await knex
    .insert({ name: imageName, src: src })
    .table("pictures")
    .then((data) => {
      res.status(201).json({ message: "Imagem salva com sucesso!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Erro ao salvar Imagem" });
    });
});

// ROTA PARA ATUALIZAR IMAGEM
router.patch("/picture/:id", upload.single("file"), async (req, res) => {
  var id = req.params.id;
  const imageName = req.body.name;
  const src = req.file.filename;

  await knex
    .where({ id: id })
    .update({ name: imageName, src: src })
    .table("pictures")
    .then((data) => {
      res.status(201).json({ message: "Imagem atualizada com sucesso!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Erro ao atualizar Imagem" });
    });
});

// ROTA PARA REMOVER IMAGEM
router.delete("/picture/:id", async (req, res) => {
  var id = req.params.id;

  await knex
    .select("src")
    .where({ id: id })
    .table("pictures")
    .then((data) => {
      var caminho = data[0].src;

      fs.rm(`./uploads/${caminho}`, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Apagou com sucesso");
        }
      });
    });

  knex
    .where({ id: id })
    .delete()
    .table("pictures")
    .then((data) => {
      res.status(201).json({ message: "Imagem removida com sucesso!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Erro ao remover Imagem" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
