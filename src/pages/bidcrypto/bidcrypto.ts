import { Component } from '@angular/core';
import {  NavController, LoadingController,ToastController,AlertController } from 'ionic-angular';
import { SetupService } from '../../services/setup.service';
import { HomePage } from '../home/home';
/**
 * Generated class for the BidcryptoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-bidcrypto',
  templateUrl: 'bidcrypto.html',
})
export class BidcryptoPage {
public user:any;
public ask:any;
public bid:any;
public FreezedBTCbalance:any;
public FreezedBCHbalance:any;
public BTCbalance:any;
public BCHbalance:any;
public userId:any;
public bidRates:any;
email={
       "userMailId": ""
  }
  currentUserBalance={
    "ask":"",
    "bid":""
   }
  
  bidCryptoAmount={
    "bidAmountBTC": "",
    "bidAmountBCH": "",
    "bidRate": "",
    "bidownerId": "",
    "currentBidRateOfServer": "", 
    "spendingPassword": ""
  }
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public toastCtrl: ToastController,public _setupService: SetupService,public loadingCtrl: LoadingController) {
   this.currentPrice();   
   this.userdata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BidcryptoPage');
  }


  currentPrice(){
  	this._setupService.getBidCoin().subscribe((response)=>{
      console.log(JSON.stringify(response));
    if(response.statusCode==200){
           this.currentUserBalance.ask=(response.currentPrice.ask).toFixed(5);
           this.currentUserBalance.bid=(response.currentPrice.bid).toFixed(5);
            this.ask = this.currentUserBalance.ask;
                     
         }
         else{
         let toast = this.toastCtrl.create({
                     message: "data fetch error!!",
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
  toast.present();
         }
      });
  }

  userdata(){
   this.user=JSON.parse(localStorage.getItem('logindetail'));
   this.email.userMailId=this.user.user.email;
   this.BTCbalance=(this.user.user.BTCbalance).toFixed(5);
   this.BCHbalance=(this.user.user.BCHbalance).toFixed(5); 
   this.FreezedBCHbalance=(this.user.user.FreezedBCHbalance).toFixed(5);
   this.FreezedBTCbalance=(this.user.user.FreezedBTCbalance).toFixed(5);
   this.userId=this.user.user.id;  
}

 myFunc(a) {
   this.bidCryptoAmount.bidAmountBTC = a.toFixed(5);
      };


bidAmountAction(){
 
 
  this.bid=this.currentUserBalance.bid;
  this.bidRates=this.bidCryptoAmount.bidRate;
  this.bidCryptoAmount.bidownerId=this.userId;
  this.bidCryptoAmount.currentBidRateOfServer=this.currentUserBalance.bid;
   if(!this.bidCryptoAmount.bidAmountBCH||!this.bidCryptoAmount.bidRate||!this.bidCryptoAmount.bidAmountBTC){
        let toast = this.toastCtrl.create({
                     message: "field should be required!!",
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
        toast.present();    
      }
else if(this.bidCryptoAmount.bidAmountBTC>=this.BTCbalance){
  let toast = this.toastCtrl.create({
                     message: "Insufficient balance, Please Buy BCC!!",
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
  toast.present();
  this.navCtrl.setRoot(HomePage); 
}
else if( this.bid - this.bidRates >=0.01)
{
   let toast = this.toastCtrl.create({
                     message: "Invalid rate, try after some time!!",
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
  toast.present();
  this.navCtrl.setRoot(HomePage); 
}
else {

  let prompt = this.alertCtrl.create({
      title: 'Spending Password',       
      inputs: [
        {          
          name: 'spendingPassword',
          type: 'password',
          placeholder: 'spendingPassword',         
          
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {            
                this.navCtrl.setRoot(BidcryptoPage); 
          }
        },
        {
          text: 'submit',
          handler: data => {
            let loading = this.loadingCtrl.create({
           content: 'bidding please wait...'
        });
            loading.present();
            this.bidCryptoAmount.spendingPassword=data.spendingPassword;    
                   
            this._setupService.bidCryptoAmount(this.bidCryptoAmount).subscribe((response) => {
               if(response.statusCode== 200){
                  localStorage.setItem('logindetail',JSON.stringify(response));
                  this.userdata();
                     let toast = this.toastCtrl.create({
                     message: 'Bid Placed Successfully !!',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                loading.dismiss();
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

                   this.navCtrl.setRoot(BidcryptoPage);
                 }         
             } );        
          }
        }
      ],
      enableBackdropDismiss: false
    });
    prompt.present(); 

}
}
}


