import Address from '../models/Address';

class AddressController {
  async register(req, res) {
    const { id } = await Address.create(req.body);

    return res.status(200).json(id);
  }

  async update(req, res) {
    const addressExists = await Address.findOne({
      where: { id: req.params.id },
    });

    if (!addressExists) {
      return res.status(401).json({ error: 'Endereço não existe.' });
    }

    await addressExists.update(req.body);

    return res.status(200).json('Endereço atualizado com sucesso');
  }

  async search(req, res) {
    const addressExists = await Address.findOne({
      where: { id: req.params.id },
    });

    if (!addressExists) {
      return res.status(401).json({ error: 'Endereço não existe.' });
    }

    return res.status(200).json(addressExists);
  }

  async delete(req, res) {
    const addressExists = await Address.findOne({
      where: { id: req.params.id },
    });

    if (!addressExists) {
      return res.status(401).json({ error: 'Endereço não existe.' });
    }

    addressExists.destroy();

    return res.status(200).json('Endereço apagado com sucesso.');
  }
}

export default new AddressController();
