import Order from '../models/Order';
import User from '../models/User';

const { Op } = require('sequelize');

class OrderController {
  async register(req, res) {
    const { id } = await Order.create(req.body);

    return res.status(200).json(id);
  }

  async update(req, res) {
    const orderExists = await Order.findOne({
      where: { id: req.params.id },
    });

    if (!orderExists) {
      return res.status(401).json({ error: 'Ordem não existe.' });
    }

    await orderExists.update(req.body);

    return res.status(200).json('Ordem atualizado com sucesso');
  }

  async search(req, res) {
    const orderExists = await Order.findOne({
      where: { id: req.params.id },
    });

    if (!orderExists) {
      return res.status(401).json({ error: 'Ordem não existe.' });
    }

    return res.status(200).json(orderExists);
  }

  async searchAll(req, res) {
    const orderExists = await Order.findAll({
      where: { user_id: req.params.id },
    });

    if (!orderExists) {
      return res.status(401).json({ error: 'Não existe pedidos.' });
    }

    return res.status(200).json(orderExists);
  }

  async searchAllPage(req, res) {
    const { page, limit } = req.params;
    const offset = page * limit;
    const final = Number(offset) + Number(limit);

    if (page === '0' || page === 0) {
      const finalCod = await Order.findAll();
      finalCod.reverse();
      const finalRev = finalCod.slice(0, limit);
      if (finalRev) return res.json(finalRev);
    } else {
      const finalCod = await Order.findAll();
      finalCod.reverse();
      const finalRev = finalCod.slice(offset, Number(final));
      if (finalRev) return res.json(finalRev);
    }

    return res.status(400).json({ error: 'Nenhum encontrado!' });
  }

  async searchOrders(req, res) {
    const { page, limit } = req.params;
    const offset = page * limit;
    const final = Number(offset) + Number(limit);

    if (page === '0' || page === 0) {
      const finalCod = await Order.findAll({
        where: { periodicidade: null },
      });
      finalCod.reverse();
      const finalRev = finalCod.slice(0, limit);
      if (finalRev) return res.json(finalRev);
    } else {
      const finalCod = await Order.findAll({
        where: { periodicidade: null },
      });
      finalCod.reverse();
      const finalRev = finalCod.slice(offset, Number(final));
      if (finalRev) return res.json(finalRev);
    }

    return res.status(400).json({ error: 'Nenhum encontrado!' });
  }

  async searchByEmail(req, res) {
    const userExists = await User.findOne({
      where: { email: req.params.email },
    });

    if (userExists) {
      const orderExists = await Order.findAll({
        where: { user_id: userExists.id },
      });
      if (orderExists) res.json(orderExists);
    }

    res.status(400).json({ error: 'Ordem não encontrada' });
  }

  async searchPageResultsOrder(req, res) {
    const orderCod = await Order.findAll({
      where: { periodicidade: null },
    });

    if (orderCod) {
      const pages = orderCod.length;
      return res.json(pages);
    }

    return res.status(400).json({ error: 'Nenhum encontrado!' });
  }

  async searchAssign(req, res) {
    const { page, limit } = req.params;
    const offset = page * limit;
    const final = Number(offset) + Number(limit);

    if (page === '0' || page === 0) {
      const finalCod = await Order.findAll({
        where: { periodicidade: { [Op.not]: null } },
      });
      finalCod.reverse();
      const finalRev = finalCod.slice(0, limit);
      if (finalRev) return res.json(finalRev);
    } else {
      const finalCod = await Order.findAll({
        where: { periodicidade: { [Op.not]: null } },
      });
      finalCod.reverse();
      const finalRev = finalCod.slice(offset, Number(final));
      if (finalRev) return res.json(finalRev);
    }

    return res.status(400).json({ error: 'Nenhum encontrado!' });
  }

  async searchPageResultsAssign(req, res) {
    const orderCod = await Order.findAll({
      where: { periodicidade: { [Op.not]: null } },
    });

    if (orderCod) {
      const pages = orderCod.length;
      return res.json(pages);
    }

    return res.status(400).json({ error: 'Nenhum encontrado!' });
  }

  async searchPageResults(req, res) {
    const orderCod = await Order.findAll();

    if (orderCod) {
      const pages = orderCod.length;
      return res.json(pages);
    }

    return res.status(400).json({ error: 'Nenhum encontrado!' });
  }

  async delete(req, res) {
    const orderExists = await Order.findOne({
      where: { id: req.params.id },
    });

    if (!orderExists) {
      return res.status(401).json({ error: 'Ordem não existe.' });
    }

    orderExists.destroy();

    return res.status(200).json('Ordem apagado com sucesso.');
  }
}

export default new OrderController();
