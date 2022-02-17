module.exports = (sequelize, Sequelize) => {
    const Donacion = sequelize.define("Donaciones", {
        nombreDonador: { //Nombre del donador
            type: Sequelize.STRING
        },
        apellidos: {
            type: Sequelize.STRING
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        causa: {
            type: Sequelize.STRING
        },
        causaID:{
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        mensaje: {
            type: Sequelize.STRING
        },
        numeroTelefonico: {
            type: Sequelize.STRING
        },
        idPaypal: {
            type: Sequelize.STRING
        },
        pagado: { //Este servira para verificar el id de paypal pagado con el que tiene       
            type: Sequelize.BOOLEAN
        }
    });

    return Donacion;
};

/*
const nombre = req.body.donador;
const cantidad = req.body.cantidad;
const causa = req.body.causa; //Para que va a donar 
*/