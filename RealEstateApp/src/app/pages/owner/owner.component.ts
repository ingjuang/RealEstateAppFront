import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from 'src/app/service/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  owners: any;

  constructor(
    private ownerService: OwnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOwners();
  }

  getOwners(){
    this.ownerService.get().then((res: any)=>{
      this.owners = res.result;
    }).catch((error)=>{
      console.log(error);
      
    })
  }

  editOwner(idOwner: number){
    this.router.navigateByUrl(`owner/owner-form/${idOwner}`)
  }

  deleteOwner(idOwner: number){
    this.ownerService.delete(idOwner).then((res: any)=>{
      this.getOwners();
      Swal.fire('Eliminado','Propietario eliminado con éxito', 'success')
    }).catch((err)=>{
      console.log(err);
      Swal.fire('Error', 'Error al eliminar propietario', 'error')
    })    
  }

}
