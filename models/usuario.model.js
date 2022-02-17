module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        nombre: {
            type: Sequelize.STRING
        },

        paterno: {
            type: Sequelize.STRING
        },

        materno: {
            type: Sequelize.STRING
        },

        correo: {
            type: Sequelize.STRING
        },

        password: {
            type: Sequelize.STRING
        },

        sesion: {
            type: Sequelize.BOOLEAN
        },

        imagen: {
            type: Sequelize.STRING
        },

        facebook: {
            type: Sequelize.STRING
        },
        
        instagram: {
            type: Sequelize.STRING
        },

        twitter: {
            type: Sequelize.STRING
        },

        linkedin: {
            type: Sequelize.STRING
        },

        rol: {
            type: Sequelize.STRING
        }
    });

    return Usuario;
};