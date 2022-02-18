const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.noticia = require("./noticia.model.js")(sequelize, Sequelize);
db.categoria = require("./categoria.model.js")(sequelize, Sequelize);
db.carousel = require("./carousel.model.js")(sequelize, Sequelize);
db.programa = require("./programa.model.js")(sequelize, Sequelize);
db.voluntario = require("./voluntario.model.js")(sequelize, Sequelize);
db.solicitud = require("./solicitud.model.js")(sequelize, Sequelize);
db.apoyo = require("./apoyo.model.js")(sequelize, Sequelize);
db.proyecto = require("./proyectos.model")(sequelize, Sequelize);
db.proyecto = require("./proyectos.model")(sequelize, Sequelize);
db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.testimonio = require("./testimonios.model.js")(sequelize, Sequelize);
db.Donaciones = require("./donacion.model.js")(sequelize, Sequelize);

//db.noticia.belongsTo(db.categoria, {foreignKey: 'categoriaId', sourceKey: 'id'});
module.exports = db;