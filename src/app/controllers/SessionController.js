import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password Inválido!' });
    }

    const { id, nome, phone, document, provider } = user;

    const tokenJwt = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    user.set({ token: tokenJwt }, { where: user });
    user.save();

    return res.json({
      user: {
        id,
        nome,
        phone,
        provider,
        document,
        email,
      },
      token: tokenJwt,
    });
  }

  async updateToken(req, res) {
    const { email, token } = req.body;

    const userExists = await User.findOne({ where: { email } });

    userExists.set({ token }, { where: userExists });
    await userExists.save();

    return res.status(200).json('Token atualizado');
  }
}
export default new SessionController();
