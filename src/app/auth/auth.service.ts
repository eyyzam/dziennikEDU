import { Injectable, NgZone } from "@angular/core";
import { User } from "./models/user.model";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { map, flatMap } from "rxjs/operators";
import { Roles } from "./models/roles.model";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class authService {
  userData: any;
  finished: boolean = false;

  constructor(
    public fireStore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private _snackBar: MatSnackBar
  ) {
    // When user is logged in setting up localstorage otherwise null
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        console.log(this.userData);
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
        this.finished = true;
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  get getAuthState() {
    return this.fireAuth.authState;
  }

  get aa() {
    if (this.finished) {
      return this.fireAuth.authState.pipe(
        map(u => {
          return this.fireStore
            .collection<User>("users", ref =>
              ref.where("uid", "==", u.uid).limit(1)
            )
            .valueChanges()
            .pipe(flatMap(users => users));
        })
      );
    }
  }

  get userRole() {
    if (this.finished) {
      return this.fireAuth.authState.pipe(
        map(u => {
          return this.fireStore
            .collection<Roles>("roles", ref =>
              ref.where("uid", "==", `${u.uid}`).limit(1)
            )
            .valueChanges()
            .pipe(flatMap(users => users));
        })
      );
    }

    // return this.fireStore
    //   .collection<Roles>("roles", ref =>
    //     ref.where("uid", "==", `${this.userData.uid}`).limit(1)
    //   )
    //   .valueChanges();
  }

  // get userDBRecord() {
  //   // let x;
  //   // this.fireAuth.authState.subscribe(u => {
  //   //   x = this.fireStore
  //   //     .collection<User>("users", ref =>
  //   //       ref.where("uid", "==", u.uid).limit(1)
  //   //     )
  //   //     .valueChanges()
  //   //     .pipe(flatMap(users => users));
  //   //   // return this.fireStore.collection<User>("users", ref => {
  //   //   //   ref.where("uid", "==", u.uid).limit(1)).valueChanges().pipe(flatMap(users => users))
  //   //   // })
  //   // });
  //   // return x.roles;
  //   return this.fireStore
  //     .collection<User>("users", ref =>
  //       ref.where("uid", "==", `${this.userData.uid}`).limit(1)
  //     )
  //     .valueChanges()
  //     .pipe(flatMap(users => users));
  // }

  // E-Mail and Password Sign In Method
  SignIn(email, password) {
    return this.fireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate([""]);
        });
        this.SetUserData(result.user);
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  // E-Mail and Password Sign Up Method
  SignUp(email, password) {
    return this.fireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.SendVerificationEmail();
        this.SetUserData(result.user);
        this._snackBar.open(`${email} zarejestrowany pomyślnie`, null, {
          duration: 3000
        });
      })
      .catch(error => {
        window.alert(error);
      });
  }

  // Send E-Mail Verification when new user signs up
  SendVerificationEmail() {
    return this.fireAuth.auth.currentUser.sendEmailVerification().then(() => {
      this._snackBar.open(
        "Zarejestrowany uczeń otrzymał weryfikacyjny adres E-Mail",
        null,
        {
          duration: 3000
        }
      );
    });
  }

  // Send and E-Mail to recover password
  ForgotPassword(passwordResetEmail) {
    return this.fireAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, please check your inbox");
      })
      .catch(error => {
        window.alert(error);
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Google Sign In Method
  GoogleAuth() {
    return this.AutoLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run Auth providers
  AutoLogin(provider) {
    return this.fireAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate([""]);
        });
        this.SetUserData(result.user);
      })
      .catch(error => {
        window.alert(error);
      });
  }

  // Setting up userData both when loggin by Email/Password ang Google
  SetUserData(user) {
    this.userRole.subscribe(x => {
      const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(
        `users/${user.uid}`
      );
      x.subscribe(a => {
        if (a) {
          const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            roles: {
              student: a.student,
              nauczyciel: a.nauczyciel,
              admin: a.admin
            }
          };
          return userRef.set(userData, {
            merge: true
          });
        } else {
          const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            roles: {
              student: true,
              nauczyciel: false,
              admin: false
            }
          };
          return userRef.set(userData, {
            merge: true
          });
        }
      });
    });
  }

  // Sign Out
  SignOut() {
    return this.fireAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.userData = undefined;
      this.router.navigate(["user/login"]);
    });
  }
}
