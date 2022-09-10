import { PageableDTO } from '../pageable';

export type MovieListDTO = PageableDTO<MovieListItemDTO>;

export interface MovieListItemDTO {
    id: number;
    published: number;
    original_title: string;
    created_at: string;
    updated_at: string;
    poster: string;
}