import Order from '../models/Order';

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
