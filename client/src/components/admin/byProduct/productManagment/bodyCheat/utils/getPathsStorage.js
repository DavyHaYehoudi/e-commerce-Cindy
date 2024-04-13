export function getPathFromStorageUrl(url) {
    const pathPart = url.split(
      "firebasestorage.googleapis.com/v0/b/noralyapreprod.appspot.com/o/"
    )[1];
    const path = pathPart.split("?")[0];
    const decodedPath = decodeURIComponent(path.replace(/\+/g, " "));
    return decodedPath;
  }

  