const express = require("express");
const server = express();

//pegar o banco de dados
const db = require("./database/db");

//config pasta public
server.use(express.static("public"));

//habilitar uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }));

//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/view", {
  express: server,
  noCache: true,
});

//config caminhos da apicação//////
//pagina inicial
//req >> requisição >> pedido
//res >> resposta
server.get("/", (req, res) => {
  return res.render("index.html", {
    title: "Seu marketplace de coleta de resíduos",
  });
});

//essa é a rota que recebe os dados do formulário
server.get("/create-point", (req, res) => {
  //req.query > São os query strings da minha URL
  // req.query

  return res.render("create-point.html");
});

server.post("/save-point", (req, res) => {
  //req.body > corpo do formulario
  //console.log(req.body)

  //inserir dados no banco de dados
  const query = `
      INSERT INTO places (
          image,
          name,
          address,
          address2,
          state,
          city,
          items
      ) VALUES (?,?,?,?,?,?,?);
  `;

  //coleçao
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  //funçao de callback
  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }

    console.log("cadastrado com sucesso");
    // console.log(this);

    return res.render("create-point.html", { saved: true });
  }

  db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {

  const search = req.query.search;

  if (search == "") {
    //pesquisa vazia
    return res.render("search-results.html", { total: 0 });
  }

  //pegar os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      console.log(err);
      return res.send("Erro no Cadastro!");
    }

    // console.log('Aqui estão seus registros')
    // console.log(rows)

    const total = rows.length;

    //mostra a página html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total: total });
  });
});

//ligar o servidor
server.listen(3000);
