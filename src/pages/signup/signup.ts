import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,Platform,LoadingController,MenuController,ToastController} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SetupService } from '../../services/setup.service';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
responseData:any;
public userDetail:any;
signUpDetail={
	    "email": "",
	    "password": "",
	    "confirmPassword": "",
	    "spendingpassword": "",
	    "confirmspendingpassword": ""
  }
  otpvalue={
      "userMailId": "",
      "otp": ""
  }
  constructor(public navCtrl: NavController,public platform:Platform,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public menuCtrl: MenuController, public navParams: NavParams,public _setupService: SetupService,public toastCtrl: ToastController) {
  let backAction =  platform.registerBackButtonAction(() => {        
          this.navCtrl.pop();
          backAction();
        },2)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menuCtrl.enable(false);
  }
 ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }
  createNewUser(){
    let loading = this.loadingCtrl.create({
       content: 'account creating...'
      });
  loading.present();
     if(!this.signUpDetail.email||!this.signUpDetail.password||!this.signUpDetail.confirmPassword||!this.signUpDetail.spendingpassword||!this.signUpDetail.confirmspendingpassword){
       let toast = this.toastCtrl.create({
                     message: 'All fields should be required',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present(); 
    }else{
  	this._setupService.createUserAccount(this.signUpDetail).subscribe((result) => {   
     if(result.statusCode== 200){
          this.responseData = result; 
          loading.dismiss();            
          localStorage.setItem('signUp',JSON.stringify(this.responseData));
          const response=JSON.parse(localStorage.getItem('signUp'));         
           let toast = this.toastCtrl.create({
                     message: 'OTP sent to your email id',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present(); 
      let prompt = this.alertCtrl.create({
      title: 'One Time Password',      
      inputs: [
        {          
          name: 'otp',
          type: 'password',
          placeholder: 'One Time Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            let toast = this.toastCtrl.create({
                     message: 'account created please login and verify !!',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present();
                this.navCtrl.setRoot(LoginPage); 
          }
        },
        {
          text: 'submit',
          handler: data => {
            if(!data.otp){
              let toast = this.toastCtrl.create({
                     message: 'Otp should be required please signUp retry',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
               
                toast.present();
            }
            else{
               let loading = this.loadingCtrl.create({
               content: 'verifying otp...'
             });
               loading.present();
                 this._setupService.VerificationEmail({"userMailId": response.userMailId,"otp": data.otp
                  }).subscribe((result) => {  
                loading.dismiss(); 
               if(result.statusCode== 200){
                     let toast = this.toastCtrl.create({
                     message: 'SignUp successfully',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
               
                toast.present();
                this.navCtrl.setRoot(LoginPage);
                 }             
             });
            }      
          }
        }
      ],
      enableBackdropDismiss: false
    });
    prompt.present();      
         
     }else{
       loading.dismiss();
          this.responseData = result;
           
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

 login(){ 
  
    this.navCtrl.push(LoginPage);
  }
}


