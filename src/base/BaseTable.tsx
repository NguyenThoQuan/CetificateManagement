export interface PaginationOptions {
  pageSizeOptions?: number[];
  initialPageIndex?: number;
  initialPageSize?: number;
  pageIndex: number;
  pageSize: number;
  totalItemCount?: number;
}

export const paginationBase: any = {
  pageIndex: 0,
  pageSize: 50,
};
