import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BodyComponent } from './component/body/body.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { ActualiteComponent } from './component/actualite/actualite.component';
import { DomaineComponent } from './component/domaine/domaine.component';
import { EducationComponent } from './component/education/education.component';
import { EntrepriseComponent } from './component/entreprise/entreprise.component';
import { MessageComponent } from './component/message/message.component';
import { OffreComponent } from './component/offre/offre.component';
import { UserComponent } from './component/user/user.component';
import { CandidatComponent } from './component/candidat/candidat.component';
import { LangueComponent } from './component/langue/langue.component';
import { ExperienceComponent } from './component/experience/experience.component';
import { PostulationComponent } from './component/postulation/postulation.component';
import { InscriptionComponent } from './component/inscription/inscription.component';






const appRoutes: Routes = [
{ path: '', redirectTo: '/welcome', pathMatch: 'full'},
{ path: 'welcome', component:  WelcomeComponent},
{ path: 'inscription', component:  InscriptionComponent},

{path: 'principal', component: PrincipalComponent, children: [
    { path: 'actualite', component: ActualiteComponent, outlet: 'child1' },
    { path: 'postulation', component: PostulationComponent, outlet: 'child1' },
    { path: 'domaine', component: DomaineComponent, outlet: 'child1' },
    { path: 'education', component: EducationComponent, outlet: 'child1' },
    { path: 'entreprise', component: EntrepriseComponent, outlet: 'child1' },
    { path: 'message', component: MessageComponent, outlet: 'child1' },
    { path: 'offre', component: OffreComponent, outlet: 'child1' },
    { path: 'user', component: UserComponent, outlet: 'child1' },
    { path: 'candidat', component: CandidatComponent, outlet: 'child1'},
    { path: 'langue', component: LangueComponent, outlet: 'child1'},
    { path: 'experience', component: ExperienceComponent, outlet: 'child1'},]}

] ;

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
