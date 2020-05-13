import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserServiceService } from 'src/app/service/user-service.service';
import { BsModalService } from 'ngx-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    
    users: any;
    selectedUser;
    userToUpdate;
    userToDelete;
    indexTodelete;
    filter;
    user;
    deleted = false;
    deleteError = false;
    newUser = new User();
    addingError=false;
    userAdded=false;
    userUpdated;
    updatingError;
    modalRef;
    constructor( private userServiceService: UserServiceService, private cookies: CookieService
      ,private modalService: BsModalService ) { }
  
    ngOnInit() {
      this.getAll();
      this.cookies.set('acessToken','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaXNzIjoiaHR0cDovL2RldmdsYW4uY29tIiwiaWF0IjoxNTg4NjkwNjQ4LCJleHAiOjE2MjEwOTA2NDh9.UOxGeyXWuOzJW0T-6dCPTujA_JF8tVpuIVWYx-d9QeQ')
    }
  
    getAll() {
      this.userServiceService.getAllUser().subscribe(result => {
        this.users = result;
  
      });
    }
  
    openModal(template: TemplateRef<any>) {
      console.log('fff',template)
      this.modalRef = this.modalService.show(template);
  
    }
    openDetailsModal(template: TemplateRef<any>, user) {
      this.openModal(template);
  
      this.selectedUser = user;
  
    }
    openUpdateModal(template: TemplateRef<any>, user) {
      this.openModal(template);
      this.userToUpdate = user;
    }
    openDeleteModal(confirmDelete:  TemplateRef<any>, user, index) {
      this.userToDelete = user;
      this.openModal(confirmDelete);
      this.indexTodelete = index;
    }
  
    showFilter() {
      this.filter = !this.filter;
    }
    confirm(){
      console.log('+++++',this.userToDelete);
      this.userServiceService.deleteUser(this.userToDelete.id).subscribe(result => {
        this.deleted = true;
  
      });
    }
    addUser(){
      this.userServiceService.createUser(this.newUser).subscribe(result => {
        this.userAdded = true;
        this.users.push(this.newUser);
        this.getAll();
      }, error => {
        this.userAdded = false;
        this.addingError = true;
      });
      this.modalRef.hide();
  
    }
    updateUser(){
      this.userServiceService.createUser(this.userToUpdate).subscribe(result => {
        this.userUpdated = true;
      }, error => {
        this.userUpdated = false;
        this.updatingError = true;
      });
      this.modalRef.hide();
      location.reload();
    }}
