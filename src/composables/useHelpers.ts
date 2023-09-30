export const replaceCloudinaryURL = (text: string) => {
  const result = text.replace("https://res.cloudinary.com/dmtlew6gk/image/upload/", "");
  return result;
};
