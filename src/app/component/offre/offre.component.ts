import { Component, OnInit, TemplateRef } from '@angular/core';
import { Offre } from 'src/app/model/Offre';
import { OffreServiceService } from 'src/app/service/offre-service.service';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {

  offres;
  selectedOffre: any;
  offreToUpdate: any;
  offreToDelete;
  indexTodelete;
  filter;
  offre: any;
  deleted = false;
  deleteError = false;
  newActualite = new Offre();
  addingError=false;
  offreAdded=false;
  offreUpdated: any;
  updatingError;
  modalRef;
  constructor( private offreServiceService: OffreServiceService, private cookies: CookieService
    ,private modalService: BsModalService ) { }

  ngOnInit() {
    this.getAll();
    this.cookies.set('acessToken','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaXNzIjoiaHR0cDovL2RldmdsYW4uY29tIiwiaWF0IjoxNTg5MTIwMjI4LCJleHAiOjE2MjE1MjAyMjh9.Zr-_XhgsQ-9_Vn_UgpaXpbcfg89Wog2lI1nO8zGX8Bw')
  }

  getAll() {
    this.offreServiceService.getAllOffre().subscribe(result => {
      this.offres = result;

    });
  }

  openModal(template: TemplateRef<any>) {
    console.log('fff',template)
    this.modalRef = this.modalService.show(template);

  }
  openDetailsModal(template: TemplateRef<any>, offre) {
    this.openModal(template);

    this.selectedOffre = offre;

  }
  openUpdateModal(template: TemplateRef<any>, offre) {
    this.openModal(template);
    this.offreToUpdate = offre;
  }
  openDeleteModal(confirmDelete:  TemplateRef<any>, offre, index) {
    this.offreToDelete = offre;
    this.openModal(confirmDelete);
    this.indexTodelete = index;
  }

  showFilter() {
    this.filter = !this.filter;
  }
  confirm(){
    console.log('+++++',this.offreToDelete);
    this.offreServiceService.deleteOffre(this.offreToDelete.id).subscribe(result => {
      this.deleted = true;

    });
  }
  addOffre(){
    this.offreServiceService.createOffre(this.newOffre).subscribe(result => {
      this.offreAdded = true;
      this.offres.push(this.newOffre);
      this.getAll();
    }, error => {
      this.offreAdded = false;
      this.addingError = true;
    });
    this.modalRef.hide();

  }
  newOffre(newOffre: any) {
    throw new Error("Method not implemented.");
  }
  updateOffre(){
    this.offreServiceService.createOffre(this.offreToUpdate).subscribe(result => {
      this.offreUpdated = true;
    }, error => {
      this.offreUpdated = false;
      this.updatingError = true;
    });
    this.modalRef.hide();
    location.reload();
  }}