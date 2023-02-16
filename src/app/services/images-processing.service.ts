import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './../Model/file-handle.model';
import { Imobiler, Type } from './../Model/Imobiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagesProcessingService {
  constructor(private sanitizer:DomSanitizer) {}

  public createImages(imobilier: Imobiler) {
    const imoImages: any[] = imobilier.imoAchatImages;

    const imoImagesToFile: FileHandle[] = [];

    for (let index = 0; index < imoImages.length; index++) {
      const imagesFileData = imoImages[index];

    const imageBlob = this.dataUriToBlob(imagesFileData.image, imagesFileData.type);

    const imageFile = new File([imageBlob], imagesFileData.name, {type: imagesFileData.type})

    const finalFile: FileHandle = {
      file:imageFile,
      url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    }

    imoImagesToFile.push(finalFile);


    }
    imobilier.imoAchatImages = imoImagesToFile;
    return imobilier;
  }

  public dataUriToBlob(bytes: any, Imagetype: any) {
    const byteString = window.atob(bytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let index = 0; index < byteString.length; index++) {
      int8Array[index] = byteString.charCodeAt(index);
    }

    const blob = new Blob([int8Array], { type: Imagetype });
    return blob;
  }
}
