import { Component } from '@angular/core';
import {  NavController, LoadingController,ToastController,AlertController,ActionSheetController  } from 'ionic-angular';

import { SetupService } from '../../services/setup.service';
//import { SendbtcPage } from'../sendbtc/sendbtc';

//import { HomePage } from '../home/home';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the RequestcryptoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-requestcrypto',
  templateUrl: 'requestcrypto.html',
})
export class RequestcryptoPage {
public requestAmountBCH:any=0;
public user:any;
public ask:any;
public bid:any;
public FreezedBTCbalance:any;
public FreezedBCHbalance:any;
public BTCbalance:any;
public BCHbalance:any;
public userId:any;
public askRates:any;
public userBCHAddress:any;
public footer:boolean;
public fabButton:boolean;
email={
       "userMailId": ""
  }
  currentUserBalance={
    "ask":"",
    "bid":""
   }
   constructor(public navCtrl: NavController,public alertCtrl: AlertController,public toastCtrl: ToastController,public _setupService: SetupService,public loadingCtrl: LoadingController,public actionSheetCtrl: ActionSheetController,private sharingVar: SocialSharing) {
   this.currentPrice();   
   this.userdata();
   //this.requestAmountBTC=0;

  }
   currentPrice(){
   	this._setupService.getBidCoin().subscribe((response)=>{
      if(response.statusCode==200){
           this.currentUserBalance.ask=response.currentPrice.ask;
           this.currentUserBalance.bid=response.currentPrice.bid;
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
   this.BTCbalance=this.user.user.BTCbalance;
   this.BCHbalance=this.user.user.BCHbalance; 
   this.FreezedBCHbalance=this.user.user.FreezedBCHbalance;
   this.FreezedBTCbalance=this.user.user.FreezedBTCbalance;
   this.userBCHAddress=this.user.user.userBCHAddress;
   this.userId=this.user.user.id;  

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestbtcPage');
  }

shareBCHRequest(address){
	console.log("address = ="+address);
//alert("address = ="+address);
	let actionSheet = this.actionSheetCtrl.create({
      title: 'Share address Via',
      buttons: [
        {
          text: 'whatsapp',
          role: 'destructive',
          handler: () => {
          this.whatsUpShare(address)   }
        },{
          text: 'facebook',
           role: 'destructive',
          handler: () => {
           this.facebookShare(address)
          }
        },{
          text: 'message',
          role: 'destructive',
          handler: () => {
           this.messageShare(address);
          }
        },
        {
          text: 'email',
          role: 'destructive',
          handler: () => {
            this.emailShare(address);
          }
        }
      ]
    });
    actionSheet.present();
}
whatsUpShare(address){
	console.log("address = ="+address);
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
myRequestFunc(a){
	this.requestAmountBCH=a;

}
}
