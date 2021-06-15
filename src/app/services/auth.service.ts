import { ToastrService } from 'ngx-toastr';
import { Injectable, OnInit } from '@angular/core';
import { User } from "../shared/services/user";
import firebase from 'firebase/app';
import "firebase/auth";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any;
  isLogged=false;
  constructor(
    private afs: AngularFirestore, 
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr : ToastrService
  ) {   

    this.isLogged= JSON.parse(localStorage.getItem('user'))? true:false
     this.afAuth.authState.subscribe(user => {
      //  console.log(user);
       
    if (user) {
        this.userData  = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }
      
      localStorage.setItem('user', JSON.stringify(this.userData.uid));
      JSON.parse(localStorage.getItem('user'));
    } else {
      localStorage.setItem('user', null);
      JSON.parse(localStorage.getItem('user'));
    }
    
  })
  this.userData = JSON.parse(localStorage.getItem('user'))
  
}


  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['user-blog']);
      // this.SetUserData(result.user);
        this.toastr.success("Login Successfully",'',{
          timeOut:5000,
        })
      }).catch((error) => {
        // window.alert(error.message)
        return error.message
      })
  }
  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        
        this.toastr.success("Register Successfully",'',{
          timeOut:5000,
        });
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        // window.alert(error.message)
        return error.message
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
     return this.afAuth.user.subscribe(x=>{
       x.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
        this.toastr.success("We have sent a confirmation email","Please check your email and click on the link to verify your email address.",{
          timeOut:5000,
        })
      }).catch(error=>{
        // return error.message
        
        this.toastr.error(error.message,'Try again later',{
          timeOut:5000,
        })
      })
    })
  }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail) {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(res => {
        // window.alert('Password reset email sent, check your inbox.');
        
        this.toastr.success('Password reset email sent, check your inbox.','',{
          timeOut:5000,
        });
      }).catch((error) => {
        // window.alert(error)
        
        this.toastr.error(error.message,'Try again later',{
          timeOut:5000,
        })
      })
    }
  
    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
      // const userId = ;
      // return (userId !== null && userId != '' && userId != undefined) ? true : false;
      this.isLogged = JSON.parse(localStorage.getItem('user'))?true:false;
      return this.isLogged
    }

    /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    // console.log(user);    
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      facebookURL: user.facebookURL,
      twitterURL: user.twitterURL,
      githubURL: user.githubURL,
      linkedinURL: user.linkedinURL,
      instagramURL: user.instagramURL,
      bio: user.bio
    }
    console.log(userData);
    
    this.afs.collection('users').add(userData);
    return userRef.set(userData, {
      merge: true
    })
  }

  updateUserData(userData){
    this.afs.collection('users').doc(`${userData.uid}`).update(userData);
    this.toastr.success(`Saved Successfully`, '',{
      timeOut: 5000
    })
  }

  userProfile() : Observable<any>{
    return this.afs.collection('users').snapshotChanges();
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      
      this.router.navigate(['login']);
    })
  }

  createBlog(article){
    let date = Date.now();
    const userBlogRef: AngularFirestoreDocument<any> = this.afs.doc(`blogs/${this.userData?.uid}/blog/${date}`);
    this.createAllBlog(article, date);
      userBlogRef.set(article,{
      merge: true
    })
  }

  createAllBlog(article, date){
    const AllBlogRef: AngularFirestoreDocument<any> = this.afs.doc(`all-blog/${date}`);
      AllBlogRef.set(article,{
      merge: true
    })
  }

  getUserBlog(){
    let uid = JSON.parse(localStorage.getItem('user'))
    return this.afs.collection(`blogs/${uid}/blog`).snapshotChanges();
  }
  getAllBlog(){
    return this.afs.collection('all-blog').snapshotChanges();
  }

  DeleteBlog(id, uid){
    this.afs.collection(`blogs`).doc(`${uid}`).collection("blog").doc(`${id}`).delete();;
  }
  DeleteFromAllBlog(id, uid){
   this.afs.collection(`all-blog`).doc(`${id}`).delete();;
  }

}
