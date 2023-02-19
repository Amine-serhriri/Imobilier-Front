import {FileHandle} from "./file-handle.model";

export interface Imobiler {
  id: number;
  title:string,
  description : string,
  rooms:number,
  adresse:string,
  available:boolean,
  price:number,
  surface:number,
  Type : Type
  imoAchatImages:FileHandle[]

}
export enum Type {
  ACHAT,
  VENTE,
  LOCATION
}
