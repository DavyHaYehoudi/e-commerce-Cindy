import React from "react";
import CartOffcanvas from "../MasterProduct/cartAccess";
import { AiFillHeart } from "react-icons/ai";
import partner1 from "../../styles/assets/partners/partner-1.jpeg";
import partner2 from "../../styles/assets/partners/partner-2.jpeg";
import partner3 from "../../styles/assets/partners/partner-3.jpeg";
import partner4 from "../../styles/assets/partners/partner-4.jpeg";
import CardPartner from "./cards/CardPartner";
import CardCollection from "./cards/CardCollection";
import CardProduct from "../../shared/CardProduct";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import settings from "../../styles/utils/slider";

const partners = [
  { id: 0, link: "https://marjoryclos.hubside.fr/", img: partner1 },
  { id: 1, link: "https://www.lhccoiffuremariage.com/", img: partner2 },
  { id: 2, link: "https://marjoryclos.hubside.fr/", img: partner3 },
  { id: 3, link: "https://cindy-naturopathe.com/", img: partner4 },
];
const Home = () => {
  const collectionsStore = useSelector((state) => state?.collection?.data);
  const productsStore = useSelector((state) => state?.product?.data);
  const collectionsStar = collectionsStore.filter(
    (collection) => collection?.isStar
  );
  const productsStar = productsStore.filter((product) =>
    product?.materials.some((mat) => mat?.isStar)
  );

  return (
    <main id="home">
      <div id="home-container">
        <div className="animated-container">
          <section className="hero-bkg">
            <div className="hero-bg-container">
              <div className="hero-bg-left banner-media-home"></div>
              <div className="hero-bg-right banner-media-home"></div>
            </div>
            <div className="title">
              <h1>
                Quelque chose de vieux, Quelque chose de neuf, Quelque chose
                d'emprunté, Quelque chose de bleu
              </h1>
              <h2>
                Laissez-vous séduire par cette ancienne coutume et créons
                ensemble un bijou, LE bijou qui vous ressemble, qui vous honore
                et qui rend hommage à votre lignée familiale.
              </h2>
              <p className="btn">
                <Link to="tradition">
                  Etes-vous curieuse ? Si oui, c'est par ici
                </Link>
              </p>
            </div>
          </section>{" "}
          <hr />
          <section className="collections">
            <h3>
              {" "}
              Collections coup de coeur{" "}
              <AiFillHeart color="var(--favorite-heart-bg)" />
            </h3>
            <div className="collections-star-gallery">
              {collectionsStar &&
                collectionsStar.length > 0 &&
                collectionsStar
                  .filter((collection) => !collection?.isArchived)
                  .map((collection) => (
                    <CardCollection
                      key={collection?._id}
                      collection={collection}
                    />
                  ))}
            </div>
          </section>
          <section className="bk-image-intermetted-1">
            <div className="banner-media-home"></div>
          </section>
          <section>
            <div className="products-star">
              <h3>Découvrez</h3>
              <Slider {...settings}>
                {productsStar &&
                  productsStar.length > 0 &&
                  productsStar
                    .filter(
                      (product) => !product?.isArchived && product?.isActive
                    )
                    .map((product) =>
                      product?.materials
                        .filter((mat) => !mat?.isArchived && mat?.isActive)
                        .map((mat) => (
                          <CardProduct
                            key={product?._id}
                            product={product}
                            material={mat}
                          />
                        ))
                    )}
              </Slider>
              <div className="info-legal">
                <Link to="deliveries&returns">
                  {" "}
                  <p className="item card">Retours sous 14 jours</p>
                </Link>

                <Link to="terms-of-sales">
                  <p className="item card">Paiements sécurisés</p>
                </Link>
                <Link to="deliveries&returns">
                  {" "}
                  <p className="item card">Service clientèle 5 jours sur 7</p>
                </Link>
              </div>
            </div>
          </section>
          <section className="bk-image-intermetted-2">
            <div className="banner-media-home"></div>
          </section>
          <section className="partners">
            <div className="partners-container">
              <h3>Mes Partenaires</h3>
              <div className="partners-gallery">
                {partners.map((partner) => (
                  <CardPartner key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <CartOffcanvas />
    </main>
  );
};

export default Home;
