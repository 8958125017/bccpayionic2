import { Component } from '@angular/core';
import {  NavController, LoadingController,ToastController,AlertController,ActionSheetController  } from 'ionic-angular';

import { SetupService } from '../../services/setup.service';
//import { RequestbtcPage} from '../requestbtc/requestbtc';
import { HomePage } from '../home/home';

import { Clipboard } from '@ionic-native/clipboard';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the SendbtcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sendbtc',
  templateUrl: 'sendbtc.html',
})
export class SendbtcPage {
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
public codeArray:any;
public getImageData:any;
email={
       "userMailId": ""
  }
  currentUserBalance={
    "ask":"",
    "bid":""
   }

   values = {
    "userMailId": "",
    "amount": "",
    "spendingPassword": "",
    "recieverBTCCoinAddress": "",
    "commentForReciever": "Comment for Reciever",
    "commentForSender": "Comment for sender"
  }
  data = {
    "address": "",
    "amount": ""
  }
 constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner,public alertCtrl: AlertController,public toastCtrl: ToastController,public _setupService: SetupService,public loadingCtrl: LoadingController,public actionSheetCtrl: ActionSheetController,private clipboard: Clipboard) {
   this.currentPrice();   
   this.userdata();
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
   this.userBTCAddress=this.user.user.userBTCAddress;
   this.userId=this.user.user.id;  

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

sendBTCCoinByUser(){
  if(!this.values.recieverBTCCoinAddress||!this.values.amount){
   let toast = this.toastCtrl.create({
                     message: 'field should be required!!',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
               toast.present();
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
               console.log("hello");
          }
        },
        {
          text: 'submit',
          handler: data => {
            let loading = this.loadingCtrl.create({
           content: 'transaction is in progress...'
        });
            loading.present();
            this.values.userMailId=this.email.userMailId;
            this.values.spendingPassword=data.spendingPassword;  
            this._setupService.sendBTCCoinByUser(this.values).subscribe((response) => {
               if(response.statusCode== 200){
                  localStorage.setItem('logindetail',JSON.stringify(response));
                  this.userdata();
                     let toast = this.toastCtrl.create({
                     message: 'Transaction Successfully !!',
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

scanBarCode(){
	this.fabButton=false;
	this.barcodeScanner.scan().then((barcodeData) => {
     this.getImageData=barcodeData.text;
     if(this.getImageData.indexOf(",")>0){
     	this.codeArray=this.getImageData.split(',');
     	this.values.recieverBTCCoinAddress=this.codeArray[0].replace(/bitcoin:|bitcoin=|btc:|btc=|btcaddress:|btcaddress=|btcaddress:|btcaddress=/g, "").trim();
        this.values.amount=this.codeArray[1].replace(/amount:|amount=/g, "").trim();
        }
        else if(this.getImageData.indexOf(":") > 0 || this.getImageData.indexOf("=") > 0){
        this.codeArray=this.getImageData;
        this.values.recieverBTCCoinAddress=this.codeArray.replace(/bitcoin:|bitcoin=|btc:|btc=|btcaddress:|btcaddress=|btcaddress:|btcaddress=/g, "").trim();
     }
     else{
     	this.values.recieverBTCCoinAddress=this.getImageData;
        }
}, (err) => {
    console.log("An error happened -> " + err);
});
	
}

}
