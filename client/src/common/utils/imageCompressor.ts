import imageCompression from 'browser-image-compression';

export const imageCompressor = async (image: File) => {
  const resizingBlob = await imageCompression(image, { maxSizeMB: 0.5 });
  const resizingFile = new File([resizingBlob], image.name, { type: image.type });
  return resizingFile;
};
