const express = require('express');
const router = express.Router();
const Caixa = require('../models/caixa');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // Aqui você pode utilizar o modelo "Caixa" para obter os dados do banco de dados
    const extrato = await Caixa.findAll(); // Supondo que você tem um método findAll() definido no modelo Caixa

    // Inicializa as variáveis de receitas e despesas
    let receitas = 0;
    let despesas = 0;

    // Itera pelos lançamentos e calcula as receitas e despesas
    for (const lancamento of extrato) {
      if (lancamento.status === 1) {
        receitas += lancamento.valor;
      } else if (lancamento.status === 0) {
        despesas += lancamento.valor;
      }
    }

    // Calcula o valor total
    const valor_total = receitas - despesas;

    // Renderizar o modelo 'index' e passar os dados para a visualização
    res.render('index', { 
      valor_total: valor_total,
      receitas: receitas,
      despesas: despesas,
      extrato: extrato,
      formatarMoeda: (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      },
      formatarStatus: (status) => {
        return status === 1 ? "Receita" : "Despesa"
      },
      corStatus: (status) => {
        return status === 1 ? "#82aeef" : "red"
      }
    });

  } catch (error) {
    next(error);
  }
});

router.get('/excluir/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    // Encontre o lançamento a ser excluído pelo ID
    const lancamento = await Caixa.findByPk(id);

    if (!lancamento) {
      // Se o lançamento não for encontrado, redirecionar para a página inicial
      return res.redirect('/');
    }

    // Excluir o lançamento do banco de dados
    await lancamento.destroy();

    // Redirecionar para a página inicial após a exclusão bem-sucedida
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/adicionar', async function(req, res, next) {
  res.render('adicionar')
});

/* Rota para cadastrar um novo lançamento */
router.post('/cadastrar', async function(req, res, next) {
  try {
    // Obter os dados do formulário
    const { tipo, valor, status } = req.body;

    // Inserir os dados no banco de dados usando o modelo "Caixa"
    await Caixa.create({ tipo, valor, status });

    // Redirecionar para a página inicial após o cadastro bem-sucedido
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
