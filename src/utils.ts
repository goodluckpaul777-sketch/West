export const getImageSrc = (img: any): string => {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object" && "src" in img) return img.src;
  return String(img);
};
