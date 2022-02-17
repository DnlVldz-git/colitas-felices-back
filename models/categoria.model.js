module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("categoria", {
        Categoria: {
            type: Sequelize.STRING
        }
    });

    
    return Categoria;
};

