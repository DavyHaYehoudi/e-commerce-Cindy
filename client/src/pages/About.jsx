import React from "react";
import profil from "../assets/profil.jpg"

const About = () => {
  return (
    <div id="about-container">
      <section className="story-section">
        <h2>MON HISTOIRE</h2>
        <p>
          Je m'appelle Cindy, créatrice de l'Atelier Noralya et émerveillée
          depuis aussi loin que je me souvienne par l'univers du Mariage.
          <br /> Par une douce journée d'hiver, l'idée est apparue comme une
          évidence :
          imaginer et créer un bijou qui vous ressemble en y intégrant
          l'ancienne Tradition du{" "}
          <i>
            Something Blue, Something New, Something Borrowed, Something Old
          </i>
          .<br /> Une coutume qui consiste à porter le jour de son union{" "}
          <i>
            Quelque chose de Bleu, Quelque chose de Nouveau, Quelque chose
            d'Emprunté, Quelque chose de vieux
          </i>
          .<br /> Un bijou qui vous sublimera que ce soit pour un moment unique
          ou pour illuminer votre quotidien.
        </p>
      </section>

      <section className="inspiration-section">
        <h2>MES INSPIRATIONS</h2>
        <p>
          De nature rêveuse et enthousiaste, je puise mes idées pieds nus dans
          l'herbe fraîche de mon jardin, en observant ce que la nature veut bien
          me montrer et en faisant confiance à mon intuition.<br /> Cela m'offre la
          possibilité de me ressourcer et de retranscrire sur mes croquis toutes
          les émotions ressenties pour en faire un bijou, votre bijou.
          <br /> Un je-ne-sais-quoi de magique !<br /> Je fais en sorte qu'à
          travers mes créations se dégage une sensation de douceur, d'amour et
          de simplicité en y mettant tout mon savoir-faire mais aussi de belles
          intentions.
          <br /> Ces dernières ont plus de pouvoir qu'elles n'en paraissent …
        </p>
      </section>

      <section className="noralya-section">
        <img src={profil} alt="profil"/>
        <h2>NORALYA</h2>
        <p>
          Certains me demandent parfois la signification du nom de mon Atelier.
          <br />
          Maman de deux jeunes enfants extraordinaires, respirant l'innocence et
          l'impétuosité, j'ai souhaité qu'ils fassent partie intégrante de ma
          petite entreprise.
          <br /> Pour ce faire, j'ai ainsi mélangé les lettres de leurs doux
          prénoms : Ronan & Julia
        </p>
      </section>

      <section className="engagements-section">
        <h2>MES ENGAGEMENTS</h2>
        <p>
          Préserver au mieux la nature est l'un de mes objectifs.
          <br /> Il est toujours possible de faire mieux certes, c'est pourquoi
          je me remets régulièrement en question et fait mon maximum pour
          respecter la nature.
          <br /> J'aime travailler avec les bijoux constitués de Goldfilled, un
          matériau consistant à appliquer une épaisse couche d'or.
          <br /> Sa particularité ? Nous sommes sur de l'or recyclé ce qui est
          une très belle alternative.
          <br /> Au final, le rendu est presque identique à celui de l'or !
          <br /> Les écrins sont fabriqués en Europe, les boîtes d'envois dans
          les Hauts-de-France, les deux conçus avec du carton certifié FSC® et
          de la colle à base d'eau.
        </p>
      </section>

      <div className="bottom-section">
        <p>
          Je souhaite du fond du cœur qu'en portant sur vous les créations de
          l'Atelier Noralya, un sourire se liera sur votre merveilleux visage.
        </p>
      </div>
    </div>
  );
};

export default About;
