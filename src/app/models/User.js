import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        neighborhood: Sequelize.STRING,
        state: Sequelize.STRING,
        cep: Sequelize.STRING,
        gender: Sequelize.STRING,
        baptism_date: Sequelize.DATE,
        date_of_birth: Sequelize.DATE,
        phone: Sequelize.STRING,
        email: Sequelize.STRING,
        city: Sequelize.STRING,
        complement: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
        leader: Sequelize.BOOLEAN,
        avatar_id: Sequelize.INTEGER,
        player_id: Sequelize.STRING,
        concierge: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (user) => {
      if (!user.phone) {
        user.phone = '';
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Uploads, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsToMany(models.Event, {
      through: 'users_events',
      foreignKey: 'user_id',
      as: 'events',
    });
    this.hasMany(models.Companers, { as: 'companers' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
