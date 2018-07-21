
interface SignupDetail {
   email:string;
   password:string;
   confirmPassword:string;
   spendingpassword:string;
   confirmspendingpassword:string;
}
interface LoginDetail {
   email: string;
   password:string; 
}

interface EmailId{
   userMailId:string;
}

interface otpvalue{
   userMailId:string;
   otp: string;
}

interface newPasswordvalues{
   userMailId: string;
   newPassword: string;
   confirmNewPassword: string;
}

interface User {
   bids:Bids[];
   asks:Asks[];
   email:"";
   BTCbalance:number;
   BCHbalance:number;
   FreezedBTCbalance:number;
   FreezedBCHbalance:number;
   userBCHAddress:string;
   userBTCAddress:string;
   encryptedPassword:string;
   encryptedSpendingpassword:string;
   encryptedForgotPasswordOTP:string;
   encryptedForgotSpendingPasswordOTP:string;
   encryptedEmailVerificationOTP:string;
   verifyEmail:Boolean;
   isAdmin:Boolean;
   id:number
}


interface Bids{
   bidAmountBTC:number;
   bidAmountBCH:number;
   bidRate:number;
   bidowner:number;
   id:number;
}


interface Asks{
   askAmountBTC:number;
   askAmountBCH:number;
   askRate:number;
   askowner:number;
   id:number;
}

 interface CurrentPrice{
   timestamp:number;
   low:number;
   high:number;
   last:number;
   volume:number;
   volume30d:number;
   bid:number;
   ask:number;
}