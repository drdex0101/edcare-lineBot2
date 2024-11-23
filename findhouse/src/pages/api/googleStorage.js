import { Storage } from "@google-cloud/storage";

export const googleStorage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
});

// ... rest of the code remains the same ...

export const googleBucket = googleStorage.bucket(process.env.GOOGLE_STORAGE_BUCKET_NAME || '');

export async function uploadGoogleFile(filePath, destFileName, generationMatchPrecondition = 0) {
  const options = {
    destination: destFileName,
    preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
  };

  const url = `https://storage.googleapis.com/${process.env.GOOGLE_STORAGE_BUCKET_NAME ? process.env.GOOGLE_STORAGE_BUCKET_NAME + '/' : ''}${destFileName}`;

  try {
    await googleBucket.upload(filePath, options);
    await googleBucket.file(destFileName).makePublic();
    return url;
  } catch (error) {
    console.error('文件上传失败:', error);
    throw new Error(`文件上传失败: ${error.message}`);
  }
}
