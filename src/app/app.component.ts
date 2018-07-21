import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,AlertController,App,Events,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CryptovaultPage } from '../pages/cryptovault/cryptovault';
import { BtcvaultPage }from '../pages/btcvault/btcvault';
import { SettingPage } from '../pages/setting/setting';
import { SetupService } from '../services/setup.service';
import { PinDialog } from '@ionic-native/pin-dialog';
//import { FingerprintAIO ,FingerprintOptions} from '@ionic-native/fingerprint-aio';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public user:any;
  public userDetail1:any;
   public emailId:any;
  email={
       "userMailId": ""
  }
  @ViewChild(Nav) nav: Nav;
  rootPage: any = WelcomePage; 
  public togglePin:boolean; 
  public pinValueForApp:any;
  public toggleFingerPrint:any;
 // fingerprintOptions : FingerprintOptions;1
  pages: Array<{title: string, component: any,icon: string}>;

  constructor(public platform: Platform,public toastCtrl: ToastController,private pinDialog: PinDialog,public events: Events,public _setupService: SetupService,public  app: App,public alertCtrl: AlertController, public statusBar: StatusBar, public splashScreen: SplashScreen) {
     this.togglePin=JSON.parse(localStorage.getItem('pinLockEnabel'));   
     this.pinValueForApp=JSON.parse(localStorage.getItem('pinforapp')); 
     this.toggleFingerPrint=JSON.parse(localStorage.getItem('fingerPrintEnabel'));

   //  alert("this.toggleFingerPrint = = "+this.toggleFingerPrint);
     if(this.togglePin==null||this.togglePin==false||this.pinValueForApp==null)
     {
            this.initializeApp();
     }
     else{
          this.pinDialog.prompt('Enter your PIN', 'Verify PIN', ['OK'])
          .then(
           (result: any) => {
           if (result.buttonIndex == 1){
             console.log('User clicked OK, value is: ', result.input1);
             if(this.pinValueForApp!=null||this.pinValueForApp!=undefined)
             {
               if(result.input1==this.pinValueForApp){                
                this.initializeApp(); 
                }
                else{
                   let toast = this.toastCtrl.create({
                     message: 'Pin not matched !!',
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present();
                this.platform.exitApp();
               }
            } 
          } 
            else if(result.buttonIndex == 2){
            this.platform.exitApp();
             }
           }
         );
      }
    
    this.registerBackButtonAction();     
    this.pages = [
      { title: 'Dashboard', component: HomePage, icon: 'home' },
      { title: 'BTC Wallet', component: BtcvaultPage ,icon: 'apps'},
      { title: 'BCH Wallet', component: CryptovaultPage ,icon: 'apps'},
      { title: 'Setting', component: SettingPage ,icon: 'settings'},
      { title: 'Logout', component: null, icon: 'log-out'}
    ];
     events.subscribe('shareObject', (userData) => {       
       localStorage.setItem('userprofileEmailId',JSON.stringify(userData));
       this.user=JSON.parse(localStorage.getItem('userprofileEmailId')); 
       if(this.user){
         this.emailId=this.user;
       }
       
  });  
  }

  initializeApp() {
       this.platform.ready().then(() => {
          var firstVisit = localStorage.getItem('firstVisit');                
          if (firstVisit==null) {
              this.nav.setRoot(HomePage);           
          }      
          else if(localStorage.getItem('logindetail')){
             this.nav.setRoot(HomePage);    
          }   
          else{
            this.nav.setRoot(HomePage);    
          }
           this.statusBar.backgroundColorByHexString('#001f38');
           this.splashScreen.hide();      
    });
  }
  
 registerBackButtonAction(){
    this.platform.registerBackButtonAction(() => { 
                let nav = this.app.getActiveNavs()[0];
                let activeView = nav.getActive();
                if(activeView.name === "HomePage") { 
                    if (nav.canGoBack()){ //Can we go back?
                        nav.pop();
                    } else {
                        const alert = this.alertCtrl.create({
                            title: 'App termination',
                            message: 'Do you want to close the app?',
                            buttons: [{
                                text: 'Cancel',
                                role: 'cancel',
                                handler: () => {
                                    console.log('Application exit prevented!');
                                }
                            },{
                                text: 'Close App',
                                handler: () => {
                                    this.platform.exitApp(); // Close this application
                                }
                            }]
                        });
                        alert.present();
                    }
                }
            });
}

  welcomeToBack(){
    this.nav.setRoot(LoginPage);
   }
  openPage(page) {
    if(page.component) {
    this.nav.setRoot(page.component);
  }
  else{
    localStorage.removeItem("logindetail");
    //localStorage.clear();
    setTimeout(()=>this.welcomeToBack(),1000)  
  }
  }
}
