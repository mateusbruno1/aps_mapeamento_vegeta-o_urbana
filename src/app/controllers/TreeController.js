import Tree from '../models/Tree';
import File from '../models/Uploads';
import User from '../models/User';

class TreeController {
  async store(req, res) {
    const {
      name,
      locale,
      description,
      day,
      hour_started,
      hour_finish,
      leader,
      latitude,
      longitude,
      contact,
      avatar_id,
    } = req.body;

    const tree = await Tree.create({
      name,
      locale,
      description,
      day,
      hour_started,
      hour_finish,
      leader,
      contact,
      latitude,
      longitude,
      avatar_id,
    });

    return res.json(tree);
  }

  async find(req, res) {
    const Trees = await Tree.findAll();
    return res.json(Trees);
  }

  async findId(req, res) {
    const { id } = req.params;
    const Trees = await Tree.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar_Tree',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'lider',
          attributes: ['name', 'phone'],
        },
      ],
    });
    return res.json(Trees);
  }

  async update(req, res) {
    const { id } = req.params;
    const tree = await Tree.findByPk(id);
    await Tree.update(req.body);

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
