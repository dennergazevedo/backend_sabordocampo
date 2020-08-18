import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        bairro: Sequelize.INTEGER,
        qnt: Sequelize.INTEGER,
        subtotal: Sequelize.FLOAT,
        periodicidade: Sequelize.INTEGER,
        pagamento: Sequelize.STRING,
        ativo: Sequelize.INTEGER,
        frete: Sequelize.FLOAT,
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
    this.belongsTo(models.Address, { foreignKey: 'address_id' });
  }
}

export default Order;
