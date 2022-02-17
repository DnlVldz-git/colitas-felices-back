const db = require("../models");
const Donacion = db.Donaciones;
const Proyecto = db.proyecto;
const Op = db.Sequelize.Op;
const axios = require("axios");
const { param } = require("express/lib/request");

exports.crearOrden = async (req, res) => {

    const nombre = req.body.donador;
    const cantidad = req.body.cantidad;
    const causa = req.body.causa; //Para que va a donar 
    const causaID= req.body.causaID;
    const order = {
        intent: "CAPTURE",
        purchase_units: [{
            amount: {
                currency_code: "MXN",
                value: cantidad

            },
            description: causa
        }],
        application_context: {
            brand_name: `Mexico Amparame ${causa}`,
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            return_url: process.env.CORS_OPTIONS_ORIGINS+"/mexico-amparame/pagos/validando-orden",
            cancel_url: process.env.CORS_OPTIONS_ORIGINS+"/mexico-amparame/pagos/cancelando-orden",

        }
    };

    const params = new URLSearchParams()
    params.append("grant_type", "client_credentials")

    const { data: { access_token } } = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", params, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
        },
        auth: {
            username: process.env.PAYPAL_API_CLIENT,
            password: process.env.PAYPAL_API_SECRET
        }
    })

    const response = await axios.post("https://api-m.sandbox.paypal.com/v2/checkout/orders", order, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    let idPaypal = response.data.id;

    let data = {
        nombreDonador: nombre,
        cantidad: cantidad,
        causaID: causaID,
        causa: causa,
        idPaypal: idPaypal,
        pagado: false,
        apellidos: req.body.apellidos,
        email: req.body.email,
        mensaje: req.body.mensaje,
        numeroTelefonico: req.body.numeroTelefonico
    }
    Donacion.create(data)
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al registrar la donacion."
            });
        });

    res.json(response.data)

}

exports.validarOrden = async (req, res) => {
    const { token } = req.query;
    console.log(`\n\n\n\n\n\n\n\n\n${token}`)

    try {

        const params = new URLSearchParams()
        params.append("grant_type", "client_credentials")

        const { data: { access_token } } = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", params, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
            },
            auth: {
                username: process.env.PAYPAL_API_CLIENT,
                password: process.env.PAYPAL_API_SECRET
            }
        })

        const response = await axios.post(
            `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
        //console.log("\n\n\n\n\naaaaaaaaaaaaaaaaaaaaaa")
        //console.log(JSON.stringify(response.data))
        let datos = {
            pagado: true
        }

        const actualizaDonacion = await Donacion.update(datos, { where: { idPaypal: token } })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al actualizar los datos"
                });
            });


        const actualizarPrograma =  Donacion.findAll({ where: { idPaypal: token } })
            .then(informacion => {

                let cantidadDonada = informacion[0].dataValues.cantidad
                let causa = informacion[0].dataValues.causa;
                console.log(`Datos ${causa}`)

                const getInformacionPrograma = Proyecto.findAll({ where: { titulo: causa } })
                    .then(informacionProyecto => {

                        let dineroTotal = informacionProyecto[0].dataValues.dineroActual + cantidadDonada;
                        let donadoresTotales = informacionProyecto[0].dataValues.donadores + 1;

                        let nuevosDatos = {
                            dineroActual: dineroTotal,
                            donadores: donadoresTotales
                        }

                        console.log("Los nuevos datos son:", nuevosDatos)

                        const actualizarPrograma = Proyecto.update(nuevosDatos, { where: { titulo: causa } })
                            .catch(err => {
                                res.status(500).send({
                                    message:
                                        err.message || "Ocurrio un error al actualizar los datos"
                                });
                            });
                    })
            })





        return res.redirect(process.env.LINK_WEB_SITE+'/gracias-por-donar')

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Peto" });
    }
};

exports.cancelarOrden = (req, res) => {
    return res.redirect(process.env.LINK_WEB_SITE)
};

