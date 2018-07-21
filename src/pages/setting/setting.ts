import { Component } from '@angular/core';
import { NavController, LoadingController,ToastController,AlertController } from 'ionic-angular';
import { ChangespendingpasswordPage } from '../changespendingpassword/changespendingpassword';
import { HomePage } from '../home/home';
import { SetupService } from '../../services/setup.service';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
public user:any;
public togglePin:boolean;
public vaulePin:boolean;

public verifyEmail:boolean;
public pin:any;
public pinValueForApp:any;
public toggleFingerPrint:boolean;
public vaulefinger:boolean;
email={
       "userMailId": ""
  }
 passwordValue = {
    "userMailId": "",
    "currentPassword": "",
    "newPassword": "",
    "confirmNewPassword": ""
  };

  otpvalues = {
    "userMailId": "",
    "otp": ""
  };
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public toastCtrl: ToastController,public _setupService: SetupService,public loadingCtrl: LoadingController) {
     this.user=JSON.parse(localStorage.getItem('logindetail'));
     this.email.userMailId=this.user.user.email;
     this.verifyEmail=this.user.user.verifyEmail;
     this.togglePin=JSON.parse(localStorage.getItem('pinLockEnabel')); 
     this.toggleFingerPrint=JSON.parse(localStorage.getItem('fingerPrintEnabel'));    
     if(this.togglePin==null||this.togglePin==undefined){
      this.vaulePin=false;
     }
     else{
      this.vaulePin=this.togglePin;
     }
     if(this.toggleFingerPrint==null||this.toggleFingerPrint==undefined){
      this.vaulefinger=false;
     }
     else{
      this.vaulefinger=this.toggleFingerPrint;
     }
     
   
  }


veryfyEmail(){
    let loading = this.loadingCtrl.create({
           content: 'sending otp in your emailId..'
        });
    loading.present();
    this._setupService.EmailVerifyforAccount(this.email).subscribe((response)=>{
      loading.dismiss();
      let prompt = this.alertCtrl.create({
      title: 'Enter One Time Password',       
      inputs: [
        {          
          name: 'otp',
          type: 'password',
          placeholder: 'One Time Password',  
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
           content: 'verifying OtP...'
        });
            loading.present();
            this.otpvalues.userMailId=this.email.userMailId; 
            this.otpvalues.otp=data.otp;                                
            this._setupService.VerificationEmail(this.otpvalues).subscribe((response) => {
               if(response.statusCode== 200){
                 this.navCtrl.setRoot(HomePage);
                 loading.dismiss();
                 localStorage.setItem('logindetail',JSON.stringify(response));
                this.user=JSON.parse(localStorage.getItem('logindetail'));
                this.email.userMailId=this.user.user.email;
                this.verifyEmail=this.user.user.verifyEmail;
                this.verifyEmail=true;
                 let toast = this.toastCtrl.create({
                     message: 'verify email successfully !!',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present();
                }    
                 else{
                   loading.dismiss();
                     let toast = this.toastCtrl.create({
                     message: response.message,
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present();                  
                 }         
             } );        
          }
        }
      ],
      enableBackdropDismiss: false
    });
    prompt.present(); 
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  changeCurrentPassword(){
       let prompt = this.alertCtrl.create({
      title: 'Change Password',       
      inputs: [
        {          
          name: 'currentPassword',
          type: 'password',
          placeholder: 'Current Password',         
          
        },
         {          
          name: 'newPassword',
          type: 'password',
          placeholder: 'New Password',         
          
        },
         {          
          name: 'confirmNewPassword',
          type: 'password',
          placeholder: 'Confirm New Password',         
          
        },

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
           content: 'updating current password...'
        });
            loading.present();
            this.passwordValue.userMailId=this.email.userMailId; 
            this.passwordValue.currentPassword=data.currentPassword;
            this.passwordValue.newPassword=data.newPassword;
            this.passwordValue.confirmNewPassword=data.confirmNewPassword;
                   
            this._setupService.changecurrentpasswords(this.passwordValue).subscribe((response) => {
              if(response.statusCode== 200){
                 loading.dismiss();
                  let toast = this.toastCtrl.create({
                     message: 'Password change successfully',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present();
                     this.navCtrl.setRoot(HomePage);
                 }    
                 else{
                     loading.dismiss();
                     let toast = this.toastCtrl.create({
                     message: response.message,
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present();
                 }         
             } );        
          }
        }
      ],
      enableBackdropDismiss: false
    });
    prompt.present(); 
  }
  currentpasswordValue = {
    "userMailId": "",
    "currentPassword": ""
  }
  


  changeSpendingtPassword(){
   let prompt = this.alertCtrl.create({
      title: 'Current Password',       
      inputs: [
        {          
          name: 'currentPassword',
          type: 'password',
          placeholder: 'current password',         
          
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
           content: 'sending otp in your EmailId...'
        });
            loading.present();
             this.currentpasswordValue.userMailId=this.email.userMailId;
            this.currentpasswordValue.currentPassword=data.currentPassword;                                          
            this._setupService.OtpToUpdateSpendingPassword(this.currentpasswordValue).subscribe((response) => {
               if(response.statusCode== 200){
                 loading.dismiss(); 
                   let prompt = this.alertCtrl.create({
                   title: 'Enter One Time Password',       
                   inputs: [
                   {          
                      name: 'otp',
                      type: 'password',
                      placeholder: 'One Time Password',         
          
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
            this.otpvalues.userMailId=this.email.userMailId;
            this.otpvalues.otp=data.otp;                                
            this._setupService.OtpToEmailForgotSpendingPassord(this.otpvalues).subscribe((response) => {
               if(response.statusCode== 200){                                 
                loading.dismiss();               
                this.navCtrl.setRoot(ChangespendingpasswordPage);
                 }    
                 else{                   
                   loading.dismiss();
                     let toast = this.toastCtrl.create({
                     message: response.message,
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present();                   
                 }         
             } );        
          }
        }
      ],
      enableBackdropDismiss: false
    });
    prompt.present();                  
                 }    
                 else{
                   loading.dismiss();
                     let toast = this.toastCtrl.create({
                     message: response.message,
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present();                   
                 }         
             } );        
          }
        }
      ],
      enableBackdropDismiss: false
    });
    prompt.present(); 
  }

  //Pin lock setting code


   setPinLock(value){   
    var newValue=value;  
   if(value==true){     
     // set pin       
      let prompt = this.alertCtrl.create({
      title: 'Set PIN',      
      inputs: [
        {          
          name: 'otp1',
          type: 'password', 
          placeholder: 'pin',        
        },
         {          
          name: 'otp2',
          type: 'password',
          placeholder: 'confirm pin',    
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.vaulePin=false;               
            }
        },
        {
          text: 'submit',
          handler: data => {
                if(data.otp1==""||data.otp2==""){
                 let toast = this.toastCtrl.create({
                     message: 'field should not be empty',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present();
                this.vaulePin=false;
            }
            else if(data.otp1==data.otp2){
              this.pin=data.otp2
              localStorage.setItem('pinforapp',this.pin);
              this.pinValueForApp=JSON.parse(localStorage.getItem('pinforapp'));  
              localStorage.setItem('pinLockEnabel',newValue);
              this.togglePin=Boolean(localStorage.getItem('pinLockEnabel'));             
            }else{
                let toast = this.toastCtrl.create({
                     message: 'Pin not matched !!',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present();
               this.vaulePin=false;
            }       
        }}
      ],
      enableBackdropDismiss: false
    });
    prompt.present();
   }   
   else{         
     localStorage.setItem('pinLockEnabel',newValue);
     this.togglePin=JSON.parse(localStorage.getItem('pinLockEnabel'));
     localStorage.removeItem('pinforapp');     
   }
}

//set finger print for app

setFingerPrint(value){
   var vaulefinger=value;
if(value==true){  
   localStorage.setItem('fingerPrintEnabel',vaulefinger);
   this.toggleFingerPrint=JSON.parse(localStorage.getItem('fingerPrintEnabel')); 
}else{  
   localStorage.setItem('fingerPrintEnabel',vaulefinger);
   this.toggleFingerPrint=JSON.parse(localStorage.getItem('fingerPrintEnabel'));
}
}
}
