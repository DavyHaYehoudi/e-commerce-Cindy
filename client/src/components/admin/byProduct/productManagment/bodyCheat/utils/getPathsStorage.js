export function getPathFromStorageUrl(url) {
  const pathPart = url.split(process.env.REACT_APP_URL_STORAGE)[1];
  const path = pathPart.split("?")[0];
  const decodedPath = decodeURIComponent(path.replace(/\+/g, " "));
  return decodedPath;
}
