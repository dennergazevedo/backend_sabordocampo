import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        bairro: Sequelize.INTEGER,
        qnt: Sequelize.INTEGER,
        subtotal: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'product_id' });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default Order;
