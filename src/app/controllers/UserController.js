import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/Uploads';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(8),
      password: Yup.string()
        .min(8)
        .when('oldPassword', (oldPassword, Field) =>
          oldPassword ? Field.required() : Field
        ),
      confirmPassword: Yup.string().when('password', (password, Field) =>
        password ? Field.required().oneOf([Yup.ref('password')]) : Field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const user_id = req.userId;
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(user_id);

    if (email !== user.email) {
      const userExist = await User.findOne({
        where: {
          email,
        },
      });
      if (userExist) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (!oldPassword && req.body.password) {
      return res.json({ erro: 'Old password is required' });
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not math' });
    }

    await user.update(req.body);

    const {
      id,
      name,
      phone,
      street,
      number,
      neighborhood,
      avatar,
      provider,
    } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      street,
      number,
      neighborhood,
      phone,
      email,
      provider,
      avatar,
    });
  }

  async find(req, res) {
    const user_id = req.userId;
    const {
      id,
      email,
      name,
      street,
      number,
      neighborhood,
      cep,
      baptism_date,
      date_of_birth,
      city,
      complement,
      state,
      gender,
      phone,
      avatar,
      provider,
      leader,
    } = await User.findByPk(user_id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json({
      id,
      name,
      baptism_date,
      street,
      number,
      neighborhood,
      date_of_birth,
      city,
      complement,
      cep,
      state,
      gender,
      phone,
      email,
      provider,
      leader,
      avatar,
    });
  }

  async storeWeb(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const userExist = await User.findOne({
      where: {
        phone: req.body.phone,
      },
    });
    if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
