
export interface Imobiler {
  Id : number
  title:string,
  description : string,
  rooms:number,
  adresse:string,
  available:boolean,
  price:number,
  surface:number,
  currentPage: number;
  totalPages: number;
  pageSize:number;
  Type : Type

}
export enum Type {
  ACHAT,
  VENTE,
  LOCATION
}
