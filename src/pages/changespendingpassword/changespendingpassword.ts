import { Component } from '@angular/core';
import { NavController, AlertController,MenuController,ToastController,LoadingController } from 'ionic-angular';
//import { LoginPage } from '../login/login';
//import { SignupPage} from '../signup/signup';
import { HomePage} from  '../home/home';
import { SettingPage } from '../setting/setting';

import { SetupService } from '../../services/setup.service';
//import { ChangepasswordPage } from '../changepassword/changepassword';

/**
 * Generated class for the ChangespendingpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-changespendingpassword',
  templateUrl: 'changespendingpassword.html',
})
export class ChangespendingpasswordPage {
public user:any;
 constructor(public navCtrl: NavController,public toastCtrl: ToastController,public menuCtrl: MenuController,public alertCtrl: AlertController,public _setupService: SetupService,public loadingCtrl: LoadingController) {  
  this.userdata();   
  }
  newSpendingPasswordvalue = {
     "userMailId": "",
     "newSpendingPassword": "",
     "confirmSpendingPassword": ""
   }
userdata(){
     this.user=JSON.parse(localStorage.getItem('logindetail'));
     this.newSpendingPasswordvalue.userMailId=this.user.user.email;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangespendingpasswordPage');
  }
   ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menuCtrl.enable(false);
  }
 ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }

  newSpendingPassword(){ 
    let loading = this.loadingCtrl.create({
           content: 'updating spending password...'
     });   
  	this._setupService.setNewSpendingPassord(this.newSpendingPasswordvalue).subscribe((response)=>{
         if (response.statusCode == 200) {
            loading.dismiss();
         let toast = this.toastCtrl.create({
                     message: 'Spending Password update successfully',
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
                this.navCtrl.setRoot(SettingPage); 
         }
  	});
  }

}
