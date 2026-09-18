require("dotenv").config()
const express = require("express")
const cors = require("cors")
const db = require("./config/database")


const app = express()

const PORT = 3001

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
  res.json({
    mensagem:"API funcionando"
  })
})

app.get("/produtos", async (req, res)=>{
  try {
    const [produtos] = await db.query(
      "select * from produto"
    )
    res.json(produtos)
  } catch (error) {
    console.log(error)
  }
})

app.post('/produtos', async (req, res) => {
    try {
        const { descricao, categoria, preco, imagem } = req.body;

        const sql = `
            INSERT INTO produto (descricao, categoria, preco, imagem)
            VALUES (?, ?, ?, ?)
        `;

        const [resultado] = await db.query(sql, [
            descricao,
            categoria,
            preco,
            imagem
        ]);

        res.status(201).json({
            id: resultado.insertId,
            descricao,
            categoria,
            preco,
            imagem
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro ao cadastrar produto',
            mensagem: error.message
        });
    }
});

app.delete("/produtos/:id", async(req, res)=>{
  try {
    const {id} = req.params

    await db.query("delete from produto where id = ?", [id])

    res.json({mensagem:"Produto deletado com sucesso!"})
  } catch (error) {
    console.log(error)
    res.json({
      erro: "Erro ao deletar o produto"
    })
  }
})

app.listen(PORT, ()=>{
  console.log("Servidor rodando na porta 3001")
})