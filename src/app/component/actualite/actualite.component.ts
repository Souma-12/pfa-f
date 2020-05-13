import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActualiteServiceService } from 'src/app/service/actualite-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Actualite } from 'src/app/model/Actualite';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {

  
  actualites;
  selectedActualite;
  actualiteToUpdate;
  actualiteToDelete;
  indexTodelete;
  filter;
  actualite;
  deleted = false;
  deleteError = false;
  newActualite = new Actualite();
  addingError=false;
  actualiteAdded=false;
  actualiteUpdated;
  updatingError;
  modalRef;
  constructor( private actualiteServiceService: ActualiteServiceService, private cookies: CookieService
    ,private modalService: BsModalService ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.actualiteServiceService.getAllActualite().subscribe(result => {
      this.actualites = result;
      console.log(' this.actualites', this.actualites)

    });
  }

  openModal(template: TemplateRef<any>) {
    console.log('fff',template)
    this.modalRef = this.modalService.show(template);

  }
  openDetailsModal(template: TemplateRef<any>, actualite) {
    this.openModal(template);

    this.selectedActualite = actualite;

  }
  openUpdateModal(template: TemplateRef<any>, actualite) {
    this.openModal(template);
    this.actualiteToUpdate = actualite;
  }
  openDeleteModal(confirmDelete:  TemplateRef<any>, actualite, index) {
    this.actualiteToDelete = actualite;
    this.openModal(confirmDelete);
    this.indexTodelete = index;
  }

  showFilter() {
    this.filter = !this.filter;
  }
  confirm(){
    console.log('+++++',this.actualiteToDelete);
    this.actualiteServiceService.deleteActualite(this.actualiteToDelete.id).subscribe(result => {
      this.deleted = true;

    });
  }
  addActualite(){
    this.actualiteServiceService.createActualite(this.newActualite).subscribe(result => {
      this.actualiteAdded = true;
      this.actualites.push(this.newActualite);
      this.getAll();
    }, error => {
      this.actualiteAdded = false;
      this.addingError = true;
    });
    this.modalRef.hide();

  }
  updateActualite(){
    this.actualiteServiceService.createActualite(this.actualiteToUpdate).subscribe(result => {
      this.actualiteUpdated = true;
    }, error => {
      this.actualiteUpdated = false;
      this.updatingError = true;
    });
    this.modalRef.hide();
    location.reload();
  }}