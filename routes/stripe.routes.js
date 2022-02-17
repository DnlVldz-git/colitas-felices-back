module.exports = app =>{
    const Stripe = require("../controllers/stripe.controller.js");
    let router = require("express").Router();

    router.post('/creando-cargo', Stripe.crearCargo);

    app.use('/mexico-amparame/pagosTarjeta', router);
}