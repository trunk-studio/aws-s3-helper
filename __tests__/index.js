const S3Helper = require('./../index')
const config = require('config');
const request = require('superagent');

let {
  S3_KEY,
  S3_SECRET,
  S3_BUCKET,
  S3_REGION,
  PUT_EXPIRES_TIME,
  GET_EXPIRES_TIME,
} = config.aws

let {ENV} = config;

let constructorParams = {
  S3_KEY,
  S3_SECRET,
  S3_BUCKET,
  S3_REGION,
  ENV,
  PUT_EXPIRES_TIME,
  GET_EXPIRES_TIME,
}

let s3Helper = new S3Helper(constructorParams);

test('getPresignedUrlForPutObject url', async () => {
  
  let result = await s3Helper.getPresignedUrlForPutObject("test.png");  
  console.log("result", result);
  let upload = await request
  .put(result)
  .attach('file', `${__dirname}/test.png`)
  
})
  
test('getPresignedUrlForGetObject url', async () => {
  
  let result = await s3Helper.getPresignedUrlForGetObject("test.png");  
  console.log("result", JSON.stringify(result, null, 2));

})

test.only('zip s3 folder and upload', async () => {
  var s3FolderName = "case/A112345678";
  var s3ZipFileName = "zip/case/A112345678.zip";
  let result = await s3Helper.zipToS3File(s3FolderName, s3ZipFileName);
  console.log("result", JSON.stringify(result, null, 2));
  console.log("zipFileLocation", result.zipFileLocation);
  
  

}, 30000)
