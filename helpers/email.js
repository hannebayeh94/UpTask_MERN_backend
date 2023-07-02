import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, token, nombre } = datos;

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f67a36717ba249",
      pass: "c6d7dcb176ddf7",
    },
  });

  //   informacion del email

  const info = await transport.sendMail({
    from: '"Uptask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "Uptask - Confirma tu cuenta",
    text: "Comprueba tu cuenta en Uptask",
    html: `
    
        <p>Hola: ${nombre} Comprueba tu cuenta en uptask<p/>
        <p>Tu cuenta ya esta casi lista, solo debe comprobarla en el siguiente enlace: <p/>

        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, token, nombre } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //   informacion del email

  const info = await transport.sendMail({
    from: '"Uptask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "Uptask - Restablece tu password",
    text: "Restablece tu password",
    html: `
    
        <p>Hola: ${nombre} Has solicitado restabler tu password<p/>
        <p>Sigue el siguiente enlace para generar un nuevo password<p/>

        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablece tu password</a>
    `,
  });
};
