import React from "react";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import { ToastContainer, toast } from "react-toastify";

const ProductMeta = () => {
  const currentURL = window.location.href;

  const handleFacebookShare = () => {
    const encodedURL = encodeURIComponent(currentURL);
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;

    if (isValidURL(facebookShareURL)) {
      window.open(facebookShareURL, "_blank");
    } else {
      toast.error("URL Facebook invalide !");
    }
  };

  const handleInstagramShare = () => {
    const copyToClipboard = () => {
      const textArea = document.createElement("textarea");
      textArea.value = currentURL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    };

    copyToClipboard();
    toast.success(
      "L'URL a été copiée. Vous pouvez maintenant la coller sur votre compte Instagram."
    );
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div id="product-meta">
      <span>Partager</span>
      <div className="product-meta-shareList">
        <button onClick={handleFacebookShare}>
          <img src={facebook} alt="facebook" width="20px" />
        </button>
        <button onClick={handleInstagramShare}>
          <img src={instagram} alt="instagram" width="20px" />
        </button>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default ProductMeta;
