export interface PageableDTO<T> {
    per_page: number;
    first_page: number;
    prev_page: number;
    current_page: number;
    next_page: number;
    last_page: number;
    total_items: number;
    items: T[]
}