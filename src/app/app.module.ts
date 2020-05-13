import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BodyComponent } from './component/body/body.component';
import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { AsideComponent } from './component/aside/aside.component';
import { ActualiteComponent } from './component/actualite/actualite.component';
import { CandidatComponent } from './component/candidat/candidat.component';
import { DomaineComponent } from './component/domaine/domaine.component';
import { EducationComponent } from './component/education/education.component';
import { EntrepriseComponent } from './component/entreprise/entreprise.component';
import { ExperienceComponent } from './component/experience/experience.component';
import { LangueComponent } from './component/langue/langue.component';
import { MessageComponent } from './component/message/message.component';
import { OffreComponent } from './component/offre/offre.component';
import { UserComponent } from './component/user/user.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { PostulationComponent } from './component/postulation/postulation.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    AsideComponent,
    ActualiteComponent,
    CandidatComponent,
    DomaineComponent,
    EducationComponent,
    EntrepriseComponent,
    ExperienceComponent,
    LangueComponent,
    MessageComponent,
    OffreComponent,
    UserComponent,
    PrincipalComponent,
    WelcomeComponent,
    PostulationComponent,
    InscriptionComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      progressAnimation:'increasing',
      preventDuplicates: true
    })
       
   
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
