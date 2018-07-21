import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { ForgotPasswordPage } from '../pages/forgotPassword/forgotPassword';
import { ChangespendingpasswordPage } from '../pages/changespendingpassword/changespendingpassword';
import { AskcryptoPage } from '../pages/askcrypto/askcrypto';
import { BidcryptoPage } from '../pages/bidcrypto/bidcrypto';
import { BuycryptoPage} from '../pages/buycrypto/buycrypto';
import { SellcryptoPage} from'../pages/sellcrypto/sellcrypto';
import { CryptovaultPage} from '../pages/cryptovault/cryptovault';
import { BtcvaultPage }from '../pages/btcvault/btcvault';
import { SendbtcPage } from '../pages/sendbtc/sendbtc';
import { SendcryptoPage } from '../pages/sendcrypto/sendcrypto'
import { RequestbtcPage} from '../pages/requestbtc/requestbtc';
import { RequestcryptoPage } from '../pages/requestcrypto/requestcrypto';
import { BtcsenttransactionPage } from '../pages/btcsenttransaction/btcsenttransaction';
import { BtcreceivedtransactionPage } from '../pages/btcreceivedtransaction/btcreceivedtransaction';
import { CryptosenttransactionPage }from '../pages/cryptosenttransaction/cryptosenttransaction';
import { CryptoreceivedtransactionPage }from'../pages/cryptoreceivedtransaction/cryptoreceivedtransaction';
import { BuysellcryptotransactionPage } from '../pages/buysellcryptotransaction/buysellcryptotransaction';
import { SettingPage } from '../pages/setting/setting';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServicesProvider } from '../providers/services/services';
import { SetupService } from '../services/setup.service';
//import *as HighCharts from 'highcharts';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { PinDialog } from'@ionic-native/pin-dialog';
//import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
//import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    HomePage,
    LoginPage,
    SignupPage,
    ChangepasswordPage,
    ForgotPasswordPage,
    HomePage,
    AskcryptoPage,
    BidcryptoPage,
    BuycryptoPage,
    SellcryptoPage,
    CryptovaultPage,
    BtcvaultPage,
    SendbtcPage,
    SendcryptoPage,
    RequestbtcPage,
    RequestcryptoPage,
    BtcsenttransactionPage,
    BtcreceivedtransactionPage,
    CryptosenttransactionPage,
    CryptoreceivedtransactionPage,
    BuysellcryptotransactionPage,
    ChangespendingpasswordPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    HomePage,
    LoginPage,
    SignupPage,
    ChangepasswordPage,
    ForgotPasswordPage,
    AskcryptoPage,
    BidcryptoPage,
    BuycryptoPage,
    SellcryptoPage,
    CryptovaultPage,
    BtcvaultPage,
    SendbtcPage,
    SendcryptoPage,
    RequestbtcPage,
    RequestcryptoPage,
    BtcsenttransactionPage,
    BtcreceivedtransactionPage,
    CryptosenttransactionPage,
    CryptoreceivedtransactionPage,
    BuysellcryptotransactionPage,
    ChangespendingpasswordPage,
    SettingPage
  ],
  providers: [
    StatusBar,PinDialog,
    SplashScreen,SocialSharing,Clipboard,BarcodeScanner,
   {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider,SetupService,
  ]
})
export class AppModule {}
