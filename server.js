
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { deleteImagen, generateUploadURL, getImagen } = require("./s3.js");
const { promisify } = require("util");
const crypto = require("crypto");
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const randomBytes = promisify(crypto.randomBytes);

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccesKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
    //apiVersion: '2006-03-01',
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccesKey,
    region: region,    
    signatureVersion: 'v4'
});

//require('./models/associations.models');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();

//url de origen para cors

const origin = process.env.CORS_OPTIONS_ORIGINS;

var corsOptions = {
    origin: origin
};

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Request-Method');

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();

});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.post('/mexico-amparame/s3Url', upload.single('foto'), async (req, res) => {    
    const stream = fs.createReadStream(req.file.path);

    const ext = path.extname(req.file.originalname).toLowerCase();    

    let fileType = "";

    if (ext == ".png") {
        fileType = "image/png";
    } else if (ext == ".jpg" || ext == ".jpeg") {
        fileType = "image/jpg";
    } else {
        res.send({data: "error"});
    }

    stream.on("error", function (err) {
        console.log("error in read stream: ", err);
        throw err;
    });

    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');

    let params = {
        Bucket: bucketName,
        Body: stream,
        Key: imageName,
        ContentType: fileType,
    };
    const data = await s3.upload(params).promise();

    res.send({ data: data.Key });
})

app.get('/mexico-amparame/s3Url2/:key', async (req, res) => {
    const key = req.params.key;
    const imagen = await getImagen(key);            
    res.send(imagen);
});

app.get('/mexico-amparame/beneficiarios', async (req, res) => {
    try{
        fs.readFile('datos.json', 'utf-8', (err, data) => {
            if (err) {
                res.send({datos: 'error'});
                return;
            }
        
            // parse JSON object
            const datos = JSON.parse(data.toString());                
            res.send(datos);
        });
    }catch(err){
        
        console.log("no hay json de beneficiarios")
    }    
});

app.post('/mexico-amparame/beneficiarios', async (req, res) => {
    const data = req.body;
    const datos = JSON.stringify(data);
    try{
        fs.writeFile('datos.json', datos, (err) => {
            if (err) {
                res.send({datos: 'error'});
                return;
            }
            console.log("datos guardados.");
        });
    }catch(err){
        console.log(err)
    }    
});

app.delete('/mexico-amparame/s3Url3/:key', async (req, res) => {
    const key = req.params.key;
    const data = await deleteImagen(key);        
    res.send(data)    
});

const PORT = process.env.PORT || 0000;
app.listen(PORT, () => {
    console.log(`Server esta ejecutandose en puerto ${PORT}.`);
});

//elimina todos los datos de las tablas y las vuelve a crear
const sync = (process.env.MA_DB_SYNC === 'true'); 

const db = require("./models");

db.sequelize.sync({ alter: sync }).then(() => {
    if(sync) {
        console.log("Sincronizar db");
    }else{
        console.log("No se harán cambios a la db");
    }
    
});

require("./routes/noticia.routes.js")(app);
require("./routes/carousel.routes.js")(app);
require("./routes/proyectos.routes.js")(app);
require("./routes/voluntario.routes.js")(app);
require("./routes/programa.routes.js")(app);
require("./routes/categoria.routes.js")(app);
require("./routes/usuario.routes.js")(app);
require("./routes/solicitud.routes.js")(app);
require("./routes/apoyo.routes.js")(app);
require("./routes/testimonios.routes.js")(app);
require("./routes/payment.routes.js")(app);
require("./routes/stripe.routes.js")(app);
require("./routes/donador.routes.js")(app);