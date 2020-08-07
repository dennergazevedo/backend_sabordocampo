import User from '../models/User';

class UserController {
  async register(req, res) {
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(401).json({ error: 'Usuário já cadastrado.' });
    }

    const user = await User.create(req.body);

    return res.status(200).json(user);
  }

  async update(req, res) {
    const userExists = await User.findOne({
      where: { id: req.params.id },
    });

    if (!userExists) {
      return res.status(401).json({ error: 'Usuário não existe.' });
    }

    await userExists.update(req.body);

    return res.status(200).json(userExists);
  }

  async updatePass(req, res) {
    const { oldPassword, password } = req.body;

    const user = await User.findByPk(req.params.id);

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    user.set({ password }, { where: user });
    user.save();

    return res.status(200).json('Senha atualizada com sucesso!');
  }

  async search(req, res) {
    const userExists = await User.findOne({
      where: { id: req.params.id },
    });

    if (!userExists) {
      return res.status(401).json({ error: 'Usuário não existe.' });
    }

    return res.status(200).json(userExists);
  }

  async searchAllPage(req, res) {
    const { page, limit } = req.params;
    const offset = page * limit;
    const final = Number(offset) + Number(limit);

    if (page === '0' || page === 0) {
      const userCod = await User.findAll();
      userCod.reverse();
      const userRev = userCod.slice(0, limit);
      if (userRev) return res.json(userRev);
    } else {
      const userCod = await User.findAll();
      userCod.reverse();
      const userRev = userCod.slice(offset, Number(final));
      if (userRev) return res.json(userRev);
    }

    return res.status(400).json({ error: 'Nenhum encontrado!' });
  }

  async searchPageResults(req, res) {
    const userCod = await User.findAll();

    if (userCod) {
      const pages = userCod.length;
      return res.json(pages);
    }

    return res.status(400).json({ error: 'Nenhum encontrado!' });
  }

  async delete(req, res) {
    const userExists = await User.findOne({
      where: { id: req.params.id },
    });

    if (!userExists) {
      return res.status(401).json({ error: 'Usuário não existe.' });
    }

    userExists.destroy();

    return res.status(200).json('Usuário apagado com sucesso.');
  }
}

export default new UserController();
