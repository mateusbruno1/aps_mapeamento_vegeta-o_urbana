module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('trees', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'uploads', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('trees', 'avatar_id');
  },
};
