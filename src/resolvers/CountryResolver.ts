import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";
import { AppDataSource } from "../data-source";

@Resolver()
export class CountryResolver {
  private countryRepository = AppDataSource.getRepository(Country);

  // Requête pour récupérer tous les pays
  @Query(() => [Country])
  async getCountries(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  // Mutation pour ajouter un pays
  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string
  ): Promise<Country> {
    const newCountry = this.countryRepository.create({ code, name, emoji });
    return await this.countryRepository.save(newCountry);
  }
}
