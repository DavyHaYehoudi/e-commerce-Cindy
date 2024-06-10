import React, { useEffect } from "react";
import useAuthWrappers from "../../useAuthWrappers";
import useFetchData from "../../useFetchData";

const TermsOfSales = () => {
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
    <div className="termsOfSales">
      <h1>Conditions generales de vente</h1>
      <div id="termsOfSales-contain">
        <p>
          Les présentes conditions de vente sont conclues d’une part par Atelier
          Noralya dont le siège social est situé au 555, Avenue de la république
          83560 VINON-SUR-VERDON, inscrit sous le numéro SIRET 91861010600018,
          code APE 9609Z et d’autre part, par toute personne physique ou morale
          dénommée ci-après " le CLIENT " souhaitant procéder à un achat via le
          site Internet de www.atelier-noralya.com .
        </p>
        <h2>objet</h2>
        <p>
          Les présentes conditions de vente visent à définir les relations
          contractuelles entre Atelier Noralya et le client et les conditions
          applicables à tout achat effectué par le biais du site
          www.atelier-noralya.com.
          <br />
          L’acquisition d’un bien ou d’un service à travers le présent site
          implique une acceptation sans réserve par le client des présentes
          conditions de vente.
          <br /> Ces conditions de vente prévaudront sur toutes autres
          conditions générales ou particulières non expressément agréées par
          Atelier Noralya.
          <br />
          Atelier Noralya se réserve le droit de pouvoir modifier ses conditions
          de vente à tout moment.
          <br /> Dans ce cas, les conditions applicables seront celles en
          vigueur à la date de la commande par le client.
        </p>
        <h2>mes creations</h2>
        <p>
          Les créations sont réalisées de manière artisanale avec beaucoup
          d'attention dans notre atelier du sud de la France.
          <br /> J'ai choisi de fabriquer nos créations à la demande.
          <br />
          Les pierres utilisées étant toutes naturelles, celles-ci peuvent
          varier légèrement au niveau de la taille et de la couleur.
          <br /> Les photos sont non contractuelles.
          <br /> Atelier Noralya veille à ce que le modèle soit réalisé au plus
          près de l'article présenté sur le site www.atelier-noralya.com (sauf
          demandes de personnalisation).
          <br />
          Nos apprêts sont sans nickel conformément à la loi.
          <br />
           Nos modèles sont réalisés avec du goldFilled, de l'argent 925 et de
          acier inoxydable.
          <br /> Les matériaux utilisés sont précisés dans chaque fiche
          descriptive des créations.
        </p>
        <h2>prix</h2>
        <p>
          Les prix des produits vendus sont ceux en vigueur le jour de la prise
          de commande.
          <br /> Ils sont libellés en Euros.
          <br /> La T.V.A est non applicable conformément à l’article 293 B du
          Code Général des Impôts.
          <br /> Les prix ne comprennent pas les frais d’expédition (port,
          emballage et confection du colis selon les montants en vigueur) qui
          sont alors facturés en supplément du prix des articles achetés.
          <br /> Les frais d’expédition seront indiqués avant l’enregistrement
          de la commande par le Client.
          <br /> En revanche tous droits de douane ou autres taxes locales
          susceptibles d’être exigibles, sont à la seule charge du Client et
          sous sa responsabilité.
          <br /> Atelier Noralya se dégage de fait de toute responsabilité
          juridique si l'acquittement des taxes n'était pas effectué par le
          Client.
          <br /> Je ne pourrai être tenue responsable envers vous ou tout tiers
          de tout changement de prix, ou encore de toute modification,
          suspension ou interruption du Service.
          <br />
          Pour toute commande supérieure à 100e, les frais d'envois sont
          offerts (pour la France métropolitaine). Pour les DOM-TOM, l'Union
          Européenne et l international, les frais d'envois sont offerts pour
          les commandes supérieures à 180e, offre non cumulable avec les codes
          promotionnels). 
        </p>
        <h2>identification prealable</h2>
        <p>
          Pour passer une commande, le Client doit s'identifier avec son adresse
          email et son mot de passe. Pour toute première commande, le Client
          devra suivre une procédure de création de compte indiquée sur le Site
          Internet.
        </p>
        <h2>paiement</h2>
        <p>
          Le paiement s’effectue par carte bancaire via la plateforme sécurisée
          STRIPE.
          <br /> Toutes les transactions sont sécurisées et chiffrées par cette
          plateforme.
          <br /> STRIPE France est une société à responsabilité limitée,
          immatriculée sous le SIREN 807572011.
          <br />
          Pour toute information, le Client peut consulter le site internet
          :https://stripe.com/fr
          <br />
          Le Client reconnaît expressément que la communication du numéro de sa
          carte bancaire à Atelier Noralya vaut autorisation de débit de son
          compte à concurrence du prix de sa Commande.
          <br /> La carte bancaire du Client sera débitée au moment de la
          confirmation de sa Commande.
          <br /> A cette fin, le Client garantit qu’il est titulaire de la carte
          bancaire à débiter et que le nom y figurant est bien le sien.
          <br />
          Le cas échéant, une notification d’annulation de Commande pour défaut
          de paiement est envoyée au Client par Atelier Noralya sur l’adresse
          mail communiquée par le Client.
          <br /> Atelier Noralya se réserve le droit de suspendre toute gestion
          de Commande ou toute livraison en cas d’impayé ou d’incident de
          paiement (coordonnées bancaires fausses, défaut de provision du compte
          du Client, etc.).
          <br />  Les données enregistrées et conservées, hors données de
          paiement, par Atelier Noralya,  constituent la preuve de la Commande
          et de l’ensemble des ventes passées.
          <br /> Les données enregistrées par Stripe constituent la preuve de
          toute transaction financière intervenue entre le Client et Atelier
          Noralya.
          <br />
          Une facture acquittée reprenant les différents éléments de la Commande
          est envoyée par mail au Client.
          <br />
          Le prix est payable comptant par le Client, en totalité au jour de la
          passation de la Commande.
          <br />
          Après validation des informations, la Commande est considérée comme
          définitive et exigera le paiement de la part du Client selon les
          modalités prévues.
          <br />
          Les paiements effectués par le Client ne seront considérés comme
          définitifs qu’après encaissement effectif par Atelier Noralya des
          sommes dues.
          <br /> C’est à la réception du paiement que la Commande du Client est
          définitivement enregistrée.
          <br />
          Atelier Noralya ne sera pas tenu de procéder à la délivrance des
          Produits commandés par le Client si celui-ci ne lui en paye pas le
          prix en totalité dans les conditions ci-dessus indiquées.
        </p>
        <h2>reclamations et litiges</h2>
        <p>
          Toute réclamation du Client devra être faite par écrit et transmise à
          l’adresse électronique suivante : <br />
          bonjour@ateliernoralya.com <br />
          ou à l'adresse postale suivante :
          <br />
          Mme Pantoustier Cindy, 555, Avenue de la république 83560
          VINON-SUR-VERDON
          <br />
          En vertu de l’article 14, al. 1 de la directive européenne 2013/11/UE
          du 21 mai 2013 relative au RELC, la Commission Européenne met à la
          disposition des consommateurs une plateforme en ligne de règlement des
          litiges disponible à cette adresse :<br />
           http://ec.europa.eu/
        </p>
        <h2>propriete intellectuelle</h2>
        <p>
          Tous les éléments du site www.atelier-noralya.com sont et restent la
          propriété intellectuelle et exclusive de Atelier Noralya. 
          <br />
          Personne n’est autorisé à reproduire, exploiter, rediffuser, ou
          utiliser à quelque titre que ce soit, même partiellement, les éléments
          visuels du site (Images, photographies) sauf avec autorisation. 
          <br />
          Attention: Les modèles des bijoux de la marque Atelier Noralya ne sont
          pas libres de droit - Reproduction interdite
          <br />
          La marque Atelier Noralya est déposée à l'INPI.
        </p>
      </div>
    </div>
  );
};

export default TermsOfSales;
