const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const D = require('date-fns');

function createFileObject(filePath, options) {
  const { fileAccess, bucket } = options;
  const fileContent = fs.readFileSync(filePath);
  console.log(filePath.type)
  return ({
    Key: filePath.replace(/dist\//, ''),
    Body: fileContent,
    ACL: fileAccess,
    Bucket: bucket,
    ContentType: mime.lookup(filePath),
  })
}

function readFilesInDir(options) {
  function readFiles(targetDir, fileList = []) {
    fs.readdirSync(targetDir).forEach(file => {
      const filePath = path.join(targetDir, file);

      // Handle subfolders
      if (fs.statSync(filePath).isDirectory()) return readFiles(filePath, fileList);

      // Handle regular files
      const fileObject = createFileObject(filePath, options);
      fileList.push(fileObject);
    });

    return fileList;
  };

  return (targetDir, fileList) => readFiles(targetDir, fileList);
}

function createBucket(options = {}) {
  console.log(options);
  aws.config.update({
    region: options.awsRegion,
    accessKeyId: options.accessKeyId,
    secretAccessKey: options.accessSecret
  })
  const S3 = new aws.S3(options);
  return S3;
}

function uploadFilesToBucket(s3, fileList) {
  return new Promise((resolve, reject) => {
    fileList.map((item) => {
      s3.putObject(item, (err) => {
        if (err) reject(err);
      })
    });
    resolve(fileList);
  })
}

function isEnvironmentInvalid(config) {
  const { bucketName, accessKeyId, accessSecret, awsRegion } = config;
  return (!bucketName || !accessKeyId || !accessSecret || awsRegion);
}

function uploadToS3(config) {
  if (process.env.NODE_ENV !== 'production') {
    return console.log('Invalid build mode.');
  }
  if (isEnvironmentInvalid) {
    return console.error('Invalid environment configuration.');
  }

  const s3 = createBucket(config);
  const getFilesWithOptions = readFilesInDir({
    fileAccess: 'public-read',
    bucket: config.bucketName
  });

  return Promise.resolve(getFilesWithOptions(config.buildDir))
    .then((items) => {
      console.log(items);
      return items;
    })
    .then((fileList) => {
      uploadFilesToBucket(s3, fileList)
      return fileList.length;
    })
    .then((itemCount) => console.log('Uploaded', itemCount, 'objects successfully!'))
    .catch((err) => console.error(err));
}


function main() {
  console.info('Starting upload on', D.format(new Date(), 'ddd DD.M. HH:mm:ss'));
  return uploadToS3({
    buildDir: './dist/',
    bucketName: process.env.AWS_BUCKET_NAME,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    accessSecret: process.env.AWS_SECRET_KEY,
    awsRegion: process.env.AWS_REGION,
  });
}

main();
