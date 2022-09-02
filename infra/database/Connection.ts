export interface Connection {
  setCollection(collection: string): void;
  get(query: any): Promise<any>;
  delete(query: any): Promise<void>;
  create(params: any): Promise<void>;
  update(query: any, params: any): Promise<void>;
}
