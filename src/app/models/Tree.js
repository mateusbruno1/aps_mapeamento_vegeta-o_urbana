import Sequelize, { Model } from 'sequelize';

class Tree extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        latitude: Sequelize.STRING,
        longitude: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Uploads, {
      foreignKey: 'avatar_id',
      as: 'tree_image',
    });
    this.belongsTo(models.User, { foreignKey: 'leader', as: 'lider' });
  }
}

export default Tree;
