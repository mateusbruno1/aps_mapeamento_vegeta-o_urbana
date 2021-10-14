import Tree from '../models/Tree';
import File from '../models/Uploads';
import User from '../models/User';

class TreeController {
  async store(req, res) {
    const { name, description, latitude, longitude, avatar_id } = req.body;

    const tree = await Tree.create({
      name,
      user_id: req.userId,
      description,
      latitude,
      longitude,
      avatar_id,
    });

    return res.json(tree);
  }

  async find(req, res) {
    const Trees = await Tree.findAll({
      include: [
        {
          model: File,
          as: 'tree_image',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(Trees);
  }

  async findId(req, res) {
    const { id } = req.params;
    const Trees = await Tree.findByPk(id, {
      include: [
        {
          model: File,
          as: 'tree_image',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name', 'phone'],
        },
      ],
    });
    return res.json(Trees);
  }

  async update(req, res) {
    const { id } = req.params;
    const tree = await Tree.findByPk(id);
    await tree.update(req.body);

    return res.json({ tree });
  }

  async delete(req, res) {
    const { id } = req.params;
    await Tree.destroy({
      where: {
        id,
      },
    });
    res.json({ success: 'Tree deleted' });
  }
}
export default new TreeController();
