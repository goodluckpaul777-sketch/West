export const getImageSrc = (img: any): string => {
  if (!img) return "";
  const raw = typeof img === "object" && img !== null && "src" in img ? img.src : String(img);
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("data:") || raw.startsWith("/")) {
    return raw;
  }
  return `/images/${raw}`;
};
