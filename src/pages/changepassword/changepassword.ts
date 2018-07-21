import { Component } from '@angular/core';
import { NavController, LoadingController,MenuController,ToastController,AlertController } from 'ionic-angular';
import { SetupService } from '../../services/setup.service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
public user:any;

 newPasswordvalue = {
    "userMailId": "",
    "newPassword": "",
    "confirmNewPassword": ""
  }
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public menuCtrl: MenuController,public alertCtrl: AlertController,public _setupService: SetupService,public loadingCtrl: LoadingController) {  
  this.userdata();   
  }
userdata(){
       this.user=JSON.parse(localStorage.getItem('ResponseData')); 
       this.newPasswordvalue.userMailId=this.user.userMailId;
      
  }

  changecurrentPassword(){   
   let loading = this.loadingCtrl.create({
           content: 'updating current password...'
     }); 	
    loading.present();
   this._setupService.updateForgotPassord(this.newPasswordvalue).subscribe((response) => { 
      if(response.statusCode==200){
         loading.dismiss();
        let toast = this.toastCtrl.create({
                     message: 'Password update successfully',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present();
                this.navCtrl.setRoot(LoginPage); 
              }else{
                 loading.dismiss();
                let toast = this.toastCtrl.create({
                     message: response.message,
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present(); 
              }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

}
