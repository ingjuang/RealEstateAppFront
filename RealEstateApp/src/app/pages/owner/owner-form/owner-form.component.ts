import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDateService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { OwnerService } from 'src/app/service/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.scss'],
})
export class OwnerFormComponent implements OnInit {
  ownerForm = new FormGroup({
    idOwner: new FormControl(0),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required),
    bithday: new FormControl('', Validators.required),
  });

  ImageBaseData: string | ArrayBuffer = '';
  routerSub: any;
  idOwner: any;
  edit: boolean = false;
  showUploadMessage: boolean = false;
  alertUploadImage: boolean = false;

  constructor(
    protected dateService: NbDateService<Date>,
    private ownerService: OwnerService,
    private router: Router,
    private acRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routerSub = this.acRouter.params.subscribe(params =>{
      this.idOwner = params['idOwner']
      if(this.idOwner){
        this.edit = true;
        this.ownerService.getById(this.idOwner).then((res:any)=>{
          this.ownerForm.patchValue(res.result);
        }).catch((error)=>{
          console.log(error);
        })
      }else{
        this.edit = false;
      }
    })    
  }

  async onRegister() {
    if(!this.edit){
      this.ownerService
        .post(this.ownerForm.value)
        .then((res: any) => {
          console.log(res);
          this.router.navigateByUrl('owner')
        })
        .catch((error) => {
          console.log(error);
          Swal.fire('Error', 'Error al crear propietario','error')
        });
    }else{
      this.ownerService
      .put(this.ownerForm.value)
      .then((res: any) => {
        console.log(res);
        this.router.navigateByUrl('owner')
      })
      .catch((error) => {
        console.log(error);
      });
    }
    console.log(this.ownerForm);
    
  }

  get f(){
    return this.ownerForm.controls;
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
    this.showUploadMessage = true
  }
  btnUpload() {
    if (this.ImageBaseData == '') {
      this.alertUploadImage = true
    } else {
      var fileUplodVM = {
        ImageBaseData: this.ImageBaseData.toString(),
      };
      this.PutImage(fileUplodVM);
      this.showUploadMessage = false;
    }
  }
  public PutImage(data: any) {
    this.ownerForm.controls.photo.setValue(data.ImageBaseData);
  }
}
