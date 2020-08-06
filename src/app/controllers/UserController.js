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
