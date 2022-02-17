const db = require("../models");
const Donacion = db.Donaciones;
const Op = db.Sequelize.Op;
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_API_SECRET);


exports.crearCargo = async (req, res) => {
  try {
    const { id, cantidad, descripcion, causa, causaID, donador, apellidos, email, telefono } = req.body;
    const pago = await stripe.paymentIntents.create({
      amount: cantidad,
      currency: "mxn",
      description: descripcion,
      payment_method: id,
      confirm: true
    })

    console.log(pago);

    let data = {
      nombreDonador: donador,
      cantidad: cantidad,
      causaID: causaID,
      causa: causa,
      idPaypal: "N/A",
      pagado: true,
      apellidos: apellidos,
      email: email,
      mensaje: descripcion,
      numeroTelefonico: telefono
    }

    Donacion.create(data)
      .catch(err => {
        res.status(500).send("error");
      });


    res.send(pago.status);
  }
  catch (error) {
    console.log(error);
    res.send(error.raw.code);
  }
}