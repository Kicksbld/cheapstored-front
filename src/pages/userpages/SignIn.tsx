import { useState } from "react";
import { Button } from "@/UI/Design-System/Button";
import { Input } from "@/UI/Design-System/Input";
import { Typographie } from "@/UI/Design-System/Typographie";
import Link from "next/link";
import bcrypt from "bcryptjs"; // Import bcryptjs
import { useRouter } from "next/router";

const SignIn = () => {
  const [step, setStep] = useState(1); // Étape actuelle (1 = email/mot de passe, 2 = adresse/ville)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [name, setName] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter()

  const handleFirstStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    setErrorMessage("");
    setStep(2); // Passe à l'étape 2
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de "salt rounds"

      const requestBody = {
        email,
        password: hashedPassword, // Utiliser le mot de passe haché
        name,
        adress,
        city,
        postal,
      };

      console.log("Request Body:", requestBody); // Affiche le corps de la requête pour déboguer

      const response = await fetch("/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        setErrorMessage(errorData.message || "Erreur lors de la création du compte.");
        return;
      }

      console.log("Compte créé avec succès !");
      router.push("/userpages/LogIn")
      
    } catch (error) {
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="w-full flex">
      <div className="hidden flex-1 h-screen bg-signin md:flex"></div>
      <div className="flex flex-1 items-center justify-center min-h-screen p-4">
        <div className="space-y-[50px] max-w-[600px]">
          <div className="space-y-[20px]">
            <Typographie font="cooper" variant="h2">
              Bienvenue sur Cheapstored, <br />
              {step === 1
                ? "Créez un compte pour continuer."
                : "Complétez vos informations."}
            </Typographie>
            {step === 1 && (
              <Typographie font="ambit" variant="tag-title">
                Vous avez déjà un compte?
                <Link href="/userpages/LogIn">
                  <span className="underline text-blue cursor-pointer">
                    {" "}
                    Connectez-vous
                  </span>
                </Link>
                <br /> Cela prendra moins d&apos;une minute
              </Typographie>
            )}
            {step === 2 && (
              <Typographie theme="modify" font="ambit" variant="tag-title">
                Remplissez Vos Informations personnelles avant de continuer
              </Typographie>
            )}
          </div>

          {step === 1 ? (
            <form
              onSubmit={handleFirstStepSubmit}
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
              <div className="space-y-[10px] w-full">
                <Typographie variant="h3" font="ambit">
                  Répétez le mot de passe
                </Typographie>
                <Input
                  variant="password"
                  placeholder="votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {errorMessage && (
                <div className="text-red-500">{errorMessage}</div>
              )}
              <Button
                type="submit"
                size="large"
                className="w-full"
                variant="filled"
              >
                Suivant
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleFinalSubmit}
              className="flex flex-col items-center gap-[20px] w-full"
            >
              <div className="space-y-[10px] w-full">
                <Typographie variant="h3" font="ambit">
                  Nom
                </Typographie>
                <Input
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-[10px] w-full">
                <Typographie variant="h3" font="ambit">
                  Adresse
                </Typographie>
                <Input
                  placeholder="Votre adresse"
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                />
              </div>
              <div className="space-y-[10px] w-full">
                <Typographie variant="h3" font="ambit">
                  Ville
                </Typographie>
                <Input
                  placeholder="Votre ville"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="space-y-[10px] w-full">
                <Typographie variant="h3" font="ambit">
                  Code Postal
                </Typographie>
                <Input
                  placeholder="Votre code postal"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                />
              </div>
              {errorMessage && (
                <div className="text-red-500">{errorMessage}</div>
              )}
              <Button
                type="submit"
                size="large"
                className="w-full"
                variant="filled"
              >
                S&apos;inscrire
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
