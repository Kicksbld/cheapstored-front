// pages/api/proxy-customer.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// L'URL de l'API externe
const EXTERNAL_API_URL = 'https://admin-dashboard-three-kappa-36.vercel.app/api/customer/customer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Transmettre la requête vers l'API externe
      const response = await fetch(EXTERNAL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      // Si la réponse de l'API externe n'est pas OK, renvoyer l'erreur
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to add customer' });
      }

      // Récupérer la réponse de l'API externe et renvoyer-la au frontend
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === "PUT") {
    try {
      const response = await fetch(EXTERNAL_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  return res.status(405).json({ error: 'Method Not Allowed' });
}