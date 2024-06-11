import React, { useEffect } from "react";
import useAuthWrappers from "../../useAuthWrappers";
import useFetchData from "../../useFetchData";
import CartOffCanvas from "../MasterProduct/cartAccess";

const LegalNotice = () => {
  const { role: getRole, clientId: getClientId } = useAuthWrappers();
  const role = getRole();
  const clientId = getClientId();
  useFetchData({ role, clientId });
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    scrollToTop();
  }, []);
  return (
    <div className="legalNotice">
      <div className="animated-container">
        <h1>mentions legales</h1>
        <div id="legalNotice-contain">
          <p>
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
            pour la confiance en l'économie numérique, il est précisé aux
            utilisateurs du site Atelier Noralya l'identité des différents
            intervenants dans le cadre de sa réalisation et de son suivi.
            <br /> Atelier Noralya est une marque artisanale française de bijoux
            et d'accessoires.
          </p>
          <h2>me contacter :</h2>
          <p>
            Mme Pantoustier Cindy
            <br />
            Atelier: 555, avenue de la république 83560 VINON-SUR-VERDON
            <br />
            Adresse e-mail: bonjour@ateliernoralya.com
          </p>
          <h2>edition du site :</h2>
          <p>
            Le présent site, accessible à l’URL www.atelier-noralya.com, est
            édité par :<br />
            Pantoustier Cindy, résidant au 555, avenue de la république 83560
            VINON-SUR-VERDON, de nationalité Française (France), né(e) le
            28/01/1988,  inscrite au R.C.S. de LIMOGES sous le numéro Limoges A
            514 471 547
            <br />
            Entreprise individuelle sous le régime fiscale et social de la
            micro-entreprise.
            <br />
            Selon l'article n°293B du CGI, la TVA n'est pas applicable sur nos
            produits.
          </p>
          <h2>hebergement :</h2>
          <p>
            Le Site est hébergé par la société OVH SAS, situé 2 rue Kellermann -
            BP 80157 - 59053 Roubaix Cedex 1
          </p>
          <h2>directeur de la publication :</h2>
          <p>
            Le Directeur de la publication du Site est Davy SEBBAH.
            <br />
            Atelier Noralya est une marque déposée à l'INPI depuis 2023.
          </p>
          <h2>donnees personnelles :</h2>
          <p>
            Le traitement de vos données à caractère personnel est régi par
            notre Charte du respect de la vie privée, disponible depuis la
            section "Charte de Protection des Données Personnelles",
            conformément au Règlement Général sur la Protection des Données
            2016/679 du 27 avril 2016 («RGPD»).
          </p>
          <p>Numéro de déclaration au CNIL: 1481988 v 0</p>
        </div>
      </div>
      <CartOffCanvas />
    </div>
  );
};

export default LegalNotice;
