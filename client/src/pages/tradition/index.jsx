import React from "react";
import CartOffcanvas from "../MasterProduct/cartAccess";
import tradition1 from "../../styles/assets/tradition/tradition-1.jpeg";
import tradition2 from "../../styles/assets/tradition/tradition-2.jpeg";
import tradition3 from "../../styles/assets/tradition/tradition-3.jpeg";
import tradition4 from "../../styles/assets/tradition/tradition-4.jpeg";
import tradition5 from "../../styles/assets/tradition/tradition-5.jpeg";

import { Link } from "react-router-dom";

const Tradition = () => {
  return (
    <div id="tradition">
      <div className="animated-container">
        <section className="hero block">
          <div className="hero-content block-content right">
            <div className="text">
              <p className="first">
                <b>
                  « Something old, Something new, Something borrowed, Something
                  blue and a silver sixpence in her shoe. »
                </b>{" "}
              </p>
              <br />
              <p>
                Laissez-vous séduire par cette ancienne Tradition et mêlez une
                partie de vous ou de quelqu'un de cher à vos yeux dans Votre
                bijou.
              </p>
              <br />
              <p>
                <b>Envie d'en savoir plus ? Lisez-moi jusqu'au bout ...</b>{" "}
              </p>
            </div>
            <div className="illustration right">
              <img src={tradition1} alt="" />
            </div>
          </div>
        </section>
        <section className="title">
          <div className="title-content">
            <h1>La Tradition</h1>
            <p className="first">
              « Something old, Something new, Something borrowed, Something blue
              and a silver sixpence in her shoe. »
            </p>
            <br />
            <p>
              Si comme moi il vous arrive de regarder des films à l'eau de rose,
              il se peut que vous ayez déjà entendu parler de cette coutume à
              suivre le jour de son mariage.{" "}
            </p>
            <br />
            <p>
              Tout a commencé au XIXème siècle en Angleterre après le récit d'un
              poème "Quatre Quelque Chose" énumérant chaque chose que devait
              porter la mariée le jour J. Dans quel intérêt? Vivre un amour
              sincère bien sûr.
            </p>
          </div>
        </section>
        <section className="somethingOld block">
          <div className="somethingOld-content block-content left">
            <div className="illustration left">
              <img src={tradition2} alt="" />
            </div>
            <div className="text">
              <h2>Something Old</h2>
              <p>
                "Quelque chose de vieux" est le symbole du lien familial, du
                passage de la jeune fille à la Femme. Un bijou ou une partie
                d'un bijou ayant appartenu à votre mère, ou grand-mère ou
                arrière grand-mère sera idéal pour cette symbolique là. Et si
                rien ne vous vient, sachez que le Gold-Filled (matériau
                principal que j'utilise) est de l'or recyclé donc parfaitement
                aligné avec la tradition.
              </p>
            </div>
          </div>
        </section>
        <section className="somethingNew block">
          <div className="somethingNew-content block-content right">
            <div className="text">
              <h2>Something New</h2>
              <p>
                "Quelque chose de neuf" pour symboliser un nouveau chapitre dans
                sa vie de Femme. Votre robe de mariée, vos chaussures ou bien un
                bijou Noralya, c'est en général la coutume la plus facile à
                respecter.
              </p>
            </div>
            <div className="illustration right">
              <img src={tradition3} alt="" />
            </div>
          </div>
        </section>
        <section className="somethingBorrowed block">
          <div className="somethingBorrowed block-content left">
            <div className="illustration left">
              <img src={tradition4} alt="" />
            </div>
            <div className="text">
              <h2>Something Borrowed</h2>
              <p>
                "Quelque chose d'emprunté", un ou une amie qui compte beaucoup
                dans votre vie pourrait vous prêter ce petit Quelque chose pour
                le Jour J: une épingle à cheveux ou une épingle à nourrice pour
                votre robe. La tradition dit que si cet(te) ami(e) est comblé(e)
                dans son mariage alors c'est encore mieux.
              </p>
            </div>
          </div>
        </section>
        <section className="somethingBlue block">
          <div className="somethingBlue-content block-content right">
            <div className="text">
              <h2>Something Blue</h2>
              <p>
                La partie la plus essentielle à mes yeux, ce "quelque chose de
                bleu" qui fermera la boucle de cette coutume ancestrale. Le bleu
                symbolise la pureté de votre amour envers votre moitié. Des
                semelles bleues à un ruban de satin cousu à la robe, ou mieux
                encore le Collier "SOMETHING BLUE" de l'Atelier Noralya. Vous
                trouverez j'en suis sûre ce petit Quelque Chose qui vous fait
                voir la vie en Bleu.
              </p>
            </div>
            <div className="illustration right">
              <img src={tradition5} alt="" />
            </div>
          </div>
        </section>
        <hr />
        <section className="particularity">
          <div className="particularity-content">
            <h3>La particularité de l'Atelier Noralya ?</h3>
            <ol>
              <li>
                J'intègre un ou plusieurs éléments de cette tradition à votre
                bijou pour qu'il soit unique, qu'il vous ressemble et qu'il vous
                accompagne dans des étapes importantes de votre vie.
              </li>
              <li>
                Dans un premier temps, nous échangeons ensemble sur vos souhaits
                : Gold-Filled, Argent Massif, perles de Tahiti, perles d'eau
                douce, pierres naturelles, ...{" "}
              </li>
              <li>
                Par la suite, vous m'indiquez quels sont les éléments que vous
                avez déjà en votre possession et que vous souhaitez déposer sur
                le bijou: pendentif, chaine, perle, mèche de cheveux, ...
              </li>
              <li>Je vous envoie un devis à me renvoyer signé par mail.</li>
              <li>
                J'attends la réception par courrier en lettre suivie de vos
                éléments. Nous échangeons par mail ou en visio pour voir
                l'avancée du bijou et je vous renvoie celui-ci une fois la
                proposition validée par vos soins.
              </li>
            </ol>
            <p className="magic">
              <b>
                Et maintenant, puisse la Magie nous accompagner dans cette
                création unique.
              </b>{" "}
            </p>
          </div>
          <p className="btn" id="contact">
            {" "}
            <Link to="/contact"> Contactez-moi</Link>
          </p>
        </section>
      </div>
      <CartOffcanvas />
    </div>
  );
};

export default Tradition;
