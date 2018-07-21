import { Component } from '@angular/core';
import {  NavController, LoadingController,ToastController,AlertController } from 'ionic-angular';
import { SetupService } from '../../services/setup.service';
//import { HomePage } from '../home/home';


/**
 * Generated class for the BuysellcryptotransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-buysellcryptotransaction',
  templateUrl: 'buysellcryptotransaction.html',
})
export class BuysellcryptotransactionPage {
public user:any;
public userId:any;
public transactionData:any;
public category:any;
email={
       "userMailId": ""
  }
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public toastCtrl: ToastController,public _setupService: SetupService,public loadingCtrl: LoadingController) {
    this.userdata();
  }
  userdata(){
   this.user=JSON.parse(localStorage.getItem('logindetail'));
   this.email.userMailId=this.user.user.email;
   this._setupService.getBCHTransactions(this.email).subscribe((response) => {   
    if(response.statusCode==200){
    this.transactionData=response.tx
    this.category=response.tx.category;
    
    }
    else{
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
}
