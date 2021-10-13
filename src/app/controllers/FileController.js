import Uploads from '../models/Uploads';

class FileController {
  async store(req, res) {
    // const { originalname: name, filename: path } = req.file;
    const requestImages = req.files;
    const { event_id } = req.body;
    let file = {};

    await requestImages.map(async (image) => {
      const { originalname: name, filename: path } = image;
      file = await Uploads.create({
        name,
        path,
        event_id,
      });
      return res.json(file);
    });
  }
}
export default new FileController();
