import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MojeOcenyComponent } from "./oceny/oceny.component";
import { UczniowieComponent } from "./uczniowie/uczniowie.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";

// Guards
import { StudentGuard } from "./auth/guards/student.guard";
import { NauczycielGuard } from "./auth/guards/nauczyciel.guard";
import { AdminGuard } from "./auth/guards/admin.guard";
import { LoggedInGuard } from "./auth/guards/logged.guard";

const routes: Routes = [
  { path: "", component: MojeOcenyComponent },
  {
    path: "uczniowie",
    component: UczniowieComponent,
    canActivate: [LoggedInGuard, StudentGuard]
  },
  {
    path: "user/register",
    component: RegisterComponent,
    canActivate: [LoggedInGuard, AdminGuard]
  },
  { path: "user/login", component: LoginComponent },
  { path: "user/email-verify", component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
