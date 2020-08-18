import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        phone: Sequelize.STRING,
        provider: Sequelize.INTEGER,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        document: Sequelize.STRING,
        email: Sequelize.STRING,
        token: Sequelize.STRING,
        reset_token: Sequelize.STRING,
        reset_expires: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async collab => {
      if (collab.password) {
        collab.password_hash = await bcrypt.hash(collab.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
