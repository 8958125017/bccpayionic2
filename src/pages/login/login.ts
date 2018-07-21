import { Component } from '@angular/core';
import {  NavController, NavParams,MenuController,ToastController,LoadingController,Events} from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgotPassword/forgotPassword';
import { SetupService } from '../../services/setup.service';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'  
})

export class LoginPage {
responseData:any;
 public user:any;
 logindetail={
           "email": "",
           "password": ""
  }
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public events: Events,public menuCtrl: MenuController, public navParams: NavParams,public _setupService: SetupService,public loadingCtrl: LoadingController) {

 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
   ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menuCtrl.enable(false);
  }
 ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }
  doLogin(){
     if(!this.logindetail.email||!this.logindetail.password){
       let toast = this.toastCtrl.create({
                     message: 'Email and password should be required',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present(); 
    }else{
  let loading = this.loadingCtrl.create({
       content: 'Logging please wait...'
      });
  loading.present();
   this._setupService.createLoginDetail(this.logindetail).subscribe((result) => {   
     if(result.statusCode== 200){
          this.responseData = result;       
          localStorage.setItem('logindetail',JSON.stringify(this.responseData));
          this.user=this.responseData.user.email; 
          this.events.publish("shareObject", this.user);
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
     }else{
                     this.responseData = result;
                     loading.dismiss();
                     let toast = this.toastCtrl.create({
                     message: this.responseData.message,
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present(); 
          }          
    });

    }
   
 }
forgotPassword(){
      this.navCtrl.setRoot(ForgotPasswordPage);
 }

 signup(){
      this.navCtrl.setRoot(SignupPage);
 }
    
}
