/* eslint-disable func-names */
import transporter from '../../modules/mailer';

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
}

export default new MailController();
