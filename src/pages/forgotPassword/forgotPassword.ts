import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,MenuController,ToastController,LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage} from '../signup/signup';
import { SetupService } from '../../services/setup.service';
import { ChangepasswordPage } from '../changepassword/changepassword';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-forgotPassword',
  templateUrl: 'forgotPassword.html'  
})

export class ForgotPasswordPage {
responseData:any;
emailID:any
   user= {
          "userMailId": ""
   }
   otpvalue={
      "userMailId": "",
      "otp": ""
  }

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public menuCtrl: MenuController, public navParams: NavParams,public alertCtrl: AlertController,public _setupService: SetupService,public loadingCtrl: LoadingController) {

 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
   ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menuCtrl.enable(false);
  }
  
 forgotPassword(){
     let loading = this.loadingCtrl.create({
       content: 'sending otp in your mailId...'
      });
  loading.present();
   this._setupService.forgotPassword(this.user).subscribe((response) => { 
    if(response.statusCode== 200){
     this.responseData = response;  
    loading.dismiss();
     localStorage.setItem('ResponseData',JSON.stringify(response));    
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
              }
        },
        {
          text: 'submit',
          handler: data => {
            let loading = this.loadingCtrl.create({
       content: 'verifying otp...'
      });
            loading.present();
            this._setupService.forgotPasswordOTP({"userMailId": response.userMailId,"otp": data.otp
                  }).subscribe((response) => {   
               if(response.statusCode== 200){                                  
                  this.navCtrl.push(ChangepasswordPage);
                   loading.dismiss();
                 }       
                 else {
                     let toast = this.toastCtrl.create({
                     message: response.message,
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                  toast.present(); 
                  loading.dismiss();
                    }      
             } );        
          }
        }
      ],
      enableBackdropDismiss: false
    });
    prompt.present(); 
     }else{
          this.responseData = response;
                let toast = this.toastCtrl.create({
                     message: this.responseData.message,
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present();
                 loading.dismiss(); 
     }          
            
 });
 
}
 login(){
   this.navCtrl.setRoot(LoginPage);
 }
     signup(){ 
         this.navCtrl.push(SignupPage);
  }

}