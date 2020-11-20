import Product from '../models/Product';

const { Op } = require('sequelize');

const { makeRequest } = require('../utils');

class ProductController {
  async register(req, res) {
    const { id } = await Product.create(req.body);

    return res.status(200).json(id);
  }

  async update(req, res) {
    const productExists = await Product.findOne({
      where: { id: req.params.id },
    });

    if (!productExists) {
      return res.status(401).json({ error: 'Produto não existe.' });
    }

    await productExists.update(req.body);

    return res.status(200).json(productExists);
  }

  async search(req, res) {
    const productExists = await Product.findOne({
      where: { id: req.params.id },
    });

    if (!productExists) {
      return res.status(401).json({ error: 'Produto não existe.' });
    }

    return res.status(200).json(productExists);
  }

  async searchAll(req, res) {
    const productExists = await Product.findAll();

    if (!productExists) {
      return res.status(401).json({ error: 'Nenhum produto cadastrado.' });
    }

    return res.status(200).json(productExists);
  }

  async searchTitle(req, res) {
    const productCod = await Product.findAll({
      where: {
        titulo: { [Op.substring]: req.params.title },
      },
    });

    if (productCod) {
      res.json(productCod);
    }
    return res.status(400).json({ error: 'Nenhum encontrado!' });
  }

  async delete(req, res) {
    const productExists = await Product.findOne({
      where: { id: req.params.id },
    });

    if (!productExists) {
      return res.status(401).json({ error: 'Produto não existe.' });
    }

    productExists.destroy();

    return res.status(200).json('Produto apagado com sucesso.');
  }

  async frete(req, res) {
    const { cep, peso, comprimento, altura, largura } = req.body;
    const obj = {
      nCdEmpresa: '',
      sDsSenha: '',
      nCdServico: '04510',
      sCepOrigem: '35930004',
      sCepDestino: parseInt(cep, 10),
      nVlPeso: parseInt(peso, 10),
      nCdFormato: 1,
      nVlComprimento: parseInt(comprimento, 10),
      nVlAltura: parseInt(altura, 10),
      nVlLargura: parseInt(largura, 10),
      nVlDiametro: '0',
      sCdMaoPropria: 'n',
      nVlValorDeclarado: '0',
      sCdAvisoRecebimento: 'n',
    };
    const response = await makeRequest(
      'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo',
      'POST',
      obj
    );
    res.json(response);
  }
}

export default new ProductController();
