/* eslint-disable func-names */
import transporter from '../../modules/mailer';
import User from '../models/User';

const crypto = require('crypto');

class MailController {
  async sendEmail(req, res) {
    const { nome, phone, email, assunto, msg } = req.body;

    const mailOptions = {
      from: email,
      to: 'suporte@artcopias.com.br',
      subject: `[Enviado do Site]: ${assunto}`,
      html: `<p><span style="color: #999999;"><em>Mensagem do cliente ${nome} atrav&eacute;s do site.</em></span></p>
      <p>&nbsp;</p>
      <p style="text-align: justify;">${msg}</p>
      <p style="text-align: justify;">&nbsp;</p>
      <hr />
      <p><strong>Cliente</strong>: ${nome}</p>
      <p><strong>Contato</strong>: ${phone}</p>
      <p><strong>E-mail</strong>: ${email}</p>`,
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        res.status(400).json({ error: 'E-mail não enviado' });
      } else {
        res.status(200).json(`Email enviado: ${info.response}`);
      }
    });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1);

      user.set({ reset_token: token }, { where: user });
      user.set({ reset_expires: now }, { where: user });
      user.save();

      const mailOptions = {
        from: 'no-reply@sabordocampomg.com.br',
        to: email,
        subject: `[Sabor Do Campo] Esqueci minha senha`,
        html: `
        <h1 style="color: #5e9ca0; text-align: center;"><span style="color: #008000;">Recupera&ccedil;&atilde;o de Senha</span></h1>
<p>Uma&nbsp;solicita&ccedil;&atilde;o&nbsp;de&nbsp;recupera&ccedil;&atilde;o&nbsp;de&nbsp;senha&nbsp;foi&nbsp;realizada&nbsp;para&nbsp;sua&nbsp;conta&nbsp;em&nbsp;nosso&nbsp;site. <br /> <br /> <strong>Se voc&ecirc; n&atilde;o foi o autor, apenas descarte este e-mail.</strong> <br /> <br /> Para continuar a recupera&ccedil;&atilde;o de senha, clique no bot&atilde;o abaixo e crie uma nova senha! <br /> <br /> <br /> <em>Ah, esse link expira em 1 hora!</em> <br /> <br /> <br /> <strong>Abra&ccedil;o!</strong> <br /> <br /> <strong>Equipe Sabor do Campo!</strong></p>
<p>&nbsp;</p>
<table style="height: 51px; margin-left: auto; margin-right: auto;" width="211">
<tbody>
<tr>
<td style="width: 201px; height: 50px; background-color: #008000; border-radius: 10px; text-align: center;"><a style="color: #fff;" href="https://www.sabordocampomg.com.br/reset-password/${email}/${token}">Criar nova senha</a></td>
</tr>
</tbody>
</table>`,
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          res.status(400).json({ error: 'E-mail não enviado' });
        } else {
          res.status(200).json(`Email enviado: ${info.response}`);
        }
      });
    } catch (error) {
      res.status(400).json({ error: 'Não foi possível recuperar a senha' });
    }
    return res.send();
  }
}

export default new MailController();
