import { Storage } from "@google-cloud/storage";

export const googleStorage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename:process.env.GOOGLE_APPLICATION_CREDENTIALS
});

export const googleBucket = googleStorage.bucket(process.env.GOOGLE_STORAGE_BUCKET_NAME || '');

export async function uploadGoogleFile(filePath, destFileName, generationMatchPrecondition = 0) {
  const options = {
    destination: destFileName,
    preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
  };

  // 确保返回的 URL 使用正确的文件路径
  const url = `https://storage.googleapis.com/${process.env.GOOGLE_STORAGE_BUCKET_NAME ? process.env.GOOGLE_STORAGE_BUCKET_NAME + '/' : ''}${destFileName}`;

  try {
    // 上传文件并设置公开访问权限
    await googleBucket.upload(filePath, options);
    await googleBucket.file(destFileName).makePublic();
    return url;
  } catch (error) {
    console.error('文件上传失败:', error);
    throw new Error(`文件上传失败: ${error.message}`);
  }
}
