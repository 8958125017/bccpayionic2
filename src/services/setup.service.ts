


import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SetupService {

  constructor(public http: Http) {
   this.http = http;    
    console.log('Hello ServicesProvider Provider');
  }
  endpoint_url: string = 'http://192.168.0.148:1338';
  //endpoint_url: string = 'http://162.213.252.66:1338';
     //endpoint_url: string = 'http://192.168.43.132:1338';
    createLoginDetail(loginDetail: any) {
      // console.log("loginDetail = = "+JSON.stringfy(loginDetail));
        var response = this.http.post(this.endpoint_url + '/auth/authentcate',loginDetail ).map(res => res.json());
        return response;
    }

    createUserAccount(SignUpDetail: any) {
        var response = this.http.post(this.endpoint_url + '/user/createNewUser',SignUpDetail ).map(res => res.json());
        return response;
    }
    VerificationEmail(otpDetail: any) {    
        var response = this.http.post(this.endpoint_url + '/user/updateUserVerifyEmail',otpDetail ).map(res => res.json());
        return response;
    }

    forgotPassword(userDetail: any) {
        var response = this.http.post(this.endpoint_url + '/user/sentOtpToEmailForgotPassword',userDetail ).map(res => res.json());
        return response;
    }
    forgotPasswordOTP(otp: any) {
        var response = this.http.post(this.endpoint_url + '/user/verifyOtpToEmailForgotPassord',otp ).map(res => res.json());
        return response;
    }
    updateForgotPassord(newpasswordvalues: any) {
      var response =this.http.post(this.endpoint_url +'/user/updateForgotPassordAfterVerify',newpasswordvalues).map(res =>res.json());
      return response;
    }

     chartAvailabelData(chartdata: any) {
      var response =this.http.post(this.endpoint_url +'/cexticker/getChart',chartdata).map(res =>res.json());
      return response;
    }  
    CurrntBalanceOfBCH(emailId: any) {
      var response =this.http.post(this.endpoint_url +'/usertransaction/getBalBCH',emailId).map(res =>res.json());
      return response;
    }    
    
     CurrntBalanceOfBTC(emailId: any) {
      var response =this.http.post(this.endpoint_url +'/usertransaction/getBalBTC',emailId).map(res =>res.json());
      return response;
    }
      getBidCoin() {
      var response =this.http.post(this.endpoint_url +'/cexticker/getCurrntPriceOfBTC','').map(res =>res.json());
      console.log("response = = ="+JSON.stringify(response));
      return response;

      
    }
     buyBCHCoinByUser(buyAmountSend: any) {
      var response =this.http.post(this.endpoint_url +'/usertransaction/getBalBTC',buyAmountSend).map(res =>res.json());
      return response;
    }
     sellBCHCoinByUser(sellAmount: any) {
      var response =this.http.post(this.endpoint_url +'/usertransaction/getBalBTC',sellAmount).map(res =>res.json());
      return response;
    }
    bidCryptoAmount(bidCryptoAmount: any) {
      var response =this.http.post(this.endpoint_url +'/bid/addbid',bidCryptoAmount).map(res =>res.json());
      return response;
    }
    askCryptoAmount(askCryptoAmount: any) {
      var response =this.http.post(this.endpoint_url +'/ask/addask',askCryptoAmount).map(res =>res.json());
      return response;
    }
     sendBTCCoinByUser(values: any) {
      var response =this.http.post(this.endpoint_url +'/usertransaction/sendBTC',values).map(res =>res.json());
      return response;
    }
    getBTCTransactions(values: any){
      var response =this.http.post(this.endpoint_url +'/usertransaction/getTxsListBTC',values).map(res =>res.json());
      return response;
    }
    getBCHTransactions(values: any){
      var response =this.http.post(this.endpoint_url +'/usertransaction/getTxsListBCH',values).map(res =>res.json());
      return response;
    }
    
    sendBCHCoinByUser(values: any) {
      var response =this.http.post(this.endpoint_url +'/usertransaction/sendBCH',values).map(res =>res.json());
      return response;
    }
   
    
    changecurrentpasswords(values:any){
     var response =this.http.post(this.endpoint_url +'/user/updateCurrentPassword',values).map(res =>res.json());
      return response;
    }
    
    OtpToUpdateSpendingPassword(values:any){
     var response =this.http.post(this.endpoint_url +'/user/sentOtpToUpdateSpendingPassword',values).map(res =>res.json());
      return response;
    }

    OtpToEmailForgotSpendingPassord(values:any){
      var response =this.http.post(this.endpoint_url +'/user/verifyOtpToEmailForgotSpendingPassord',values).map(res =>res.json());
      return response;
   }

    setNewSpendingPassord(values:any){
     var response =this.http.post(this.endpoint_url +'/user/updateForgotSpendingPassordAfterVerify',values).map(res =>res.json());
      return response;
   }

   NewEmailVerification(values:any){
    var response =this.http.post(this.endpoint_url +'/user/verifyOtpToEmailVerification',values).map(res =>res.json());
    return response;
   } 
   EmailVerifyforAccount(values:any){
    var response =this.http.post(this.endpoint_url +'/user/sentOtpToEmailVerificatation',values).map(res =>res.json());
    return response;
   } 


   
  

}


