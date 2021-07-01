//1. importar a dependencia do sqlite3
// função quando reside/mora dentro de um objeto, ele é chamado de método. Nesse caso, o verbose.
const sqlite3 = require("sqlite3").verbose()

//2. criar objeto que irá fazer operaçṍes no banco de dados
const db = new sqlite3.Database("./src/database/database.db")
//quando eu coloco a palava chave 'new' em um constructor/classe, eu consigo iniciar um objeto(db)

//3. utilizar o objeto de banco de dados, para minha operação
db.serialize(()=> {
    //criar uma tabela com comandos sql
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    //inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `
    
    //coleçao
    // const values = [
    //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=801&q=80",
    //     "Coletoria",
    //     "Guilherme Gemballa, Jardim América",
    //     "Nº260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos, Lâmpadas"
    // ]

    //funçao de callback
    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("cadastrado com sucesso")
    //     console.log(this)
    // }


    //se eu fizesse assim afterInsertData(err), estarei executando imediatamente. No caso quero apenas exectar o callback
    // db.run(query, values, afterInsertData)

    //consultar os dados da tabela
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('Aqui estão seus registros')
    //     console.log(rows)
    // })

    //deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [2], function(err){
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('Registro deletado com sucesso')
    // })
})


module.exports = db