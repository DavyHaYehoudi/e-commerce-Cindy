import React from "react";

import CartOffcanvas from "../MasterProduct/cartAccess";
import { AiOutlineHeart } from "react-icons/ai";

const Home = () => {
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
              <button>Etes-vous curieuse ? Si oui, c'est par ici</button>
            </div>
          </section>{" "}
          <section>
            <h3>
              {" "}
              Collections coup de coeur <AiOutlineHeart />{" "}
            </h3>
            <div className="collections-star-gallery"></div>
          </section>
          <section className="bk-image-intermetted-1">
            <div className="banner-media-home"></div>
          </section>
          <section>
            <div className="products-star-container">
              <h3>Découvrez</h3>
              <div className="products-star-gallery"></div>
              <div className="info-legal">
                <p className="item">Retours sous 14 jours</p>
                <p className="item">Paiements sécurisés</p>
                <p className="item">Service clientèle 5 jours sur 7</p>
              </div>
            </div>
          </section>
          <section className="bk-image-intermetted-2">
          <div className="banner-media-home"></div>
          </section>
          <section className="partners">
            <div className="partners-container">
              <h3>Mes Partenaires</h3>
              <div className="partners-gallery"></div>
            </div>
          </section>
        </div>
      </div>
      <CartOffcanvas />
    </main>
  );
};

export default Home;
