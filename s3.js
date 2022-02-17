const aws = require('aws-sdk');
const dotenv = require('dotenv');
const crypto = require("crypto");
const { promisify } = require("util");

const randomBytes = promisify(crypto.randomBytes);

dotenv.config()

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

exports.generateUploadURL = async () => {

    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })        
    let uploadURL = await s3.getSignedUrlPromise('putObject', params)
    
    return uploadURL;
}
exports.getImagen = async (key) => {        

    const url = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: key,
        Expires: 100000
    })

    return url;
}

exports.deleteImagen = async (key) => {
    try {        
        const bucketParams = { Bucket: bucketName, Key: key };        
        const data =  s3.deleteObject(bucketParams).promise();                
        return 'exito';
    } catch (err) {
        console.log("Error", err);
        return 'error';      
    }
  };

exports.getImagenes = async () => {

    // Create the parameters for calling listObjects
    const ss = new aws.S3({
        //apiVersion: '2006-03-01',
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccesKey,
        region: region,
        signatureVersion: 'v4'
    });

    // Create the parameters for calling listObjects
    var bucketParams = {
        Bucket: bucketName,
    };
    // Call S3 to obtain a list of the objects in the bucket
    //ss.listObjects(bucketParams, function (err, data) {
    const { Contents } = await ss
        .listObjectsV2({ Bucket: bucketName })
        .promise();

    return Contents;

}