import { Component } from '@angular/core';
import { NavController,LoadingController,Events } from 'ionic-angular';
import { SetupService } from '../../services/setup.service';
import { BidcryptoPage }from '../bidcrypto/bidcrypto';
import { AskcryptoPage } from '../askcrypto/askcrypto';
import { BuycryptoPage } from '../buycrypto/buycrypto';
import { SellcryptoPage } from '../sellcrypto/sellcrypto';
import { BtcvaultPage } from '../btcvault/btcvault';
import { CryptovaultPage} from '../cryptovault/cryptovault';

import { Http } from '@angular/http';
import *as HighCharts from 'highcharts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  
})
export class HomePage {
  endpoint_url: string = 'http://192.168.1.11:1338';
    //endpoint_url: string = 'http://162.213.252.66:1338';
public user:any;
public useremail:any;
public ask:any;
public bid:any;
public FreezedBTCbalance:any;
public FreezedBCHbalance:any;
public BTCbalance:any;
public BCHbalance:any;
public myChart:any;
public chartData:any;
public series:any;
email={
       "userMailId": ""
  }
currentUserBalance={
    "ask": "",
    "bid": ""
   }
   chartdata={
    "lastHours":24,
    "maxRespArrSize":50
   }
  constructor(public navCtrl: NavController,public http: Http,public events: Events,public _setupService: SetupService,public loadingCtrl: LoadingController) {
this.userdata();
  this.currentprice();
  console.log("user data= = "+JSON.stringify(this.user)); 
  
  }
userdata(){
   this.user=JSON.parse(localStorage.getItem('logindetail'));
   if(this.user!=null||this.user!=undefined){
      this.useremail=this.user.user.email; 
      this.events.publish("shareObject", this.useremail);
      this.email.userMailId=this.user.user.email;
      this.BTCbalance=(this.user.user.BTCbalance).toFixed(5);
      this.BCHbalance=(this.user.user.BCHbalance).toFixed(5); 
      this.FreezedBCHbalance=(this.user.user.FreezedBCHbalance).toFixed(5);
      this.FreezedBTCbalance=(this.user.user.FreezedBTCbalance).toFixed(5);
   }
}
 doRefresh(refresher) {
   this.email.userMailId=this.user.user.email;
    console.log('Begin async operation',+ this.email);
    setTimeout(() => {

      this._setupService.CurrntBalanceOfBCH(this.email).subscribe((response)=>{
       if(response.statusCode==200){
           localStorage.setItem('logindetail',JSON.stringify(response));
          this.userdata();
         }
      });

      this._setupService.CurrntBalanceOfBTC(this.email).subscribe((response)=>{
       if(response.statusCode==200){
           localStorage.setItem('logindetail',JSON.stringify(response));
           this.user=JSON.parse(localStorage.getItem('logindetail'));
           if(this.user){
             this.email.userMailId=this.user.user.email;
           }           
           this.userdata();
         }
      });
      this.currentprice();
      refresher.complete();
    }, 2000);
  }
  
  currentprice(){
    // this.email.userMailId=this.user.user.email;
    this._setupService.getBidCoin().subscribe((response)=>{
      console.log(JSON.stringify(response));
    if(response.statusCode==200){
           this.currentUserBalance.ask=(response.currentPrice.ask).toFixed(5);
           this.currentUserBalance.bid=(response.currentPrice.bid).toFixed(5);
            this.ask = this.currentUserBalance.ask;
           //this.bid = this.currentUserBalance.bid;
           console.log(JSON.stringify(this.currentUserBalance.ask));
           console.log(JSON.stringify(this.bid));
         }
         else{
          console.log("no data found ... ");
         }
      });
   

    this._setupService.chartAvailabelData(this.chartdata).subscribe((response)=>{
      console.log("response = "+JSON.stringify(response));
        this.chartData=response.data; 
        var labels=response.timeStamp;
        console.log(JSON.stringify(labels));
        this.series= ['Price'];
        var data=response.rate;
        this.myChart = HighCharts.chart('container', {
        credits: {
          enabled: false
        },
      chart: {
        type: 'line',
        backgroundColor: {
          linearGradient: [0, 0, 0, 0],
          stops: [
            [0, '#072c4a'],
            [1, '#072c4a']
          ]
        },
        style: {
          fontFamily: 'serif',
          color: '#fff'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      title: {
        text: '',
        style: {
          color: '#fff'
        }
      },
      xAxis: {
        categories: labels,
        labels: {
          style: {
            color: '#fff'
          },
          step: 10
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          align: 'left',
          style: {
            color: 'rgba(255, 255, 255, 0.65)',
            fontSize: '8pt',
          },
          reserveSpace: false,
          x: 2,
          y: 0
        },
        gridLineColor: 'rgba(255, 255, 255, 0.65)'
      },
      series: [{
        name: 'Price',
        data: data,

      }],
      tooltip: {
        crosshairs: [true, true]
       }
     });   
    });
  }

  bidCrypto(){
    this.navCtrl.setRoot(BidcryptoPage);
  }

  askCrypto(){
   this.navCtrl.setRoot(AskcryptoPage);
  }
  btcvault(){
   this.navCtrl.setRoot(BtcvaultPage);
  }
  cryptovault(){
     this.navCtrl.setRoot(CryptovaultPage);
  }
   BuyBch(){
    this.navCtrl.setRoot(BuycryptoPage);
   }
   SellBch(){
     this.navCtrl.setRoot(SellcryptoPage);

   }
 
}
