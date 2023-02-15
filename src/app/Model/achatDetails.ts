export class AchatDetail {
  title: string;
  description: string;
  price: number;
  available: string;
  adresse: string;
  surface: number;
  rooms: number;
  image: Blob;
  dateAchat: Date;
  nameImage: string;


  constructor(data: any) {
    this.rooms = data[0][0];
    this.title = data[0][1];
    this.description = data[0][3];
    this.price = data[0][4];
    this.surface = data[0][5];
    this.adresse = data[0][6];
    this.image = new Blob(data[0][7]);
    this.nameImage = data[0][8];
    this.dateAchat = new Date(data[0][9]);
    this.available = data[0][2];

  }
}
