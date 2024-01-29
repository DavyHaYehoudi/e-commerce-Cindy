import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === "production" 
      ? process.env.MONGODB_URI_PROD
      : process.env.MONGODB_URI_DEV;

    await mongoose.connect(mongoURI, { autoIndex: true });

    console.log("Connexion réussie à la base de données MongoDB");

    const db = mongoose.connection;

    // Renommage de collection
    // const ancienNom = 'productsByOrders';
    // const nouveauNom = 'productsbyorders';

    // db.collection(ancienNom).rename(nouveauNom, (err, result) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log(`La collection ${ancienNom} a été renommée en ${nouveauNom}`);
    //   }
    //   mongoose.connection.close();
    // });
  } catch (error) {
    console.error("Erreur de connexion à la base de données :", error);
  }
};

export default connectToDatabase;
