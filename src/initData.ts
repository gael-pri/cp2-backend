import { AppDataSource } from "./data-source";
import { Country } from "./entities/Country";

export async function initializeCountries() {
  const countryRepository = AppDataSource.getRepository(Country);

  const countries = [
    { code: "FR", name: "France", emoji: "🇫🇷", continentCode: "EU" },
    { code: "BE", name: "Belgique", emoji: "🇧🇪", continentCode: "EU" },
    { code: "AN", name: "Andorre", emoji: "🇦🇩", continentCode: "EU" },
  ];

  for (const country of countries) {
    const exists = await countryRepository.findOne({ where: { code: country.code } });
    if (!exists) {
      const newCountry = countryRepository.create(country);
      await countryRepository.save(newCountry);
      console.log(`Pays ajouté: ${country.name} (${country.code})`);
    } else {
      console.log(`Pays déjà existant: ${country.name} (${country.code})`);
    }
  }
}
