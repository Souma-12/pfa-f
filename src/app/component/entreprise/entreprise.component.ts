import { Component, OnInit, TemplateRef } from '@angular/core';
import { Entreprise } from 'src/app/model/Entreprise';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {

  entreprises: any;
  selectedEntreprise;
  entreprise: any;
  ToUpdate;
  entrepriseToUpdate;
  entrepriseToDelete;
  indexTodelete;
  filter;
  deleted = false;
  deleteError = false;
  newEntreprise = new Entreprise();
  addingError=false;
  entrepriseAdded=false;
  entrepriseUpdated;
  updatingError;
  modalRef;
  headers: any;
  http: any;
  constructor( private entrepriseServiceService: EntrepriseServiceService, private cookies: CookieService
    ,private modalService: BsModalService ) { }
   
  ngOnInit() {
    this.getAll();
    this.cookies.set('acessToken','')
  }
  

  getAll() {
    this.entrepriseServiceService.getAllEntreprise().subscribe(result => {
      this.entreprises = result;

    });
  }

  openModal(template: TemplateRef<any>) {
    console.log('fff',template)
    this.modalRef = this.modalService.show(template);

  }
  openDetailsModal(template: TemplateRef<any>, entreprise) {
    this.openModal(template);

    this.selectedEntreprise = entreprise;

  }
  openUpdateModal(template: TemplateRef<any>, entreprise) {
    this.openModal(template);
    this.entrepriseToUpdate = entreprise;
  }
  openDeleteModal(confirmDelete:  TemplateRef<any>, entreprise, index) {
    this.entrepriseToDelete = entreprise;
    this.openModal(confirmDelete);
    this.indexTodelete = index;
  }

  showFilter() {
    this.filter = !this.filter;
  }
  confirm(){
    console.log('+++++',this.entrepriseToDelete);
    this.entrepriseServiceService.deleteEntreprise(this.entrepriseToDelete.id).subscribe(result => {
      this.deleted = true;

    });
  }
  addEntreprise(){
    this.entrepriseServiceService.createEntreprise(this.newEntreprise).subscribe(result => {
      this.entrepriseAdded = true;
      this.entreprises.push(this.newEntreprise);
      this.getAll();
    }, error => {
      this.entrepriseAdded = false;
      this.addingError = true;
    });
    this.modalRef.hide();

  }
  updateEntreprise(){
    this.entrepriseServiceService.createEntreprise(this.entrepriseToUpdate).subscribe(result => {
      this.entrepriseUpdated = true;
    }, error => {
      this.entrepriseUpdated = false;
      this.updatingError = true;
    });
    this.modalRef.hide();
    location.reload();
  }}
