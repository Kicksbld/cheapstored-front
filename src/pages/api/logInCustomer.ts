import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body; // Utilisation de POST pour recevoir les données
  if (!email) {
    return res.status(400).json({ message: "Email est requis" });
  }

  try {
    const response = await fetch(
      `https://admin-dashboard-three-kappa-36.vercel.app/api/customer/customer?email=${email}`,
      {
        method: "GET", // Utilisation de GET pour récupérer les données par email
        headers: {
          Authorization: `Bearer $eyJ0eXAiOiAiVENMWi0Yzg3LThkZDUtM2ZjNGEyZDhhMmFj`, // Utiliser une variable d'environnement
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const data = await response.json();
    res.status(200).json(data); // Répondre avec les données utilisateur

  } catch (error) {
    console.error("Erreur de connexion :", error);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
};

export default handler;
