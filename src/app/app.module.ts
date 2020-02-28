// Modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

// Angular Material Modules
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";

// Components
import { AppComponent } from "./app.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { UczenFormComponent } from "./uczniowie/form/uczen-form.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";

// Environment variables
import { environment } from "../environments/environment";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { MojeOcenyComponent } from "./oceny/oceny.component";
import { UczniowieComponent } from "./uczniowie/uczniowie.component";

// Services
import { uczenService } from "./uczniowie/uczniowie.service";
import { authService } from "./auth/auth.service";

// Guards
import { StudentGuard } from "./auth/guards/student.guard";
import { NauczycielGuard } from "./auth/guards/nauczyciel.guard";
import { AdminGuard } from "./auth/guards/admin.guard";

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    MojeOcenyComponent,
    UczniowieComponent,
    UczenFormComponent,
    RegisterComponent,
    LoginComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Angular Material imports
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSnackBarModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    uczenService,
    authService,
    StudentGuard,
    NauczycielGuard,
    AdminGuard
  ],
  entryComponents: [UczenFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
