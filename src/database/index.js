import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Address from '../app/models/Address';
import File from '../app/models/File';
import Product from '../app/models/Product';
import User from '../app/models/User';
import Order from '../app/models/Order';

const models = [Address, File, Product, User, Order];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
