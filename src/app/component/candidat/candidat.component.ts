import { Component, OnInit, TemplateRef } from '@angular/core';
import { Candidat } from 'src/app/model/Candidat';
import { CandidatServiceService } from 'src/app/service/candidat-service.service';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {

  candidats;
  selectedCandidat;
  candidatToUpdate: any;
  candidatToDelete: any;
  indexTodelete;
  filter;
  candidat: any;
  deleted = false;
  deleteError = false;
  newCandidat = new Candidat();
  addingError=false;
  candidatAdded=false;
  updatingError;
  modalRef;
  CandidatServiceService: any;
  createCandidat: any;
  candidatUpdated: any;

  constructor( private candidatServiceService: CandidatServiceService, private cookies: CookieService
    ,private modalService: BsModalService ) { }

  ngOnInit() {
    this.getAll();
    this.cookies.set('acessToken','')
  }

  getAll() {
    this.candidatServiceService.getAllCandidat().subscribe(result => {
      this.candidats = result;

    });
  }

  openModal(template: TemplateRef<any>) {
    console.log('fff',template)
    this.modalRef = this.modalService.show(template);

  }
  openDetailsModal(template: TemplateRef<any>, candidat) {
    this.openModal(template);

    this.selectedCandidat = candidat;

  }
  openUpdateModal(template: TemplateRef<any>, candidat) {
    this.openModal(template);
    this.candidatToUpdate = candidat;
  }
  openDeleteModal(confirmDelete:  TemplateRef<any>, candidat, index) {
    this.candidatToDelete = candidat;
    this.openModal(confirmDelete);
    this.indexTodelete = index;
  }

  showFilter() {
    this.filter = !this.filter;
  }
  confirm(){
    console.log('+++++',this.candidatToDelete);
    this.candidatServiceService.deleteCandidat(this.candidatToDelete.id).subscribe(result => {
      this.deleted = true;

    });
  }
  addCandidat(){
    this.candidatServiceService.createCandidat(this.newCandidat).subscribe(result => {
      this.candidatAdded = true;
      this.candidats.push(this.newCandidat);
      this.getAll();
    }, error => {
      this.candidatAdded = false;
      this.addingError = true;
    });
    this.modalRef.hide();

  }
  updateCandidat(){
    this.candidatServiceService.createCandidat(this.candidatToUpdate).subscribe(result => {
      this.candidatUpdated = true;
    }, error => {
      this.candidatUpdated = false;
      this.updatingError = true;
    });
    this.modalRef.hide();
    location.reload();
  }}

  
