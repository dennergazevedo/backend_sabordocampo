/* eslint-disable consistent-return */
/* eslint-disable func-names */
import File from '../models/File';
import clientImgur from '../../config/imgur';

const imgur = require('imgur-upload');
const path2 = require('path');

let file;

class FileController {
  async imgur(req, res) {
    try {
      const { originalname: nome, filename: path } = req.file;

      imgur.setClientID(clientImgur.CLIENT_ID);
      await imgur.upload(
        path2.join(__dirname, '..', '..', 'tmp', 'uploads', `${path}`),
        async function(err, resp) {
          const { link } = resp.data;
          file = await File.create({
            nome,
            path,
            url: link,
          });
          return res.status(200).json(file);
        }
      );
    } catch (err) {
      return res.status(400).json({ error: 'ERRO AO FAZER UPLOAD DA IMAGEM' });
    }
  }

  async searchimg(req, res) {
    const img = await File.findOne({
      where: { id: req.params.id },
    });

    if (img) return res.json(img);

    return res.status(400).json({ error: 'Imagem não encontrada!' });
  }
}

export default new FileController();
