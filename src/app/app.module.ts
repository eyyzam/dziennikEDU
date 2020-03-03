// Modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

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
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDatepickerModule } from "@angular/material/datepicker";

// Components
import { AppComponent } from "./app.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { UczenFormComponent } from "./uczniowie/form/uczen-form.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";
import { KadraComponent } from "./kadra/kadra.component";
import { KadraFormComponent } from "./kadra/form/kadra-form.component";
import { KlasaComponent } from "./klasa/klasa.component";
import { PlanyComponent } from "./plany/plany.component";
import { MojeOcenyComponent } from "./oceny/oceny.component";
import { UczniowieComponent } from "./uczniowie/uczniowie.component";
import { AdminOgloszeniaComponent } from "./admin-ogloszenia/admin-ogloszenia.component";
import { AdminOgloszeniaFormComponent } from "./admin-ogloszenia/form/admin-ogloszenia-form.component";
import { ProfileComponent } from "./profile/profile.component";

// Environment variables
import { environment } from "../environments/environment";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

// Services
import { uczenService } from "./uczniowie/uczniowie.service";
import { AuthService } from "./auth/auth.service";
import { KadraService } from "./kadra/kadra.service";
import { KlasaService } from "./klasa/klasa.service";
import { OgloszenieService } from "./admin-ogloszenia/ogloszenia.service";

// Guards
import { SecureInnerPagesGuard } from "./auth/guards/notLoggedDisable.guard";
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
    VerifyEmailComponent,
    KadraComponent,
    KadraFormComponent,
    KlasaComponent,
    PlanyComponent,
    AdminOgloszeniaComponent,
    AdminOgloszeniaFormComponent,
    ProfileComponent
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
    MatExpansionModule,
    MatDatepickerModule,

    CKEditorModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    uczenService,
    AuthService,
    SecureInnerPagesGuard,
    StudentGuard,
    NauczycielGuard,
    AdminGuard,
    KadraService,
    KlasaService,
    OgloszenieService
  ],
  entryComponents: [
    UczenFormComponent,
    KadraFormComponent,
    AdminOgloszeniaFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
