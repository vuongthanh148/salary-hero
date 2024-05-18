import { InfinityPaginationResponseDTO } from './dto/infinity-pagination-response.dto';
import { IPaginationOptions } from './types/pagination-options';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
): InfinityPaginationResponseDTO<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};
