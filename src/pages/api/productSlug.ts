import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;

  // Vérifier si le paramètre `page` est présent
  if (!page) {
    return res.status(400).json({ error: "Le paramètre 'page' est requis." });
  }

  try {
    const apiUrl = `https://admin-dashboard-three-kappa-36.vercel.app/api/product?page=${page}`;
    
    // Headers pour la requête
    const headers = {
      Authorization: "Bearer eyJ0eXAiOiAiVENMWi0Yzg3LThkZDUtM2ZjNGEyZDhhMmFj",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // Faire la requête au backend
    const response = await fetch(apiUrl, {
      method: req.method,
      headers,
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Erreur du backend : ${response.statusText}` });
    }

    const data = await response.json();

    // Autorisations CORS
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // OPTIONS pour préflight
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    // Retourner les données
    res.status(200).json(data);
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

export default handler;
