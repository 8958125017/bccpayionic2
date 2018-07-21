import { Component } from '@angular/core';
import {  NavController, LoadingController,ToastController,AlertController,ActionSheetController  } from 'ionic-angular';

import { SetupService } from '../../services/setup.service';
import { SendbtcPage } from'../sendbtc/sendbtc';
import { RequestbtcPage} from '../requestbtc/requestbtc';
import { BtcsenttransactionPage } from '../btcsenttransaction/btcsenttransaction';
import { BtcreceivedtransactionPage } from '../btcreceivedtransaction/btcreceivedtransaction'
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
/**
 * Generated class for the BtcvaultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-btcvault',
  templateUrl: 'btcvault.html',
})
export class BtcvaultPage {
public user:any;
public ask:any;
public bid:any;
public FreezedBTCbalance:any;
public FreezedBCHbalance:any;
public BTCbalance:any;
public BCHbalance:any;
public userId:any;
public askRates:any;
public userBTCAddress:any;
public footer:boolean;
public fabButton:boolean;
email={
       "userMailId": ""
  }
  currentUserBalance={
    "ask":"",
    "bid":""
   }
 constructor(public navCtrl: NavController,public alertCtrl: AlertController,public toastCtrl: ToastController,public _setupService: SetupService,public loadingCtrl: LoadingController,public actionSheetCtrl: ActionSheetController,private sharingVar: SocialSharing,private clipboard: Clipboard) {
   this.currentPrice();   
   this.userdata();
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
   	this.footer=false;
   	this.fabButton=true;
  }


   userdata(){
   this.user=JSON.parse(localStorage.getItem('logindetail'));
   this.email.userMailId=this.user.user.email;
   this.BTCbalance=(this.user.user.BTCbalance).toFixed(5);
   this.BCHbalance=(this.user.user.BCHbalance).toFixed(5);
   this.FreezedBCHbalance=(this.user.user.FreezedBCHbalance).toFixed(5);
   this.FreezedBTCbalance=(this.user.user.FreezedBTCbalance).toFixed(5);
   this.userBTCAddress=this.user.user.userBTCAddress;
   this.userId=this.user.user.id;  

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad BtcvaultPage');
  }

  footerShow(){
  	this.footer=true;
  	this.fabButton=false;
  }
 

    showConfirm(){
    var btcAddress= this.userBTCAddress;
    console.log("btcaddress = ="+this.userBTCAddress);
   let alert = this.alertCtrl.create({
      title: '<div class="center" >My BTC Address</div>',
      subTitle: '<div class="center" (click)="copyAddress()"> <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl='+btcAddress+'"  alt="QR Code" style="width: 80%;" ></div><div class="center">'+btcAddress+'<div>',
      
      buttons: [
      {
          text: 'copy',
          handler: data => {   
               this.clipboard.copy(btcAddress);
               let toast = this.toastCtrl.create({
                     message: "Text Copied !!!!",
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
              toast.present();
          }
        },        
        {
          text: 'share',
          handler: data => {
             this.shareAddress(btcAddress);
          }
        },
        {
          text: 'Cancel',
          handler: data => {            
               console.log("hello");
          }
        },]
    });
    alert.present();
    }
shareAddress(a){
let actionSheet = this.actionSheetCtrl.create({
      title: 'Share address Via',
      buttons: [
        {
          text: 'whatsapp',
          role: 'destructive',
          handler: () => {
          this.whatsUpShare(a)   }
        },{
          text: 'facebook',
           role: 'destructive',
          handler: () => {
           this.facebookShare(a)
          }
        },{
          text: 'message',
          role: 'destructive',
          handler: () => {
           this.messageShare(a);
          }
        },
        {
          text: 'email',
          role: 'destructive',
          handler: () => {
            this.emailShare(a);
          }
        }
      ]
    });
    actionSheet.present();
  
}
whatsUpShare(address){
this.sharingVar.shareViaWhatsApp(address,null /* img */ , null /* url */ ).then((data) =>
         {
            console.log('Shared via whatsup');
         })
         .catch((err) =>
         {
            console.log('Was not shared via whatsup');
         });

}
facebookShare(address){
  this.sharingVar.shareViaFacebook(address,null /* img */ , null /* url */ ).then((data) =>
         {
            console.log('Shared via Facebook');
         })
         .catch((err) =>
         {
            console.log('Was not shared via Facebook');
         });
}
messageShare(address){
  this.sharingVar.shareViaSMS(address,null /* img */ ).then((data) =>
         {
            console.log('Shared via sms');
         })
         .catch((err) =>
         {
            console.log('Was not shared via sms');
         });
}
emailShare(address){
  this.sharingVar.shareViaEmail(address,null /* img */ , null /* url */ ).then((data) =>
         {
            console.log('Shared via email');
         })
         .catch((err) =>
         {
            console.log('Was not shared via email');
         });
}

 btcsent(){
    this.navCtrl.setRoot(BtcsenttransactionPage);
  }
    btcreceived(){
      this.navCtrl.setRoot(BtcreceivedtransactionPage);
    }
sendBTC(){
this.navCtrl.setRoot(SendbtcPage);
}

requestBTC(){
  this.navCtrl.setRoot(RequestbtcPage);
}


}
