import { CountryDTO } from '../../dtos/country/country';
import { Country } from './model';

export class CountryMapper {
    static toDTO(country: Country): CountryDTO {
        return {
            id: country.id,
            name: country.name
        };
    }

    static toEntity(country: CountryDTO): Country {
        return {
            id: country.id,
            name: country.name as string
        };
    }
}