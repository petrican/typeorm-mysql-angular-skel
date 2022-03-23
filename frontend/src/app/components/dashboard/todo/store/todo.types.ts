export interface TodoDataItem {
  id: number;
  action: string;
}

export interface DeletedResponse {
  raw: Array<TodoDataItem>;
  affected: number;
}

export interface TodoAddItem {
  action: string;
}
