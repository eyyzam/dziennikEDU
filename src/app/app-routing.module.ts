import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MojeOcenyComponent } from "./oceny/oceny.component";
import { UczniowieComponent } from "./uczniowie/uczniowie.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";
import { KadraComponent } from "./kadra/kadra.component";
import { KlasaComponent } from "./klasa/klasa.component";
import { PlanyComponent } from "./plany/plany.component";
import { AdminOgloszeniaComponent } from "./admin-ogloszenia/admin-ogloszenia.component";
import { ProfileComponent } from "./profile/profile.component";

// Guards
import { StudentGuard } from "./auth/guards/student.guard";
import { NauczycielGuard } from "./auth/guards/nauczyciel.guard";
import { AdminGuard } from "./auth/guards/admin.guard";
import { LoggedInGuard } from "./auth/guards/logged.guard";
import { SecureInnerPagesGuard } from "./auth/guards/notLoggedDisable.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/user/login",
    pathMatch: "full"
  },
  {
    path: "oceny",
    component: MojeOcenyComponent,
    canActivate: [LoggedInGuard, StudentGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "uczniowie",
    component: UczniowieComponent,
    canActivate: [LoggedInGuard, AdminGuard]
  },
  {
    path: "admin/ogloszenia",
    component: AdminOgloszeniaComponent,
    canActivate: [LoggedInGuard, AdminGuard]
  },
  {
    path: "kadra",
    component: KadraComponent,
    canActivate: [LoggedInGuard, AdminGuard]
  },
  {
    path: "plany",
    component: PlanyComponent,
    canActivate: [LoggedInGuard, AdminGuard]
  },
  {
    path: "klasy",
    component: KlasaComponent,
    canActivate: [LoggedInGuard, AdminGuard]
  },
  {
    path: "user/register",
    component: RegisterComponent,
    canActivate: [LoggedInGuard, AdminGuard]
  },
  {
    path: "user/login",
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  { path: "user/email-verify", component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
