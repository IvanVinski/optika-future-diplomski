export default (code: string): string => {
  if (code === "auth/email-already-in-use")
    return "Korisnički račun s ovom email adresom već postoji!";
  if (code === "auth/invalid-credentials")
    return "Pogrešna email adresa ili lozinka. Molimo Vas pokušajte ponovo!";
  if (code === "auth/too-many-requests")
    return "Unijeli ste neispravne podatke previše puta. Pokušajte ponovo kasnije ili ponovo postavite svoju lozinku klikom na opciju 'Zaboravili ste lozinku?'";
  return "Došlo je do greške prilikom prijave. Molimo Vas pokušajte ponovo!";
};
