import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatServiceService } from 'src/app/service/candidat-service.service';
import { BsModalService } from 'ngx-bootstrap';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Entreprise } from 'src/app/model/Entreprise';
import { Candidat } from 'src/app/model/Candidat';
import { PaysService } from 'src/app/service/pays.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
    cmptEntreprise = false;
    cmptCandidat = false;
    choose = false;
    tryToSubmit = false;
    candidat =new Candidat;
    passwordConfirmation = '';
    entrepriseInscrit: boolean;
    inscritError: boolean;
    passwordConfirm = false;
    usedMail = false;
    savedFile;
    fileToUpload: File = null;
    pathfile;
    data;
    paysList = [];
    fileToUploaddocuments: File = null;
    fileToUploadEmployeur: File = null;
  fileToUploadEntreprise: File;
  entrepriseService: any;
  userServiceService: any;
  fileToUploadCVCandidat: boolean;
  entreprise = new Entreprise();
  candidatInscrit: boolean;
    constructor(private router: Router, private toastr: ToastrService, private candidatServiceService: CandidatServiceService, private modalService: BsModalService ,
       private entrepriseServiceService: EntrepriseServiceService, private userService: UserServiceService, private paysService: PaysService) { }
  
    ngOnInit() {
      this.getPays() ;
      
    }
  
    chooseTypeCompte(entry) {
      if (entry === 'entreprise') {
        this.cmptEntreprise = true;
        this.cmptCandidat = false;
        this.choose = true;
      }
      if (entry === 'candidat') {
        this.cmptCandidat = true;
        this.cmptEntreprise = false;
        this.choose = true;
      }
    }
    inscription() {
      this.tryToSubmit = true;
      console.log('this.this.cmptCandidat',this.cmptCandidat);
      console.log('this.dsgsdfgdrs',this.cmptEntreprise);

      if (this.cmptCandidat) {
        console.log('this.this.verifInscriptionCandidat(this.candidat)',this.verifInscriptionCandidat(this.candidat));
        console.log('this.candidat',this.candidat);

       // if (this.verifInscriptionCandidat(this.candidat)) {
          console.log('this.gffgpppppppppppppppppppppppp');

          this.candidatServiceService.inscription(this.candidat).subscribe(result => {
            this.data = result;
            if (result != null) {
              this.saveImageCandidat(this.data.id);
              this.successInscritpion();
            } else {
              this.errorInscription();
            }
          }, error => {
            console.log('this.errorInscription');
  
            this.errorInscription();
          });
       // }
      } else if (this.cmptEntreprise) {
      //  if (this.verifInscriptionEmployeur(this.entreprise)) {
          this.entrepriseServiceService.inscription(this.entreprise).subscribe(result => {
            this.data = result;
            if (result != null) {
              this.saveImageEntreprise(this.data.id);
              this.successInscritpion();
            } else {
              this.errorInscription();
            }
          }, error => {
            this.errorInscription();
          });
       // }
      }
    }
 
    errorInscription() {
      this.entrepriseInscrit = false;
      this.inscritError = true;
      this.toastr.error('Oops il y a une problème');
    }
   
    successInscritpion() {
      this.toastr.success('votre inscription est effectué avec succés');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }
    checkUsedMail() {
      if(this.entreprise.email != null){
        console.log('yyyyyy')

        this.userService.getByLogin(this.entreprise.email).subscribe(result => {
          if (result == null) {
            this.usedMail = false;
          } else {
            this.usedMail = true;
          }
        }, error => {
          this.entrepriseInscrit = false;
          this.inscritError = true;
        });
      }else{
        this.userService.getByLogin(this.candidat.email).subscribe(result => {
          console.log('ggggg',result)
          if (result == null) {
            this.usedMail = false;
          } else {
            this.usedMail = true;
          }
        }, error => {
          this.candidatInscrit = false;
          this.inscritError = true;
        });
      }

    }
    checkPasswordConfirmation() {
      if (this.cmptCandidat) {
        if (this.passwordConfirmation === this.candidat.password) {
          this.passwordConfirm = true;
        } else {
          this.passwordConfirm = false;
        }
      } else if (this.cmptEntreprise) {
        if (this.passwordConfirmation === this.entreprise.password) {
          this.passwordConfirm = true;
        } else {
          this.passwordConfirm = false;
        }
    }
  }
    back() {
      this.tryToSubmit = false;
      this.passwordConfirmation = '';
      this.usedMail = false;
      if (!this.choose) {
        this.router.navigate(['/login']);
      } else {
        this.choose = false;
      }
    }
    handleImageCandidatInput(files: FileList) {
      this.fileToUpload = files.item(0);
    }
    handleImageEntrepriseInput(files: FileList) {
      this.fileToUploadEntreprise = files.item(0);
    }
  
   
    saveImageCandidat(id) {
      if (this.fileToUpload != null) {
        this.candidatServiceService.uploadFile(this.fileToUpload, this.candidat.email, id, this.fileToUpload.type).subscribe(result => {
          if (result != null) {
            this.pathfile = result;
            this.savedFile = true;
            this.successInscritpion();
          }
        }, error => {
          this.pathfile = null;
          this.savedFile = false;
          this.errorInscription();
        });
      } else {
        this.savedFile = true;
      }
      if (this.fileToUploadCVCandidat != null) {
        this.candidatServiceService.uploadFile(this.fileToUploadCVCandidat, this.candidat.email, id, this.fileToUploadEntreprise.type)
        .subscribe(result => {
          if (result != null) {
            this.pathfile = result;
            this.savedFile = true;
            this.successInscritpion();
          }
        }, error => {
          this.pathfile = null;
          this.savedFile = false;
          this.errorInscription();
        });
      } else {
        this.savedFile = true;
      }
    }
  
  
    saveImageEntreprise(id) {
      this.entrepriseServiceService.uploadFile(this.fileToUploadEntreprise, this.entreprise.email, id).subscribe(result => {
        if (result != null) {
          this.pathfile = result;
          this.savedFile = true;
          this.successInscritpion();
        }
      }, error => {
        this.pathfile = null;
        this.savedFile = false;
        this.errorInscription();
      });
    }
  
    verifRequired(field) {
      if (field) {
        return true;
      }
      return false;
    }
  
    verifUrlField(field) {
      const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      return pattern.test(field);
    }
  
    verifConfirmationPassword(password, confirmation) {
      return password === confirmation;
    }
  
    verifEmailField(field) {
      // tslint:disable-next-line:max-line-length
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(field).toLowerCase());
    }
  
    verifPassWordField(password) {
      const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
      return re.test(password);
    }
  
    verifTelField(telephone) {
      const phoneno = new RegExp(/^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/);
      return phoneno.test(String(telephone));
    }
  
    verifInscriptionCandidat(candidat) {
      return (this.verifRequired(candidat.nom) && this.verifRequired(candidat.prenom) && this.fileToUpload
      && this.verifRequired(candidat.dateNaiss) && this.verifRequired(candidat.Competance) && this.fileToUploadCVCandidat &&
      this.verifRequired(candidat.telephone) && this.verifRequired(candidat.adress) && this.verifRequired(candidat.PosteActuel) &&
      this.verifRequired(candidat.pays) && this.verifRequired(candidat.email) && this.verifRequired(candidat.password)  &&
      this.verifTelField(candidat.telephone) && this.verifEmailField(candidat.email) && this.verifPassWordField(candidat.password) &&
      this.verifConfirmationPassword(candidat.password, this.passwordConfirmation) && !this.usedMail);
    }
  
    verifInscriptionEmployeur(entreprise) {
      return (this.verifRequired(entreprise.nom) && this.verifRequired(entreprise.Secteur) && this.verifRequired(entreprise.photo)
      && this.verifRequired(entreprise.siteWeb) && this.verifRequired(entreprise.TailleEntreprise) && this.verifRequired(entreprise.telephone) &&
      this.verifRequired(entreprise.fondation) && this.verifRequired(entreprise.adress) && this.verifRequired(entreprise.pays) &&
      this.verifRequired(entreprise.email) && this.verifRequired(entreprise.password)  &&
      this.verifUrlField(entreprise.siteWeb) && this.verifEmailField(entreprise.email) && this.verifPassWordField(entreprise.password) &&
      this.verifConfirmationPassword(entreprise.password, this.passwordConfirmation) && !this.usedMail);
    }
    getPays() {
      this.paysList = this.paysService.getPaysList();
    }
  
  
    
  
  
  }
  