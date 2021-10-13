import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Uploads from '../app/models/Uploads';
import Event from '../app/models/Event';
import Cell from '../app/models/Cell';
import UsersEvents from '../app/models/Users_Events';
import News from '../app/models/News';
import Companers from '../app/models/Companers';

const models = [User, Uploads, Event, Cell, UsersEvents, News, Companers];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
