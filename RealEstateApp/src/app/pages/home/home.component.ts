import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OwnerService } from 'src/app/service/owner.service';
import { PropertyService } from 'src/app/service/property.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  property: any;
  properties: any;
  owners: any[] = [];

  constructor(private propertyService: PropertyService,
    private ownerService: OwnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProperties();
    this.getOwners();
  }

  getProperties(){
    this.propertyService.get().then((res: any)=>{
      this.properties = res.result;
    }).catch((error)=>{
      console.log(error);
      
    })
  }

  getOwners(){
    this.ownerService.get().then((res: any)=>{
      this.owners = res.result;
    }).catch((error)=>{
      console.log(error);
      
    })
  }


  getOwner(idOwner: number){
    let owner = this.owners.filter((x:any) => x.idOwner === idOwner);
    return owner[0].name;
  }


  editProperty(idProperty: number){
    console.log(idProperty);
    
    this.router.navigateByUrl(`home/property-form/${idProperty}`)
    
  }

  deleteProperty(idProperty: number){
    this.propertyService.delete(idProperty).then((res:any)=>{
      Swal.fire(
        'Eliminado',
        '',
        'success'
      );
      this.getProperties()
    }).catch((error)=>{
      console.log(error);
      
    })
  }



}
