import { Component } from '@angular/core';
import { NavController, LoadingController,ToastController,AlertController } from 'ionic-angular';
import { SetupService } from '../../services/setup.service';
import { HomePage } from '../home/home';

/**
 * Generated class for the BuycryptoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-buycrypto',
  templateUrl: 'buycrypto.html',
})
export class BuycryptoPage {
public user:any;
public ask:any;
public bid:any;
public FreezedBTCbalance:any;
public FreezedBCHbalance:any;
public BTCbalance:any;
public BCHbalance:any;
public userId:any;
public askRates:any;
email={
       "userMailId": ""
  }
  currentUserBalance={
    "ask":"",
    "bid":""
   }

   buyAmountSend = {
    "userMailId": "",
    "buyAmountBCH": "",
    "buyAmountBTC": "",
    "spendingPassword": "",
    "commentForReciever": "Comment for Reciever",
    "commentForSender": "Comment for sender"
  };

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public toastCtrl: ToastController,public _setupService: SetupService,public loadingCtrl: LoadingController) {
   this.currentPrice();   
   this.userdata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuycryptoPage');
  }

   currentPrice(){
   	this._setupService.getBidCoin().subscribe((response)=>{
      if(response.statusCode==200){
           this.currentUserBalance.ask=(response.currentPrice.ask).toFixed(5);
           this.currentUserBalance.bid=(response.currentPrice.bid).toFixed(5);
            this.ask = this.currentUserBalance.ask;                     
         }
         else{
           console.log("no data found ... ");
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

  myFunc = function(a) {
    var tempBuy:any
    tempBuy = a * (this.currentUserBalance.ask + .002);
    this.buyAmountSend.buyAmountBTC = tempBuy.toFixed(5);   
  }
  
  buyAmountAction(){
  	this.buyAmountSend.userMailId=this.email.userMailId;
     if(!this.buyAmountSend.buyAmountBCH||!this.buyAmountSend.buyAmountBTC){
        let toast = this.toastCtrl.create({
                     message: "field should be required!!",
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
        toast.present();    
      }
    else if(this.buyAmountSend.buyAmountBTC < this.BTCbalance){
  		  let prompt = this.alertCtrl.create({
      title: 'Enter Spending Password',       
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
             
          }
        },
        {
          text: 'submit',
          handler: data => {
            let loading = this.loadingCtrl.create({
           content: 'transaction is in progress...'
        });
            loading.present();
            this.buyAmountSend.spendingPassword=data.spendingPassword;    
             this._setupService.buyBCHCoinByUser(this.buyAmountSend).subscribe((response) => {
               if(response.statusCode== 200){
                  localStorage.setItem('logindetail',JSON.stringify(response));
                  this.userdata();
                     let toast = this.toastCtrl.create({
                     message: 'transaction successfully !!',
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

                   this.navCtrl.setRoot(HomePage);
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
