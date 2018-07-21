import { Component } from '@angular/core';
import { NavController, LoadingController,ToastController,AlertController } from 'ionic-angular';
import { SetupService } from '../../services/setup.service';
import { HomePage } from '../home/home';

/**
 * Generated class for the AskcryptoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-askcrypto',
  templateUrl: 'askcrypto.html',
})
export class AskcryptoPage {

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
  
  askCryptoAmount={
    "askAmountBTC": "",
    "askAmountBCH": "",
    "askRate": "",
    "askownerId": "",
    "currentAskrateOfServer": "",
    "spendingPassword": ""
  }
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public toastCtrl: ToastController,public _setupService: SetupService,public loadingCtrl: LoadingController) {
   this.currentPrice();   
   this.userdata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskcryptoPage');
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
           console.log('no data found');
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
   this.askCryptoAmount.askAmountBTC = a.toFixed(5);
    console.log( this.askCryptoAmount.askAmountBTC );
  };


askAmountAction(){ 
  this.ask=this.currentUserBalance.ask;
  this.askRates=this.askCryptoAmount.askRate;
  this.askCryptoAmount.askownerId=this.userId;
  this.askCryptoAmount.currentAskrateOfServer=this.currentUserBalance.ask;
    if(!this.askCryptoAmount.askAmountBCH||!this.askCryptoAmount.askRate||!this.askCryptoAmount.askAmountBTC){
        let toast = this.toastCtrl.create({
                     message: "field should be required!!",
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
        toast.present();    
      }
        else if(this.askCryptoAmount.askAmountBCH>=this.BCHbalance){
        let toast = this.toastCtrl.create({
                           message: "Insufficient balance, Please Buy BCC!!",
                           showCloseButton: true,
                           closeButtonText: 'Ok',
                           duration: 5000
                      });
        toast.present();
        this.navCtrl.setRoot(HomePage); 
      }
        else if( this.askRates -this.ask >=0.01)
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
                this.navCtrl.setRoot(AskcryptoPage); 
          }
        },
        {
          text: 'submit',
          handler: data => {
            let loading = this.loadingCtrl.create({
           content: 'asking  please wait...'
        });
            loading.present();
            this.askCryptoAmount.spendingPassword=data.spendingPassword;                       
            this._setupService.askCryptoAmount(this.askCryptoAmount).subscribe((response) => {
               if(response.statusCode== 200){
                  localStorage.setItem('logindetail',JSON.stringify(response));
                  this.userdata();
                     let toast = this.toastCtrl.create({
                     message: 'Ask Placed Successfully !!',
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

                   this.navCtrl.setRoot(AskcryptoPage);
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


