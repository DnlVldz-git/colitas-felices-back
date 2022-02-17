module.exports = app =>{
    const ordenes = require("../controllers/payment.controller.js");
    let router = require("express").Router();

    router.post('/creando-orden', ordenes.crearOrden);

    router.get('/validando-orden', ordenes.validarOrden);

    router.get('/cancelando-orden', ordenes.cancelarOrden);

    app.use('/mexico-amparame/pagos', router);
}