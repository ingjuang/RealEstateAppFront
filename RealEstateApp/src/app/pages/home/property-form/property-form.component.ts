import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { OwnerService } from 'src/app/service/owner.service';
import { PropertyService } from 'src/app/service/property.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss'],
})
export class PropertyFormComponent implements OnInit {
  propertyForm = new FormGroup({
    idProperty: new FormControl(0),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    codeInternal: new FormControl(0, Validators.required),
    year: new FormControl(0, Validators.required),
    idOwner: new FormControl(0, Validators.required),
  });

  imageForm = new FormGroup({
    idPropertyImage: new FormControl(0),
    idProperty: new FormControl(0),
    fileB64: new FormControl('', Validators.required),
    enabled: new FormControl(true),
  });
  owners: any;
  idProperty: number = 0;
  savedProperty: boolean = false;
  routerSub: any;
  edit: boolean = false;
  ImageBaseData: string | ArrayBuffer = '';
  showUploadMessage: boolean = false;
  alertUploadImage: boolean = false;
  ownerForm: any;
  images: any;

  constructor(
    private ownerService: OwnerService,
    private properyService: PropertyService,
    private acRouter: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.getOwners();

    this.routerSub = this.acRouter.params.subscribe((params) => {
      this.idProperty = params['idProperty'];
      if (this.idProperty) {
        this.edit = true;
        this.properyService
          .getById(this.idProperty)
          .then((res: any) => {
            console.log(res);
            this.propertyForm.patchValue(res.result);
            this.imageForm.controls.idProperty.setValue(Number(this.idProperty));
            this.getImages()
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.edit = false;
      }
    });
  }

  getOwners() {
    this.ownerService
      .get()
      .then((res: any) => {
        this.owners = res.result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getImages() {
    this.imageService
      .get(this.idProperty)
      .then((res: any) => {
        console.log(res);
        this.images = res.result.filter((x:any) => x.enabled === true)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  alertSavedProperty() {
    this.savedProperty = true;
    setTimeout(() => {
      this.savedProperty = false;
    }, 1000);
  }

  saveProperty() {
    if (this.edit) {
      this.properyService
        .put(this.propertyForm.value)
        .then((res: any) => {
          console.log(res);
          this.idProperty = res.result.idProperty;
          Swal.fire('Creado',
          'Propiedad creada con éxito',
          'success')
        })
        .catch((error) => {
          console.log(error);
          Swal.fire('Error',
          'Error al crear la propiedad',
          'error')
        });
    } else {
      this.properyService
        .post(this.propertyForm.value)
        .then((res: any) => {
          console.log(res);
          this.idProperty = res.result.idProperty;
          this.imageForm.controls.idProperty.setValue(this.idProperty);
          this.edit = true;
          Swal.fire('Actualizado','Propiedad actualizada con éxito', 'success')
        })
        .catch((error) => {
          console.log(error);
          Swal.fire('Error', 'Error al actualizar la propiedad', 'error')
        });
    }
  }

  handleFileInput(target: any) {
    let me = this;
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.ImageBaseData = reader.result ? reader.result : '';
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    this.showUploadMessage = true;
  }

  btnUpload() {
    if (this.ImageBaseData == '') {
      this.alertUploadImage = true;
    } else {
      var fileUplodVM = {
        ImageBaseData: this.ImageBaseData.toString(),
      };
      this.PutImage(fileUplodVM);
      this.showUploadMessage = false;
    }
  }
  
  public PutImage(data: any) {
    
    console.log(this.imageForm);
    this.imageForm.controls.fileB64.setValue(data.ImageBaseData);
    this.imageService.post(this.imageForm.value)
    .then((res: any)=>{
      console.log(res);
      this.getImages()
    }).catch((error)=>{
      console.log(error);
    })
  }

  deleteFileB64(image: any){
    image.enabled = false;
    console.log(image);
    this.imageService.put(image).then((res: any)=>{
      console.log(res);
      Swal.fire('Eliminada', 'Imágen eliminada', 'success')
    }).catch((err)=>{
      console.log(err);
      Swal.fire('Error', 'Error al eliminar la imágen', 'error')
    })
    
  }
}
