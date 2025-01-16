import { useState } from "react";
import { Button } from "@/UI/Design-System/Button";
import { Input } from "@/UI/Design-System/Input";
import { Typographie } from "@/UI/Design-System/Typographie";
import Link from "next/link";
import bcrypt from "bcryptjs"; // Import bcryptjs
import { useRouter } from "next/router";
import { SignJWT } from "jose"; // Import de jose

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Envoi de la requête GET pour récupérer les utilisateurs (ou une autre API selon ta logique)
      const response = await fetch("/api/logInCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erreur lors de la connexion.");
        return;
      }

      const usersData = await response.json();
      console.log("Utilisateurs reçus:", usersData);

      // Recherche de l'utilisateur correspondant à l'email
      const user = usersData.find(
        (user: { email: string }) => user.email === email
      );

      console.log(user);

      if (!user) {
        setErrorMessage("Email non trouvé.");
        return;
      }

      // Comparer le mot de passe entré avec celui stocké
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        // Utilisation de jose pour signer le token
        const token = await new SignJWT({ userId: user.id })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1h")
          .sign(new TextEncoder().encode(JWT_SECRET));

        // Stockage du token dans le localStorage (ou un cookie)
        localStorage.setItem("authToken", token);
        console.log("Connexion réussie !");
        router.push("/");
      } else {
        setErrorMessage("Mot de passe incorrect.");
      }
    } catch (error) {
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="w-full flex ">
      <div className="hidden flex-1 h-screen bg-login md:flex"></div>
      <div className="flex flex-1 items-center justify-center min-h-screen p-4">
        <div className="space-y-[50px] max-w-[600px]">
          <div className="space-y-[20px]">
            <Typographie font="cooper" variant="h2">
              Bienvenue sur Cheapstored, <br /> Connectez-vous pour continuer.
            </Typographie>
            <Typographie font="ambit" variant="tag-title">
              Vous n&apos;avez pas de compte?
              <Link href="/userpages/SignIn">
                <span className="underline text-blue cursor-pointer">
                  {" "}
                  Créez un compte
                </span>
              </Link>
              <br /> Cela prendra moins d'une minute
            </Typographie>
          </div>

          <form
            onSubmit={handleLoginSubmit}
            className="flex flex-col items-center gap-[20px] w-full"
          >
            <div className="space-y-[10px] w-full">
              <Typographie variant="h3" font="ambit">
                Email
              </Typographie>
              <Input
                variant="email"
                placeholder="email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-[10px] w-full">
              <Typographie variant="h3" font="ambit">
                Mot de passe
              </Typographie>
              <Input
                variant="password"
                placeholder="votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <Typographie
              theme="secondary"
              variant="h3"
              className="underline cursor-pointer"
              font="ambit"
            >
              Mot de passe oublié?
            </Typographie>
            <Button
              type="submit"
              size="large"
              className="w-full"
              variant="filled"
            >
              Se Connecter
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
