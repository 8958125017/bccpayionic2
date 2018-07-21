webpackJsonp([0],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuycryptoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the BuycryptoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BuycryptoPage = (function () {
    function BuycryptoPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.email = {
            "userMailId": ""
        };
        this.currentUserBalance = {
            "ask": "",
            "bid": ""
        };
        this.buyAmountSend = {
            "userMailId": "",
            "buyAmountBCH": "",
            "buyAmountBTC": "",
            "spendingPassword": "",
            "commentForReciever": "Comment for Reciever",
            "commentForSender": "Comment for sender"
        };
        this.myFunc = function (a) {
            var tempBuy;
            tempBuy = a * (this.currentUserBalance.ask + .002);
            this.buyAmountSend.buyAmountBTC = tempBuy.toFixed(5);
        };
        this.currentPrice();
        this.userdata();
    }
    BuycryptoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BuycryptoPage');
    };
    BuycryptoPage.prototype.currentPrice = function () {
        var _this = this;
        this._setupService.getBidCoin().subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.currentUserBalance.ask = (response.currentPrice.ask).toFixed(5);
                _this.currentUserBalance.bid = (response.currentPrice.bid).toFixed(5);
                _this.ask = _this.currentUserBalance.ask;
            }
            else {
                console.log("no data found ... ");
            }
        });
    };
    BuycryptoPage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this.BTCbalance = (this.user.user.BTCbalance).toFixed(5);
        this.BCHbalance = (this.user.user.BCHbalance).toFixed(5);
        this.FreezedBCHbalance = (this.user.user.FreezedBCHbalance).toFixed(5);
        this.FreezedBTCbalance = (this.user.user.FreezedBTCbalance).toFixed(5);
        this.userId = this.user.user.id;
    };
    BuycryptoPage.prototype.buyAmountAction = function () {
        var _this = this;
        this.buyAmountSend.userMailId = this.email.userMailId;
        if (!this.buyAmountSend.buyAmountBCH || !this.buyAmountSend.buyAmountBTC) {
            var toast = this.toastCtrl.create({
                message: "field should be required!!",
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 5000
            });
            toast.present();
        }
        else if (this.buyAmountSend.buyAmountBTC < this.BTCbalance) {
            var prompt_1 = this.alertCtrl.create({
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
                        handler: function (data) {
                        }
                    },
                    {
                        text: 'submit',
                        handler: function (data) {
                            var loading = _this.loadingCtrl.create({
                                content: 'transaction is in progress...'
                            });
                            loading.present();
                            _this.buyAmountSend.spendingPassword = data.spendingPassword;
                            _this._setupService.buyBCHCoinByUser(_this.buyAmountSend).subscribe(function (response) {
                                if (response.statusCode == 200) {
                                    localStorage.setItem('logindetail', JSON.stringify(response));
                                    _this.userdata();
                                    var toast = _this.toastCtrl.create({
                                        message: 'transaction successfully !!',
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    loading.dismiss();
                                    toast.present();
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                                }
                                else {
                                    loading.dismiss();
                                    var toast = _this.toastCtrl.create({
                                        message: response.message,
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    toast.present();
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                                }
                            });
                        }
                    }
                ],
                enableBackdropDismiss: false
            });
            prompt_1.present();
        }
    };
    return BuycryptoPage;
}());
BuycryptoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-buycrypto',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/buycrypto/buycrypto.html"*/'<!--\n  Generated template for the BuycryptoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Buy BCC</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="relative-position">\n    <div class="light-blue darken-4 white-text padding">\n      <div class="row">\n        <h4 class="col white-text no-margin text-roboto"><span class="crypto-icon crypto-vault-symbol">Ƀc&nbsp;</span>{{BCHbalance}}</h4>\n\n      </div>\n      <div class="row no-margin">\n        <div class="col col-50  white-text">\n          <small style="color: #a9a9a9">Freezed BCC Balance </small><br><span class="">Ƀc&nbsp;</span>{{FreezedBCHbalance}}\n        </div>\n        <span class="pull-right valign-wrapper">1 Ƀc = {{currentUserBalance.ask }} Ƀ</span>\n      </div>\n    </div>\n    <div class="row padding">\n      <form class="col s12 center ">\n\n        <div class="row ">\n          <div class="input-field col s12 ">\n          <input id="number" type="number" placeholder="Amount Of BCC" [(ngModel)]="buyAmountSend.buyAmountBCH" (ngModelChange)="myFunc(buyAmountSend.buyAmountBCH)" name="number" >    \n             \n          </div>\n        </div>\n        <div class="row ">\n          <div class="input-field col s12 ">\n          	<input id="number" type="number" placeholder="Amount Of BTC" [(ngModel)]="buyAmountSend.buyAmountBTC"  name="number" disabled="true">  \n           \n          </div>\n        </div>\n        <button class="btn waves-effect waves-light light-blue darken-4 white-text" type="submit " name="action " (click)="buyAmountAction(buyAmountSend) ">Submit\n        <ion-icon name="send"></ion-icon>\n        </button>\n      </form>\n    </div>\n\n  </ion-content>\n\n\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/buycrypto/buycrypto.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], BuycryptoPage);

//# sourceMappingURL=buycrypto.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SellcryptoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SellcryptoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SellcryptoPage = (function () {
    function SellcryptoPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.email = {
            "userMailId": ""
        };
        this.currentUserBalance = {
            "ask": "",
            "bid": ""
        };
        this.sellAmount = {
            "userMailId": "",
            "sellAmountBCH": "",
            "sellAmountBTC": "",
            "spendingPassword": "",
            "commentForReciever": "Comment for Reciever",
            "commentForSender": "Comment for sender"
        };
        this.myFunc = function (a) {
            var tempSell;
            tempSell = a * (this.currentUserBalance.bid + .002);
            this.sellAmount.sellAmountBTC = tempSell.toFixed(5);
            // var buy = angular.element(document.querySelector('#buyCryptoFocus'));
            // buy.attr('style', 'transform: translateY(-14px);');
        };
        this.currentPrice();
        this.userdata();
    }
    SellcryptoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SellcryptoPage');
    };
    SellcryptoPage.prototype.currentPrice = function () {
        var _this = this;
        this._setupService.getBidCoin().subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.currentUserBalance.ask = (response.currentPrice.ask).toFixed(5);
                _this.currentUserBalance.bid = (response.currentPrice.bid).toFixed(5);
                _this.ask = _this.currentUserBalance.ask;
            }
            else {
                console.log("no data found ... ");
            }
        });
    };
    SellcryptoPage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this.BTCbalance = (this.user.user.BTCbalance).toFixed(5);
        this.BCHbalance = (this.user.user.BCHbalance).toFixed(5);
        this.FreezedBCHbalance = (this.user.user.FreezedBCHbalance).toFixed(5);
        this.FreezedBTCbalance = (this.user.user.FreezedBTCbalance).toFixed(5);
        this.userId = this.user.user.id;
    };
    SellcryptoPage.prototype.sellAmountAction = function () {
        var _this = this;
        this.sellAmount.userMailId = this.email.userMailId;
        if (!this.sellAmount.sellAmountBCH || !this.sellAmount.sellAmountBTC) {
            var toast = this.toastCtrl.create({
                message: "field should be required!!",
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 5000
            });
            toast.present();
        }
        else if (this.sellAmount.sellAmountBCH < this.BCHbalance) {
            var prompt_1 = this.alertCtrl.create({
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
                        handler: function (data) {
                        }
                    },
                    {
                        text: 'submit',
                        handler: function (data) {
                            var loading = _this.loadingCtrl.create({
                                content: 'transaction is in progress..'
                            });
                            loading.present();
                            _this.sellAmount.spendingPassword = data.spendingPassword;
                            _this._setupService.sellBCHCoinByUser(_this.sellAmount).subscribe(function (response) {
                                if (response.statusCode == 200) {
                                    localStorage.setItem('logindetail', JSON.stringify(response));
                                    _this.userdata();
                                    var toast = _this.toastCtrl.create({
                                        message: 'transaction successfully !!',
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    loading.dismiss();
                                    toast.present();
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                                }
                                else {
                                    loading.dismiss();
                                    var toast = _this.toastCtrl.create({
                                        message: response.message,
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    toast.present();
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                                }
                            });
                        }
                    }
                ],
                enableBackdropDismiss: false
            });
            prompt_1.present();
        }
    };
    return SellcryptoPage;
}());
SellcryptoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-sellcrypto',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/sellcrypto/sellcrypto.html"*/'<!--\n  Generated template for the BuycryptoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Sell BCC</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="relative-position">\n    <div class="light-blue darken-4 white-text padding">\n      <div class="row">\n        <h4 class="col white-text no-margin text-roboto"><span class="crypto-icon crypto-vault-symbol">Ƀc&nbsp;</span>{{BCHbalance}}</h4>\n\n      </div>\n      <div class="row no-margin">\n        <div class="col col-50  white-text">\n          <small style="color: #a9a9a9">Freezed BCC Balance </small><br><span class="">Ƀc&nbsp;</span>{{FreezedBCHbalance}}\n        </div>\n        <span class="pull-right valign-wrapper">1 Ƀc = {{currentUserBalance.bid}} Ƀ</span>\n      </div>\n    </div>\n\n      <div class="row padding">\n      <form class="col s12 center ">\n\n        <div class="row ">\n          <div class="input-field col s12 ">\n          <input id="number" type="number" placeholder="Amount Of BCC" [(ngModel)]="sellAmount.sellAmountBCH" (ngModelChange)="myFunc(sellAmount.sellAmountBCH)" name="number" > \n          </div>\n        </div>\n        <div class="row ">\n          <div class="input-field col s12 ">\n            <input id="number1" type="number" placeholder="Amount Of BTC" [(ngModel)]="sellAmount.sellAmountBTC"  name="number1" disabled="true"> \n           \n          </div>\n        </div>\n        <button class="btn waves-effect waves-light light-blue darken-4 white-text" type="submit " name="action "  (click)="sellAmountAction(sellAmount) ">Submit\n        <ion-icon name="send"></ion-icon>\n        </button>\n      </form>\n    </div>\n  </ion-content>\n\n\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/sellcrypto/sellcrypto.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], SellcryptoPage);

//# sourceMappingURL=sellcrypto.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptovaultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buycrypto_buycrypto__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sellcrypto_sellcrypto__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sendcrypto_sendcrypto__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__requestcrypto_requestcrypto__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__cryptosenttransaction_cryptosenttransaction__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__cryptoreceivedtransaction_cryptoreceivedtransaction__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__buysellcryptotransaction_buysellcryptotransaction__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_clipboard__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












//import { HomePage } from '../home/home';
/**
 * Generated class for the CryptovaultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CryptovaultPage = (function () {
    function CryptovaultPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl, actionSheetCtrl, sharingVar, clipboard) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.sharingVar = sharingVar;
        this.clipboard = clipboard;
        this.email = {
            "userMailId": ""
        };
        this.currentUserBalance = {
            "ask": "",
            "bid": ""
        };
        this.currentPrice();
        this.userdata();
    }
    CryptovaultPage.prototype.currentPrice = function () {
        var _this = this;
        this._setupService.getBidCoin().subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.currentUserBalance.ask = (response.currentPrice.ask).toFixed(5);
                _this.currentUserBalance.bid = (response.currentPrice.bid).toFixed(5);
                _this.ask = _this.currentUserBalance.ask;
            }
            else {
                console.log("no data found ... ");
            }
        });
        this.footer = false;
        this.fabButton = true;
    };
    CryptovaultPage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this.BTCbalance = (this.user.user.BTCbalance).toFixed(5);
        this.BCHbalance = (this.user.user.BCHbalance).toFixed(5);
        this.FreezedBCHbalance = (this.user.user.FreezedBCHbalance).toFixed(5);
        this.FreezedBTCbalance = (this.user.user.FreezedBTCbalance).toFixed(5);
        this.userBCHAddress = this.user.user.userBCHAddress;
        this.userId = this.user.user.id;
    };
    CryptovaultPage.prototype.footerShow = function () {
        this.footer = true;
        this.fabButton = false;
    };
    CryptovaultPage.prototype.showConfirm = function () {
        var _this = this;
        var bchAddress = this.userBCHAddress;
        console.log("btcaddress = =" + this.userBCHAddress);
        var alert = this.alertCtrl.create({
            title: '<div class="center" >My BCH Address</div>',
            subTitle: '<div class="center" (click)="copyAddress()"> <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=' + bchAddress + '"  alt="QR Code" style="width: 80%;" ></div><div class="center">' + bchAddress + '<div>',
            buttons: [
                {
                    text: 'copy',
                    handler: function (data) {
                        _this.clipboard.copy(bchAddress);
                        var toast = _this.toastCtrl.create({
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
                    handler: function (data) {
                        _this.shareAddress(bchAddress);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log("hello");
                    }
                }
            ]
        });
        alert.present();
    };
    CryptovaultPage.prototype.shareAddress = function (a) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Share address Via',
            buttons: [
                {
                    text: 'whatsapp',
                    role: 'destructive',
                    handler: function () {
                        _this.whatsUpShare(a);
                    }
                }, {
                    text: 'facebook',
                    role: 'destructive',
                    handler: function () {
                        _this.facebookShare(a);
                    }
                }, {
                    text: 'message',
                    role: 'destructive',
                    handler: function () {
                        _this.messageShare(a);
                    }
                },
                {
                    text: 'email',
                    role: 'destructive',
                    handler: function () {
                        _this.emailShare(a);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    CryptovaultPage.prototype.whatsUpShare = function (address) {
        this.sharingVar.shareViaWhatsApp(address, null /* img */, null /* url */).then(function (data) {
            console.log('Shared via whatsup');
        })
            .catch(function (err) {
            console.log('Was not shared via whatsup');
        });
    };
    CryptovaultPage.prototype.facebookShare = function (address) {
        this.sharingVar.shareViaFacebook(address, null /* img */, null /* url */).then(function (data) {
            console.log('Shared via Facebook');
        })
            .catch(function (err) {
            console.log('Was not shared via Facebook');
        });
    };
    CryptovaultPage.prototype.messageShare = function (address) {
        this.sharingVar.shareViaSMS(address, null /* img */).then(function (data) {
            console.log('Shared via sms');
        })
            .catch(function (err) {
            console.log('Was not shared via sms');
        });
    };
    CryptovaultPage.prototype.emailShare = function (address) {
        this.sharingVar.shareViaEmail(address, null /* img */, null /* url */).then(function (data) {
            console.log('Shared via email');
        })
            .catch(function (err) {
            console.log('Was not shared via email');
        });
    };
    CryptovaultPage.prototype.ionViewDidLoad = function () {
        console.log("hello");
    };
    CryptovaultPage.prototype.bchsent = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__cryptosenttransaction_cryptosenttransaction__["a" /* CryptosenttransactionPage */]);
    };
    CryptovaultPage.prototype.bchreceived = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__cryptoreceivedtransaction_cryptoreceivedtransaction__["a" /* CryptoreceivedtransactionPage */]);
    };
    CryptovaultPage.prototype.buySellTransaction = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__buysellcryptotransaction_buysellcryptotransaction__["a" /* BuysellcryptotransactionPage */]);
    };
    CryptovaultPage.prototype.BuyBch = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__buycrypto_buycrypto__["a" /* BuycryptoPage */]);
    };
    CryptovaultPage.prototype.SellBch = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__sellcrypto_sellcrypto__["a" /* SellcryptoPage */]);
    };
    CryptovaultPage.prototype.sendBCH = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__sendcrypto_sendcrypto__["a" /* SendcryptoPage */]);
    };
    CryptovaultPage.prototype.requestBCH = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__requestcrypto_requestcrypto__["a" /* RequestcryptoPage */]);
    };
    return CryptovaultPage;
}());
CryptovaultPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-cryptovault',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/cryptovault/cryptovault.html"*/'<!--\n  Generated template for the BtcvaultPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>BCC Wallet</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content >\n	   <div class="light-blue darken-4 white-text padding">\n      <div class="row">\n        <h4 class="col white-text no-margin text-roboto"><span class="crypto-icon crypto-vault-symbol">Ƀ&nbsp;</span>{{BCHbalance}}</h4>\n        <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl={{userBCHAddress}}" alt="QR Code" style="height: 10%; width: 10%;" (click)="showConfirm()">\n      </div>\n      <div class="row no-margin">\n        <div class="col col-66  white-text">\n          <small style="color: #a9a9a9">Freezed BCH Balance </small><br><span class="">Ƀ&nbsp;</span>{{FreezedBCHbalance}}\n        </div>\n      </div>\n    </div>\n\n    <div class="list" style="background: #ececec;">\n <a class="item item-avatar valign-wrapper" (click)="bchsent()">\n              <img src="assets/icon/Bitcoin_cash_Logo.png">\n              <h2>Sent Transactions</h2>\n          </a>\n      <hr class="no-margin">\n      <a class="item item-avatar valign-wrapper" (click)="bchreceived()">\n              <img src="assets/icon/Bitcoin_cash_Logo.png">\n              <h2>Received Transactions</h2>\n      </a>\n      <hr class="no-margin">\n      <a class="item item-avatar valign-wrapper" (click)="buySellTransaction()">\n              <img src="assets/icon/Bitcoin_cash_Logo.png">\n              <h2>Buy/Sell Orders</h2>\n          </a>\n    </div>\n    <ion-fab  right bottom *ngIf="fabButton">\n    <button ion-fab mini (click)=footerShow()><ion-icon name="add"></ion-icon></button>\n   \n  </ion-fab>\n\n\n</ion-content>\n<ion-footer color="custom" *ngIf="footer">\n\n   <div class="bar bar-footer footer-height light-blue darken-3 center valign-wrapper">\n    <div class="row no-margin footer-button-line-height white-text">\n    	<div class="col-xl-3" style="margin-left: 24px" (click)="BuyBch()">\n        <ion-icon name="send"></ion-icon>&nbsp;Buy</div>\n        <div class="col-xl-3" style="margin-left: 24px" (click)="SellBch()">\n        <ion-icon name="person"></ion-icon>&nbsp;Sell</div>\n      <div class="col-xl-3" style="margin-left: 24px" (click)="sendBCH()">\n        <ion-icon name="send"></ion-icon>&nbsp;Send</div>\n      <div class="col-xl-3" style="margin-left: 24px" (click)="requestBCH()">\n       <ion-icon name="person"></ion-icon>\n        &nbsp;Request</div>\n\n    </div>\n  </div>\n</ion-footer>'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/cryptovault/cryptovault.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_clipboard__["a" /* Clipboard */]])
], CryptovaultPage);

//# sourceMappingURL=cryptovault.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__changespendingpassword_changespendingpassword__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_setup_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingPage = (function () {
    function SettingPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.email = {
            "userMailId": ""
        };
        this.passwordValue = {
            "userMailId": "",
            "currentPassword": "",
            "newPassword": "",
            "confirmNewPassword": ""
        };
        this.otpvalues = {
            "userMailId": "",
            "otp": ""
        };
        this.currentpasswordValue = {
            "userMailId": "",
            "currentPassword": ""
        };
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this.verifyEmail = this.user.user.verifyEmail;
        this.togglePin = JSON.parse(localStorage.getItem('pinLockEnabel'));
        this.toggleFingerPrint = JSON.parse(localStorage.getItem('fingerPrintEnabel'));
        if (this.togglePin == null || this.togglePin == undefined) {
            this.vaulePin = false;
        }
        else {
            this.vaulePin = this.togglePin;
        }
        if (this.toggleFingerPrint == null || this.toggleFingerPrint == undefined) {
            this.vaulefinger = false;
        }
        else {
            this.vaulefinger = this.toggleFingerPrint;
        }
    }
    SettingPage.prototype.veryfyEmail = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'sending otp in your emailId..'
        });
        loading.present();
        this._setupService.EmailVerifyforAccount(this.email).subscribe(function (response) {
            loading.dismiss();
            var prompt = _this.alertCtrl.create({
                title: 'Enter One Time Password',
                inputs: [
                    {
                        name: 'otp',
                        type: 'password',
                        placeholder: 'One Time Password',
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function (data) {
                        }
                    },
                    {
                        text: 'submit',
                        handler: function (data) {
                            var loading = _this.loadingCtrl.create({
                                content: 'verifying OtP...'
                            });
                            loading.present();
                            _this.otpvalues.userMailId = _this.email.userMailId;
                            _this.otpvalues.otp = data.otp;
                            _this._setupService.VerificationEmail(_this.otpvalues).subscribe(function (response) {
                                if (response.statusCode == 200) {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                                    loading.dismiss();
                                    localStorage.setItem('logindetail', JSON.stringify(response));
                                    _this.user = JSON.parse(localStorage.getItem('logindetail'));
                                    _this.email.userMailId = _this.user.user.email;
                                    _this.verifyEmail = _this.user.user.verifyEmail;
                                    _this.verifyEmail = true;
                                    var toast = _this.toastCtrl.create({
                                        message: 'verify email successfully !!',
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    toast.present();
                                }
                                else {
                                    loading.dismiss();
                                    var toast = _this.toastCtrl.create({
                                        message: response.message,
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    toast.present();
                                }
                            });
                        }
                    }
                ],
                enableBackdropDismiss: false
            });
            prompt.present();
        });
    };
    SettingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingPage');
    };
    SettingPage.prototype.changeCurrentPassword = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Change Password',
            inputs: [
                {
                    name: 'currentPassword',
                    type: 'password',
                    placeholder: 'Current Password',
                },
                {
                    name: 'newPassword',
                    type: 'password',
                    placeholder: 'New Password',
                },
                {
                    name: 'confirmNewPassword',
                    type: 'password',
                    placeholder: 'Confirm New Password',
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'submit',
                    handler: function (data) {
                        var loading = _this.loadingCtrl.create({
                            content: 'updating current password...'
                        });
                        loading.present();
                        _this.passwordValue.userMailId = _this.email.userMailId;
                        _this.passwordValue.currentPassword = data.currentPassword;
                        _this.passwordValue.newPassword = data.newPassword;
                        _this.passwordValue.confirmNewPassword = data.confirmNewPassword;
                        _this._setupService.changecurrentpasswords(_this.passwordValue).subscribe(function (response) {
                            if (response.statusCode == 200) {
                                loading.dismiss();
                                var toast = _this.toastCtrl.create({
                                    message: 'Password change successfully',
                                    showCloseButton: true,
                                    closeButtonText: 'Ok',
                                    duration: 5000
                                });
                                toast.present();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                            }
                            else {
                                loading.dismiss();
                                var toast = _this.toastCtrl.create({
                                    message: response.message,
                                    showCloseButton: true,
                                    closeButtonText: 'Ok',
                                    duration: 5000
                                });
                                toast.present();
                            }
                        });
                    }
                }
            ],
            enableBackdropDismiss: false
        });
        prompt.present();
    };
    SettingPage.prototype.changeSpendingtPassword = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Current Password',
            inputs: [
                {
                    name: 'currentPassword',
                    type: 'password',
                    placeholder: 'current password',
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'submit',
                    handler: function (data) {
                        var loading = _this.loadingCtrl.create({
                            content: 'sending otp in your EmailId...'
                        });
                        loading.present();
                        _this.currentpasswordValue.userMailId = _this.email.userMailId;
                        _this.currentpasswordValue.currentPassword = data.currentPassword;
                        _this._setupService.OtpToUpdateSpendingPassword(_this.currentpasswordValue).subscribe(function (response) {
                            if (response.statusCode == 200) {
                                loading.dismiss();
                                var prompt_1 = _this.alertCtrl.create({
                                    title: 'Enter One Time Password',
                                    inputs: [
                                        {
                                            name: 'otp',
                                            type: 'password',
                                            placeholder: 'One Time Password',
                                        }
                                    ],
                                    buttons: [
                                        {
                                            text: 'Cancel',
                                            handler: function (data) {
                                            }
                                        },
                                        {
                                            text: 'submit',
                                            handler: function (data) {
                                                var loading = _this.loadingCtrl.create({
                                                    content: 'verifying otp...'
                                                });
                                                loading.present();
                                                _this.otpvalues.userMailId = _this.email.userMailId;
                                                _this.otpvalues.otp = data.otp;
                                                _this._setupService.OtpToEmailForgotSpendingPassord(_this.otpvalues).subscribe(function (response) {
                                                    if (response.statusCode == 200) {
                                                        loading.dismiss();
                                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__changespendingpassword_changespendingpassword__["a" /* ChangespendingpasswordPage */]);
                                                    }
                                                    else {
                                                        loading.dismiss();
                                                        var toast = _this.toastCtrl.create({
                                                            message: response.message,
                                                            showCloseButton: true,
                                                            closeButtonText: 'Ok',
                                                            duration: 5000
                                                        });
                                                        toast.present();
                                                    }
                                                });
                                            }
                                        }
                                    ],
                                    enableBackdropDismiss: false
                                });
                                prompt_1.present();
                            }
                            else {
                                loading.dismiss();
                                var toast = _this.toastCtrl.create({
                                    message: response.message,
                                    showCloseButton: true,
                                    closeButtonText: 'Ok',
                                    duration: 5000
                                });
                                toast.present();
                            }
                        });
                    }
                }
            ],
            enableBackdropDismiss: false
        });
        prompt.present();
    };
    //Pin lock setting code
    SettingPage.prototype.setPinLock = function (value) {
        var _this = this;
        var newValue = value;
        if (value == true) {
            // set pin       
            var prompt_2 = this.alertCtrl.create({
                title: 'Set PIN',
                inputs: [
                    {
                        name: 'otp1',
                        type: 'password',
                        placeholder: 'pin',
                    },
                    {
                        name: 'otp2',
                        type: 'password',
                        placeholder: 'confirm pin',
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function (data) {
                            _this.vaulePin = false;
                        }
                    },
                    {
                        text: 'submit',
                        handler: function (data) {
                            if (data.otp1 == "" || data.otp2 == "") {
                                var toast = _this.toastCtrl.create({
                                    message: 'field should not be empty',
                                    showCloseButton: true,
                                    closeButtonText: 'Ok',
                                    duration: 5000
                                });
                                toast.present();
                                _this.vaulePin = false;
                            }
                            else if (data.otp1 == data.otp2) {
                                _this.pin = data.otp2;
                                localStorage.setItem('pinforapp', _this.pin);
                                _this.pinValueForApp = JSON.parse(localStorage.getItem('pinforapp'));
                                localStorage.setItem('pinLockEnabel', newValue);
                                _this.togglePin = Boolean(localStorage.getItem('pinLockEnabel'));
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: 'Pin not matched !!',
                                    showCloseButton: true,
                                    closeButtonText: 'Ok',
                                    duration: 5000
                                });
                                toast.present();
                                _this.vaulePin = false;
                            }
                        }
                    }
                ],
                enableBackdropDismiss: false
            });
            prompt_2.present();
        }
        else {
            localStorage.setItem('pinLockEnabel', newValue);
            this.togglePin = JSON.parse(localStorage.getItem('pinLockEnabel'));
            localStorage.removeItem('pinforapp');
        }
    };
    //set finger print for app
    SettingPage.prototype.setFingerPrint = function (value) {
        var vaulefinger = value;
        if (value == true) {
            localStorage.setItem('fingerPrintEnabel', vaulefinger);
            this.toggleFingerPrint = JSON.parse(localStorage.getItem('fingerPrintEnabel'));
        }
        else {
            localStorage.setItem('fingerPrintEnabel', vaulefinger);
            this.toggleFingerPrint = JSON.parse(localStorage.getItem('fingerPrintEnabel'));
        }
    };
    return SettingPage;
}());
SettingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-setting',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/setting/setting.html"*/'<!--\n  Generated template for the SettingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n  <ion-content>\n    \n    <div class="list">\n      <a class="item item-divider indigo-text text-lighten-3">\n            Account\n          </a>\n      <a >\n        <div>\n          Account verify<br>{{email.userMailId}}\n          <span (click)="veryfyEmail(user)" class="pull-right red-text" *ngIf="verifyEmail==false"> Not Verified</span>\n          <span class="pull-right green-text" *ngIf="verifyEmail==true"> Verified</span>\n        </div>\n      </a>\n      \n      <a class="item item-divider indigo-text text-lighten-3" href="#">\n            Security\n          </a>\n      <a (click)="changeCurrentPassword()">\n            Change Password\n      </a><br><br>\n      <a  (click)="changeSpendingtPassword()">\n            Change Spending Password\n          </a>  \n  <ion-list>\n\n  <ion-item>\n    <ion-label>PIN lock</ion-label>\n    <ion-toggle [(ngModel)]="vaulePin" (ngModelChange)="setPinLock(vaulePin)"></ion-toggle>\n     \n  </ion-item>\n  <ion-item>\n  <ion-label>Finger print</ion-label>\n    <ion-toggle [(ngModel)]="vaulefinger" (ngModelChange)="setFingerPrint(vaulefinger)"></ion-toggle>\n    </ion-item>\n  </ion-list>   \n      <a class="item item-divider indigo-text text-lighten-3">\n            App\n       </a>\n       \n      <a class="item item-icon-right ink" > <!-- ui-sref="app.about"> -->            \n            AboutUs<br><span class="pull-left green-text" > Version 1.0.0 </span>\n      </a>\n    </div>\n  </ion-content>\n\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/setting/setting.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], SettingPage);

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 121;

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bidcrypto_bidcrypto__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__askcrypto_askcrypto__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__buycrypto_buycrypto__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sellcrypto_sellcrypto__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__btcvault_btcvault__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__cryptovault_cryptovault__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_highcharts__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_highcharts__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomePage = (function () {
    function HomePage(navCtrl, http, events, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.events = events;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.endpoint_url = 'http://192.168.1.11:1338';
        this.email = {
            "userMailId": ""
        };
        this.currentUserBalance = {
            "ask": "",
            "bid": ""
        };
        this.chartdata = {
            "lastHours": 24,
            "maxRespArrSize": 50
        };
        this.userdata();
        this.currentprice();
        console.log("user data= = " + JSON.stringify(this.user));
    }
    HomePage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        if (this.user != null || this.user != undefined) {
            this.useremail = this.user.user.email;
            this.events.publish("shareObject", this.useremail);
            this.email.userMailId = this.user.user.email;
            this.BTCbalance = (this.user.user.BTCbalance).toFixed(5);
            this.BCHbalance = (this.user.user.BCHbalance).toFixed(5);
            this.FreezedBCHbalance = (this.user.user.FreezedBCHbalance).toFixed(5);
            this.FreezedBTCbalance = (this.user.user.FreezedBTCbalance).toFixed(5);
        }
    };
    HomePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.email.userMailId = this.user.user.email;
        console.log('Begin async operation', +this.email);
        setTimeout(function () {
            _this._setupService.CurrntBalanceOfBCH(_this.email).subscribe(function (response) {
                if (response.statusCode == 200) {
                    localStorage.setItem('logindetail', JSON.stringify(response));
                    _this.userdata();
                }
            });
            _this._setupService.CurrntBalanceOfBTC(_this.email).subscribe(function (response) {
                if (response.statusCode == 200) {
                    localStorage.setItem('logindetail', JSON.stringify(response));
                    _this.user = JSON.parse(localStorage.getItem('logindetail'));
                    if (_this.user) {
                        _this.email.userMailId = _this.user.user.email;
                    }
                    _this.userdata();
                }
            });
            _this.currentprice();
            refresher.complete();
        }, 2000);
    };
    HomePage.prototype.currentprice = function () {
        var _this = this;
        // this.email.userMailId=this.user.user.email;
        this._setupService.getBidCoin().subscribe(function (response) {
            console.log(JSON.stringify(response));
            if (response.statusCode == 200) {
                _this.currentUserBalance.ask = (response.currentPrice.ask).toFixed(5);
                _this.currentUserBalance.bid = (response.currentPrice.bid).toFixed(5);
                _this.ask = _this.currentUserBalance.ask;
                //this.bid = this.currentUserBalance.bid;
                console.log(JSON.stringify(_this.currentUserBalance.ask));
                console.log(JSON.stringify(_this.bid));
            }
            else {
                console.log("no data found ... ");
            }
        });
        this._setupService.chartAvailabelData(this.chartdata).subscribe(function (response) {
            console.log("response = " + JSON.stringify(response));
            _this.chartData = response.data;
            var labels = response.timeStamp;
            console.log(JSON.stringify(labels));
            _this.series = ['Price'];
            var data = response.rate;
            _this.myChart = __WEBPACK_IMPORTED_MODULE_10_highcharts__["chart"]('container', {
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
    };
    HomePage.prototype.bidCrypto = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__bidcrypto_bidcrypto__["a" /* BidcryptoPage */]);
    };
    HomePage.prototype.askCrypto = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__askcrypto_askcrypto__["a" /* AskcryptoPage */]);
    };
    HomePage.prototype.btcvault = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__btcvault_btcvault__["a" /* BtcvaultPage */]);
    };
    HomePage.prototype.cryptovault = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__cryptovault_cryptovault__["a" /* CryptovaultPage */]);
    };
    HomePage.prototype.BuyBch = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__buycrypto_buycrypto__["a" /* BuycryptoPage */]);
    };
    HomePage.prototype.SellBch = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__sellcrypto_sellcrypto__["a" /* SellcryptoPage */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/home/home.html"*/'\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>DashBoard</ion-title>\n  </ion-navbar>\n</ion-header>\n\n  <ion-content>\n     <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n    <div class="light-blue darken-4 white-text padding-top padding-bottom">\n      <div class="row center no-margin">\n        <h5 class="center col white-text text-roboto">BCC/BTC Market</h5>\n      </div>\n      <div class="center row no-margin trade-div white">\n\n        <div class="col light-blue-text text-darken-4" (click)="bidCrypto()">\n          <!-- ui-sref="app.bidcrypto"> -->\n          <span class="crypto-icon light-blue-text text-darken-4 text-roboto">Ƀ&nbsp;</span><span class="font-20 text-roboto">{{currentUserBalance.ask}}</span><br><span class="light-blue-text text-darken-4">Bid</span>\n        </div>\n        <div class="col" (click)="askCrypto()" style="border-left: 1px solid #003967">\n          <!-- ui-sref="app.askcrypto" -->\n          <span class="crypto-icon light-blue-text text-darken-4 text-roboto">Ƀ&nbsp;</span><span class="font-20 light-blue-text text-darken-4 text-roboto">{{currentUserBalance.bid}}</span><br><span class="light-blue-text text-darken-4">Ask</span>\n        </div>\n      </div>\n    </div>\n    \n    <div id="container" class="light-blue darken-4 white-text" style="width:100%; height:400px;color:#fff !important"></div>\n   \n    <div class="row light-blue-text text-darken-4 white padding-balance no-margin" (click)="btcvault()">\n      <div class="col col-50">\n        <span>Available BTC</span><br>\n        <small style="color: #a9a9a9">Freezed&nbsp;</small>\n        <small style="color: #a9a9a9">Ƀ&nbsp;{{FreezedBTCbalance}}</small>\n        <!-- <h6 class="bold white-text">Freezed BTC balance : 0.012</h6> -->\n      </div>\n      <div class="col text-right ">\n        <span class="crypto-icon">Ƀ&nbsp;</span><span class="font-25">{{BTCbalance}}</span>\n      </div>\n    </div>\n    <hr class="no-margin">\n    <div class="row light-blue-text text-darken-4 white padding-balance no-margin" (click)="cryptovault()">\n      <div class="col col-50">\n        <span>Available BCC </span><br>\n        <small style="color: #a9a9a9">Freezed&nbsp;</small>\n        <small style="color: #a9a9a9">Ƀc&nbsp;{{FreezedBCHbalance}}</small>\n        <!-- <h6 class="bold white-text">Freezed BTC balance : 0.012</h6> -->\n      </div>\n      <div class="col text-right">\n        <span class="crypto-icon">Ƀc&nbsp;</span><span class="font-25 ">{{BCHbalance}}</span>\n      </div>\n    </div>\n    \n  </ion-content>\n\n<ion-footer color="custom">\n\n   <div class="bar bar-footer footer-height light-blue darken-3 center valign-wrapper">\n    <div class="row no-margin footer-button-line-height white-text">\n      <div class="col-xl-3" style="margin-left: 46px" (click)="BuyBch()">\n        <ion-icon name="send"></ion-icon>&nbsp;Buy</div>\n      <div class="col-xl-3" style="margin-left: 150px" (click)="SellBch()">\n       <ion-icon name="person"></ion-icon>\n        &nbsp;Sell</div>\n    </div>\n  </div>\n</ion-footer>\n     \n     \n\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_9__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 163;

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WelcomePage = (function () {
    function WelcomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    WelcomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WelcomePage');
    };
    WelcomePage.prototype.login = function () {
        localStorage.setItem('firstVisit', '1');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    WelcomePage.prototype.signup = function () {
        localStorage.setItem('firstVisit', '1');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    return WelcomePage;
}());
WelcomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-welcome',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/welcome/welcome.html"*/'<!--\n  Generated template for the WelcomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n\n\n<ion-slides>\n  <ion-slide  class="light-blue darken-4 white-text">\n    \n        <h3 class="white-text font-lighter"><div class="onboarding-topic center font-lighter text-roboto"  translate>Bitcoin Cash is secure,<br/>digital money.</div></h3><br>\n        <div class="onboard-subtext padding">\n          <div class="center font-lighter text-roboto font-20 padding-top"  translate>You can spend bitcoin cash at millions of websites and stores worldwide.</div><br><br>\n          <div class="cta-buttons">\n            <div class="onboarding-tldr center font-lighter text-roboto font-20"  translate>Just scan the code to pay.</div>\n          </div>\n        </div>\n\n  </ion-slide>\n\n  <ion-slide class="light-blue darken-4 white-text">\n    <h3 class="white-text font-lighter padding-5"><div class="onboarding-topic center font-lighter text-roboto"  translate>Low Transaction<br>Fees</div></h3><br>\n        <div class="onboard-subtext padding">\n          <div class="onboarding-topic center font-lighter text-roboto font-20"  translate>You can trade, send, receive at very low network fees</div><br><br>\n        \n          <div class="cta-buttons">\n            <div class="onboarding-topic center font-lighter text-roboto font-20"  translate>The exchange bitcoin Cash from Bitcoin</div>         \n          </div>\n        </div>\n  </ion-slide>\n\n  <ion-slide padding class="light-blue darken-4 white-text">\n    <h3 class="white-text font-lighter"><div class="onboarding-topic center font-lighter text-roboto"  translate>Secure your Bitcoin Cash here!!</div></h3><br>\n       \n            <div class="onboarding-topic center font-lighter text-roboto font-20"  translate>BccPay enables your bitcoin cash with cutting-edge security.</div>\n              <div style="margin-top: 26px">\n                <button ion-button block color="lightprimary" (click)="login()">Sign In</button><br>\n                <button ion-button block color="lightprimary" (click)="signup()">Sign Up</button>\n              </div>\n       \n  </ion-slide>\n</ion-slides>'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/welcome/welcome.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], WelcomePage);

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BidcryptoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the BidcryptoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BidcryptoPage = BidcryptoPage_1 = (function () {
    function BidcryptoPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.email = {
            "userMailId": ""
        };
        this.currentUserBalance = {
            "ask": "",
            "bid": ""
        };
        this.bidCryptoAmount = {
            "bidAmountBTC": "",
            "bidAmountBCH": "",
            "bidRate": "",
            "bidownerId": "",
            "currentBidRateOfServer": "",
            "spendingPassword": ""
        };
        this.currentPrice();
        this.userdata();
    }
    BidcryptoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BidcryptoPage');
    };
    BidcryptoPage.prototype.currentPrice = function () {
        var _this = this;
        this._setupService.getBidCoin().subscribe(function (response) {
            console.log(JSON.stringify(response));
            if (response.statusCode == 200) {
                _this.currentUserBalance.ask = (response.currentPrice.ask).toFixed(5);
                _this.currentUserBalance.bid = (response.currentPrice.bid).toFixed(5);
                _this.ask = _this.currentUserBalance.ask;
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: "data fetch error!!",
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 5000
                });
                toast.present();
            }
        });
    };
    BidcryptoPage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this.BTCbalance = (this.user.user.BTCbalance).toFixed(5);
        this.BCHbalance = (this.user.user.BCHbalance).toFixed(5);
        this.FreezedBCHbalance = (this.user.user.FreezedBCHbalance).toFixed(5);
        this.FreezedBTCbalance = (this.user.user.FreezedBTCbalance).toFixed(5);
        this.userId = this.user.user.id;
    };
    BidcryptoPage.prototype.myFunc = function (a) {
        this.bidCryptoAmount.bidAmountBTC = a.toFixed(5);
    };
    ;
    BidcryptoPage.prototype.bidAmountAction = function () {
        var _this = this;
        this.bid = this.currentUserBalance.bid;
        this.bidRates = this.bidCryptoAmount.bidRate;
        this.bidCryptoAmount.bidownerId = this.userId;
        this.bidCryptoAmount.currentBidRateOfServer = this.currentUserBalance.bid;
        if (!this.bidCryptoAmount.bidAmountBCH || !this.bidCryptoAmount.bidRate || !this.bidCryptoAmount.bidAmountBTC) {
            var toast = this.toastCtrl.create({
                message: "field should be required!!",
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 5000
            });
            toast.present();
        }
        else if (this.bidCryptoAmount.bidAmountBTC >= this.BTCbalance) {
            var toast = this.toastCtrl.create({
                message: "Insufficient balance, Please Buy BCC!!",
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 5000
            });
            toast.present();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }
        else if (this.bid - this.bidRates >= 0.01) {
            var toast = this.toastCtrl.create({
                message: "Invalid rate, try after some time!!",
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 5000
            });
            toast.present();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }
        else {
            var prompt_1 = this.alertCtrl.create({
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
                        handler: function (data) {
                            _this.navCtrl.setRoot(BidcryptoPage_1);
                        }
                    },
                    {
                        text: 'submit',
                        handler: function (data) {
                            var loading = _this.loadingCtrl.create({
                                content: 'bidding please wait...'
                            });
                            loading.present();
                            _this.bidCryptoAmount.spendingPassword = data.spendingPassword;
                            _this._setupService.bidCryptoAmount(_this.bidCryptoAmount).subscribe(function (response) {
                                if (response.statusCode == 200) {
                                    localStorage.setItem('logindetail', JSON.stringify(response));
                                    _this.userdata();
                                    var toast = _this.toastCtrl.create({
                                        message: 'Bid Placed Successfully !!',
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    loading.dismiss();
                                    toast.present();
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                                }
                                else {
                                    loading.dismiss();
                                    var toast = _this.toastCtrl.create({
                                        message: response.message,
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    toast.present();
                                    _this.navCtrl.setRoot(BidcryptoPage_1);
                                }
                            });
                        }
                    }
                ],
                enableBackdropDismiss: false
            });
            prompt_1.present();
        }
    };
    return BidcryptoPage;
}());
BidcryptoPage = BidcryptoPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-bidcrypto',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/bidcrypto/bidcrypto.html"*/'<!--\n  Generated template for the BidcryptoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bid Bcc</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n\n<div class="light-blue darken-4 white-text padding">\n      <div class="row">\n        <h4 class="col s12 white-text text-roboto">{{BCHbalance}} Ƀc</h4>\n      </div>\n      <div class="row">\n        <span class="col s12 white-text text-roboto">{{BTCbalance}} Ƀ</span>\n        <span class="pull-right text-roboto">1 Ƀc={{currentUserBalance.ask}} Ƀ</span>\n      </div>\n    </div>\n    <form>\n      <div class="row no-margin ">\n        <div class="col-25 valign-wrapper">\n          <span class="valign-wrapper">Amount(BCC)</span>\n        </div>\n        <div class="col-75">\n          <div class="row no-margin trade">     \n            <input id="number" type="number" placeholder="0.00000" [(ngModel)]="bidCryptoAmount.bidAmountBCH" name="number" class="font-40 text-right no-border no-margin valign-wrapper">\n          </div>\n        </div>\n      </div>\n      <hr>\n      <div class="row no-margin">\n        <div class="col-25 valign-wrapper">\n          <span class="valign-wrapper">Bid Rate</span>\n        </div>\n        <div class="col-75">\n          <div class="row no-margin trade">\n          	<input id="number" type="number" placeholder="0.00000" [(ngModel)]="bidCryptoAmount.bidRate" (ngModelChange)="myFunc(bidCryptoAmount.bidAmountBCH *bidCryptoAmount.bidRate)" name="number" class="font-40 text-right no-border no-margin valign-wrapper" disabled="true">            \n          </div>\n\n        </div>\n      </div>\n      <hr>\n      <div class="row no-margin">\n        <div class="col-25 valign-wrapper">\n          <span class="valign-wrapper">Amount(BTC)</span>\n        </div>\n        <div class="col-75 ">\n          <div class="row no-margin trade">\n          	<input id="amount" type="number" placeholder="0.00000" value="{{bidCryptoAmount.bidAmountBTC }}" name="number" class="font-40 text-right no-border no-margin valign-wrapper">         \n          </div>\n        </div>\n      </div>\n      <hr>\n      <div class="row">\n        <div class="input-field col s12 center">\n          <button class="btn waves-effect waves-light light-blue darken-4 white-text" type="submit" name="action" (click)="bidAmountAction(bidCryptoAmount)">Confirm Bid\n                         <ion-icon name="send"></ion-icon>\n            </button>\n        </div>\n      </div>\n    </form>\n  </ion-content>'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/bidcrypto/bidcrypto.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], BidcryptoPage);

var BidcryptoPage_1;
//# sourceMappingURL=bidcrypto.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AskcryptoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the AskcryptoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AskcryptoPage = AskcryptoPage_1 = (function () {
    function AskcryptoPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.email = {
            "userMailId": ""
        };
        this.currentUserBalance = {
            "ask": "",
            "bid": ""
        };
        this.askCryptoAmount = {
            "askAmountBTC": "",
            "askAmountBCH": "",
            "askRate": "",
            "askownerId": "",
            "currentAskrateOfServer": "",
            "spendingPassword": ""
        };
        this.currentPrice();
        this.userdata();
    }
    AskcryptoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AskcryptoPage');
    };
    AskcryptoPage.prototype.currentPrice = function () {
        var _this = this;
        this._setupService.getBidCoin().subscribe(function (response) {
            console.log(JSON.stringify(response));
            if (response.statusCode == 200) {
                _this.currentUserBalance.ask = (response.currentPrice.ask).toFixed(5);
                _this.currentUserBalance.bid = (response.currentPrice.bid).toFixed(5);
                _this.ask = _this.currentUserBalance.ask;
            }
            else {
                console.log('no data found');
            }
        });
    };
    AskcryptoPage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this.BTCbalance = (this.user.user.BTCbalance).toFixed(5);
        this.BCHbalance = (this.user.user.BCHbalance).toFixed(5);
        this.FreezedBCHbalance = (this.user.user.FreezedBCHbalance).toFixed(5);
        this.FreezedBTCbalance = (this.user.user.FreezedBTCbalance).toFixed(5);
        this.userId = this.user.user.id;
    };
    AskcryptoPage.prototype.myFunc = function (a) {
        this.askCryptoAmount.askAmountBTC = a.toFixed(5);
        console.log(this.askCryptoAmount.askAmountBTC);
    };
    ;
    AskcryptoPage.prototype.askAmountAction = function () {
        var _this = this;
        this.ask = this.currentUserBalance.ask;
        this.askRates = this.askCryptoAmount.askRate;
        this.askCryptoAmount.askownerId = this.userId;
        this.askCryptoAmount.currentAskrateOfServer = this.currentUserBalance.ask;
        if (!this.askCryptoAmount.askAmountBCH || !this.askCryptoAmount.askRate || !this.askCryptoAmount.askAmountBTC) {
            var toast = this.toastCtrl.create({
                message: "field should be required!!",
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 5000
            });
            toast.present();
        }
        else if (this.askCryptoAmount.askAmountBCH >= this.BCHbalance) {
            var toast = this.toastCtrl.create({
                message: "Insufficient balance, Please Buy BCC!!",
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 5000
            });
            toast.present();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }
        else if (this.askRates - this.ask >= 0.01) {
            var toast = this.toastCtrl.create({
                message: "Invalid rate, try after some time!!",
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 5000
            });
            toast.present();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }
        else {
            var prompt_1 = this.alertCtrl.create({
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
                        handler: function (data) {
                            _this.navCtrl.setRoot(AskcryptoPage_1);
                        }
                    },
                    {
                        text: 'submit',
                        handler: function (data) {
                            var loading = _this.loadingCtrl.create({
                                content: 'asking  please wait...'
                            });
                            loading.present();
                            _this.askCryptoAmount.spendingPassword = data.spendingPassword;
                            _this._setupService.askCryptoAmount(_this.askCryptoAmount).subscribe(function (response) {
                                if (response.statusCode == 200) {
                                    localStorage.setItem('logindetail', JSON.stringify(response));
                                    _this.userdata();
                                    var toast = _this.toastCtrl.create({
                                        message: 'Ask Placed Successfully !!',
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    loading.dismiss();
                                    toast.present();
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                                }
                                else {
                                    loading.dismiss();
                                    var toast = _this.toastCtrl.create({
                                        message: response.message,
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    toast.present();
                                    _this.navCtrl.setRoot(AskcryptoPage_1);
                                }
                            });
                        }
                    }
                ],
                enableBackdropDismiss: false
            });
            prompt_1.present();
        }
    };
    return AskcryptoPage;
}());
AskcryptoPage = AskcryptoPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-askcrypto',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/askcrypto/askcrypto.html"*/'<!--\n  Generated template for the BidcryptoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Ask BCC</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n\n<div class="light-blue darken-4 white-text padding">\n      <div class="row">\n        <h4 class="col s12 white-text text-roboto">{{BCHbalance}} Ƀc</h4>\n      </div>\n      <div class="row">\n        <span class="col s12 white-text text-roboto">{{BTCbalance}} Ƀ</span>\n        <span class="pull-right text-roboto">1 Ƀc={{currentUserBalance.bid}} Ƀ</span>\n      </div>\n    </div>\n    <form>\n      <div class="row no-margin ">\n        <div class="col-25 valign-wrapper">\n          <span class="valign-wrapper">Amount(BCC)</span>\n        </div>\n        <div class="col-75">\n          <div class="row no-margin trade">\n           \n\n            <input id="number" type="number" placeholder="0.00000" [(ngModel)]="askCryptoAmount.askAmountBCH" name="number" class="font-40 text-right no-border no-margin valign-wrapper">\n          </div>\n\n        </div>\n      </div>\n      <hr>\n      <div class="row no-margin">\n        <div class="col-25 valign-wrapper">\n          <span class="valign-wrapper">Ask Rate</span>\n        </div>\n        <div class="col-75">\n          <div class="row no-margin trade">\n          	<input id="number" type="number" placeholder="0.00000" [(ngModel)]="askCryptoAmount.askRate" (ngModelChange)="myFunc(askCryptoAmount.askAmountBCH*askCryptoAmount.askRate)" name="number" class="font-40 text-right no-border no-margin valign-wrapper">            \n          </div>\n\n        </div>\n      </div>\n      <hr>\n      <div class="row no-margin">\n        <div class="col-25 valign-wrapper">\n          <span class="valign-wrapper">Amount(BTC)</span>\n        </div>\n        <div class="col-75 ">\n          <div class="row no-margin trade">\n          	<input id="amount" type="number" placeholder="0.00000" value="{{ askCryptoAmount.askAmountBTC }}" name="number" class="font-40 text-right no-border no-margin valign-wrapper" disabled="true">         \n          </div>\n        </div>\n      </div>\n      <hr>\n      <div class="row">\n        <div class="input-field col s12 center">\n          <button class="btn waves-effect waves-light light-blue darken-4 white-text" type="submit" name="action" (click)="askAmountAction(askCryptoAmount)">Confirm AsK\n            <ion-icon name="send"></ion-icon>\n            </button>\n        </div>\n      </div>\n    </form>\n  </ion-content>'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/askcrypto/askcrypto.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], AskcryptoPage);

var AskcryptoPage_1;
//# sourceMappingURL=askcrypto.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendbtcPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_clipboard__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { RequestbtcPage} from '../requestbtc/requestbtc';



/**
 * Generated class for the SendbtcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SendbtcPage = (function () {
    function SendbtcPage(navCtrl, barcodeScanner, alertCtrl, toastCtrl, _setupService, loadingCtrl, actionSheetCtrl, clipboard) {
        this.navCtrl = navCtrl;
        this.barcodeScanner = barcodeScanner;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.clipboard = clipboard;
        this.email = {
            "userMailId": ""
        };
        this.currentUserBalance = {
            "ask": "",
            "bid": ""
        };
        this.values = {
            "userMailId": "",
            "amount": "",
            "spendingPassword": "",
            "recieverBTCCoinAddress": "",
            "commentForReciever": "Comment for Reciever",
            "commentForSender": "Comment for sender"
        };
        this.data = {
            "address": "",
            "amount": ""
        };
        this.currentPrice();
        this.userdata();
    }
    SendbtcPage.prototype.currentPrice = function () {
        var _this = this;
        this._setupService.getBidCoin().subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.currentUserBalance.ask = response.currentPrice.ask;
                _this.currentUserBalance.bid = response.currentPrice.bid;
                _this.ask = _this.currentUserBalance.ask;
            }
            else {
                console.log("no data found ... ");
            }
        });
        this.footer = false;
        this.fabButton = true;
    };
    SendbtcPage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this.BTCbalance = this.user.user.BTCbalance;
        this.BCHbalance = this.user.user.BCHbalance;
        this.FreezedBCHbalance = this.user.user.FreezedBCHbalance;
        this.FreezedBTCbalance = this.user.user.FreezedBTCbalance;
        this.userBTCAddress = this.user.user.userBTCAddress;
        this.userId = this.user.user.id;
    };
    SendbtcPage.prototype.showConfirm = function () {
        var _this = this;
        var btcAddress = this.userBTCAddress;
        console.log("btcaddress = =" + this.userBTCAddress);
        var alert = this.alertCtrl.create({
            title: '<div class="center" >My BTC Address</div>',
            subTitle: '<div class="center" (click)="copyAddress()"> <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=' + btcAddress + '"  alt="QR Code" style="width: 80%;" ></div><div class="center">' + btcAddress + '<div>',
            buttons: [
                {
                    text: 'copy',
                    handler: function (data) {
                        _this.clipboard.copy(btcAddress);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log("hello");
                    }
                },
            ]
        });
        alert.present();
    };
    SendbtcPage.prototype.sendBTCCoinByUser = function () {
        var _this = this;
        if (!this.values.recieverBTCCoinAddress || !this.values.amount) {
            var toast = this.toastCtrl.create({
                message: 'field should be required!!',
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 5000
            });
            toast.present();
        }
        else {
            var prompt_1 = this.alertCtrl.create({
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
                        handler: function (data) {
                            console.log("hello");
                        }
                    },
                    {
                        text: 'submit',
                        handler: function (data) {
                            var loading = _this.loadingCtrl.create({
                                content: 'transaction is in progress...'
                            });
                            loading.present();
                            _this.values.userMailId = _this.email.userMailId;
                            _this.values.spendingPassword = data.spendingPassword;
                            _this._setupService.sendBTCCoinByUser(_this.values).subscribe(function (response) {
                                if (response.statusCode == 200) {
                                    localStorage.setItem('logindetail', JSON.stringify(response));
                                    _this.userdata();
                                    var toast = _this.toastCtrl.create({
                                        message: 'Transaction Successfully !!',
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    loading.dismiss();
                                    toast.present();
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                                }
                                else {
                                    loading.dismiss();
                                    var toast = _this.toastCtrl.create({
                                        message: response.message,
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    toast.present();
                                }
                            });
                        }
                    }
                ],
                enableBackdropDismiss: false
            });
            prompt_1.present();
        }
    };
    SendbtcPage.prototype.scanBarCode = function () {
        var _this = this;
        this.fabButton = false;
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.getImageData = barcodeData.text;
            if (_this.getImageData.indexOf(",") > 0) {
                _this.codeArray = _this.getImageData.split(',');
                _this.values.recieverBTCCoinAddress = _this.codeArray[0].replace(/bitcoin:|bitcoin=|btc:|btc=|btcaddress:|btcaddress=|btcaddress:|btcaddress=/g, "").trim();
                _this.values.amount = _this.codeArray[1].replace(/amount:|amount=/g, "").trim();
            }
            else if (_this.getImageData.indexOf(":") > 0 || _this.getImageData.indexOf("=") > 0) {
                _this.codeArray = _this.getImageData;
                _this.values.recieverBTCCoinAddress = _this.codeArray.replace(/bitcoin:|bitcoin=|btc:|btc=|btcaddress:|btcaddress=|btcaddress:|btcaddress=/g, "").trim();
            }
            else {
                _this.values.recieverBTCCoinAddress = _this.getImageData;
            }
        }, function (err) {
            console.log("An error happened -> " + err);
        });
    };
    return SendbtcPage;
}());
SendbtcPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-sendbtc',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/sendbtc/sendbtc.html"*/'<!--\n  Generated template for the SendbtcPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Send BTC</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content >\n<div class="light-blue darken-4 white-text padding">\n      <div class="row">\n        <h4 class="col white-text no-margin text-roboto"><span class="crypto-icon crypto-vault-symbol">Ƀ&nbsp;</span>{{BTCbalance}}</h4>\n        <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl={{userBTCAddress}}" alt="QR Code" style="height: 10%; width: 10%;" (click)="showConfirm()">\n      </div>\n      <div class="row no-margin">\n        <div class="col col-66  white-text">\n          <small style="color: #a9a9a9">Freezed BTC Balance </small><br><span class="">Ƀ&nbsp;</span>{{FreezedBTCbalance}}\n        </div>\n      </div>\n    </div>\n    <div class="row padding">\n      <form class="col s12 center">\n\n        <div class="row">\n          <div class="input-field col s12">\n          	 <input id="address" type="text" placeholder="Address" [(ngModel)]="values.recieverBTCCoinAddress" name="address">            \n          </div>\n        </div>\n        <div class="row">\n          <div class="input-field col s12">\n          	 <input id="amount" type="text" placeholder="Amount" [(ngModel)]="values.amount" name="amount">              \n          </div>\n        </div>\n        <button class="btn waves-effect waves-light light-blue darken-4 white-text" type="submit" name="action" (click)="sendBTCCoinByUser(values)">Submit\n          <ion-icon name="send"></ion-icon>\n          </button>\n      </form>\n    </div>  \n\n   <ion-fab  right bottom *ngIf="fabButton">\n     <button ion-fab mini (click)=scanBarCode()><ion-icon name="camera"></ion-icon></button>   \n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/sendbtc/sendbtc.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_clipboard__["a" /* Clipboard */]])
], SendbtcPage);

//# sourceMappingURL=sendbtc.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestbtcPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { SendbtcPage } from'../sendbtc/sendbtc';
//import { HomePage } from '../home/home';

/**
 * Generated class for the RequestbtcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RequestbtcPage = (function () {
    function RequestbtcPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl, actionSheetCtrl, sharingVar) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.sharingVar = sharingVar;
        this.requestAmountBTC = 0;
        this.email = {
            "userMailId": ""
        };
        this.currentUserBalance = {
            "ask": "",
            "bid": ""
        };
        this.currentPrice();
        this.userdata();
        //this.requestAmountBTC=0;
    }
    RequestbtcPage.prototype.currentPrice = function () {
        var _this = this;
        this._setupService.getBidCoin().subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.currentUserBalance.ask = response.currentPrice.ask;
                _this.currentUserBalance.bid = response.currentPrice.bid;
                _this.ask = _this.currentUserBalance.ask;
            }
            else {
                console.log("no data found");
            }
        });
        this.footer = false;
        this.fabButton = true;
    };
    RequestbtcPage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this.BTCbalance = this.user.user.BTCbalance;
        this.BCHbalance = this.user.user.BCHbalance;
        this.FreezedBCHbalance = this.user.user.FreezedBCHbalance;
        this.FreezedBTCbalance = this.user.user.FreezedBTCbalance;
        this.userBTCAddress = this.user.user.userBTCAddress;
        this.userId = this.user.user.id;
    };
    RequestbtcPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RequestbtcPage');
    };
    RequestbtcPage.prototype.shareBTCRequest = function (address) {
        var _this = this;
        //alert("address = ="+address);
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Share address Via',
            buttons: [
                {
                    text: 'whatsapp',
                    role: 'destructive',
                    handler: function () {
                        _this.whatsUpShare(address);
                    }
                }, {
                    text: 'facebook',
                    role: 'destructive',
                    handler: function () {
                        _this.facebookShare(address);
                    }
                }, {
                    text: 'message',
                    role: 'destructive',
                    handler: function () {
                        _this.messageShare(address);
                    }
                },
                {
                    text: 'email',
                    role: 'destructive',
                    handler: function () {
                        _this.emailShare(address);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    RequestbtcPage.prototype.whatsUpShare = function (address) {
        console.log("address = =" + address);
        this.sharingVar.shareViaWhatsApp(address, null /* img */, null /* url */).then(function (data) {
            console.log('Shared via whatsup');
        })
            .catch(function (err) {
            console.log('Was not shared via whatsup');
        });
    };
    RequestbtcPage.prototype.facebookShare = function (address) {
        this.sharingVar.shareViaFacebook(address, null /* img */, null /* url */).then(function (data) {
            console.log('Shared via Facebook');
        })
            .catch(function (err) {
            console.log('Was not shared via Facebook');
        });
    };
    RequestbtcPage.prototype.messageShare = function (address) {
        this.sharingVar.shareViaSMS(address, null /* img */).then(function (data) {
            console.log('Shared via sms');
        })
            .catch(function (err) {
            console.log('Was not shared via sms');
        });
    };
    RequestbtcPage.prototype.emailShare = function (address) {
        this.sharingVar.shareViaEmail(address, null /* img */, null /* url */).then(function (data) {
            console.log('Shared via email');
        })
            .catch(function (err) {
            console.log('Was not shared via email');
        });
    };
    RequestbtcPage.prototype.myRequestFunc = function (a) {
        this.requestAmountBTC = a;
    };
    return RequestbtcPage;
}());
RequestbtcPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-requestbtc',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/requestbtc/requestbtc.html"*/'<!--\n  Generated template for the RequestbtcPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Request BTC</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n	 <div class="row center">\n\n      <div class="col center">\n        <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=bitcoin:{{userBTCAddress}},amount:{{requestAmountBTC}}" alt="QR Code">\n        <div class="">\n          <span>{{userBTCAddress}}\n                        </span>\n        </div>\n\n      </div>\n\n    </div>\n    <div class="row padding">\n      <div  class="input-field col s12">\n                                   \n           <input type="number" [(ngModel)]="requestAmountBTC" (ngModelChange)="myRequestFunc(requestAmountBTC)" placeholder="Amount(BTC)">\n          \n      </div>\n    </div>\n    <div class="center">\n      <a class="btn-floating btn-large waves-effect center waves-light light-blue darken-4 center" (click)="shareBTCRequest(\'bitcoin:\'+userBTCAddress+\',amount:\'+requestAmountBTC)"><ion-icon name="share"></ion-icon></a>\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/requestbtc/requestbtc.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */]])
], RequestbtcPage);

//# sourceMappingURL=requestbtc.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BtcsenttransactionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__btcvault_btcvault__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the BtcsenttransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BtcsenttransactionPage = (function () {
    function BtcsenttransactionPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.email = {
            "userMailId": ""
        };
        this.userdata();
    }
    BtcsenttransactionPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__btcvault_btcvault__["a" /* BtcvaultPage */]);
    };
    BtcsenttransactionPage.prototype.userdata = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this._setupService.getBTCTransactions(this.email).subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.transactionData = response.tx;
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: response.message,
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 5000
                });
                toast.present();
            }
        });
    };
    BtcsenttransactionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BtcsenttransactionPage');
    };
    return BtcsenttransactionPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
], BtcsenttransactionPage.prototype, "nav", void 0);
BtcsenttransactionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-btcsenttransaction',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/btcsenttransaction/btcsenttransaction.html"*/'<!--\n  Generated template for the BtcsenttransactionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Sent BTC</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content >\n      <div *ngFor="let item of transactionData" >\n        <div *ngIf="item.category == \'send\'" class="card white-text orange lighten-1 margin padding">\n          <div class="row no-margin">\n            <span class="font-lighter">To:&nbsp;{{item.address}}</span><br>\n          </div>\n          <div class="row no-margin">\n            <div class="col-50 ">\n              <small class="valign-wrapper"><em>{{item.time* 1000 | date:\'dd-MM-yy HH:mm\'}}</em></small>\n              <a class="white-text" ng-click="transDetails(all.txid)">see details</a>\n            </div>\n            <div class="col-50 no-margin">\n              <div class="pull-right">\n                <span class="crypto-icon">Ƀ&nbsp;</span><span class="font-25">{{item.amount}}</span>\n              </div>\n            </div>\n          </div>\n        </div>\n     </div>  \n</ion-content>\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/btcsenttransaction/btcsenttransaction.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], BtcsenttransactionPage);

//# sourceMappingURL=btcsenttransaction.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BtcreceivedtransactionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { HomePage } from '../home/home';
/**
 * Generated class for the BtcsenttransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BtcreceivedtransactionPage = (function () {
    function BtcreceivedtransactionPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.email = {
            "userMailId": ""
        };
        this.userdata();
    }
    BtcreceivedtransactionPage.prototype.userdata = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this._setupService.getBTCTransactions(this.email).subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.transactionData = response.tx;
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: response.message,
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 5000
                });
                toast.present();
            }
        });
    };
    BtcreceivedtransactionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BtcsenttransactionPage');
    };
    return BtcreceivedtransactionPage;
}());
BtcreceivedtransactionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-btcreceivedtransaction',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/btcreceivedtransaction/btcreceivedtransaction.html"*/'\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Received BTC</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content >\n      <div *ngFor="let item of transactionData" >\n        <div *ngIf="item.category == \'receive\'" class="card white-text blue lighten-1 margin padding">\n          <div class="row no-margin">\n            <span class="font-lighter">To:&nbsp;{{item.address}}</span><br>\n          </div>\n          <div class="row no-margin">\n            <div class="col-50 ">\n              <small class="valign-wrapper"><em>{{item.time* 1000 | date:\'dd-MM-yy HH:mm\'}}</em></small>\n              <a class="white-text" ng-click="transDetails(all.txid)">see details</a>\n            </div>\n            <div class="col-50 no-margin">\n              <div class="pull-right">\n                <span class="crypto-icon">Ƀ&nbsp;</span><span class="font-25">{{item.amount}}</span>\n              </div>\n            </div>\n          </div>\n        </div>\n     </div>  \n</ion-content>\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/btcreceivedtransaction/btcreceivedtransaction.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], BtcreceivedtransactionPage);

//# sourceMappingURL=btcreceivedtransaction.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendcryptoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_clipboard__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { RequestcryptoPage} from '../requestcrypto/requestcrypto';



var SendcryptoPage = (function () {
    function SendcryptoPage(navCtrl, barcodeScanner, alertCtrl, toastCtrl, _setupService, loadingCtrl, actionSheetCtrl, clipboard) {
        this.navCtrl = navCtrl;
        this.barcodeScanner = barcodeScanner;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.clipboard = clipboard;
        this.email = {
            "userMailId": ""
        };
        this.currentUserBalance = {
            "ask": "",
            "bid": ""
        };
        this.values = {
            "userMailId": "",
            "amount": "",
            "spendingPassword": "",
            "recieverBCHCoinAddress": "",
            "commentForReciever": "Comment for Reciever",
            "commentForSender": "Comment for sender"
        };
        this.data = {
            "address": "",
            "amount": ""
        };
        this.currentPrice();
        this.userdata();
    }
    SendcryptoPage.prototype.currentPrice = function () {
        var _this = this;
        this._setupService.getBidCoin().subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.currentUserBalance.ask = response.currentPrice.ask;
                _this.currentUserBalance.bid = response.currentPrice.bid;
                _this.ask = _this.currentUserBalance.ask;
            }
            else {
                console.log("no data found ... ");
            }
        });
        this.footer = false;
        this.fabButton = true;
    };
    SendcryptoPage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this.BTCbalance = this.user.user.BTCbalance;
        this.BCHbalance = this.user.user.BCHbalance;
        this.FreezedBCHbalance = this.user.user.FreezedBCHbalance;
        this.FreezedBTCbalance = this.user.user.FreezedBTCbalance;
        this.userBCHAddress = this.user.user.userBCHAddress;
        this.userId = this.user.user.id;
    };
    SendcryptoPage.prototype.showConfirm = function () {
        var _this = this;
        var bchAddress = this.userBCHAddress;
        console.log("btcaddress = =" + this.userBCHAddress);
        var alert = this.alertCtrl.create({
            title: '<div class="center" >My BCH Address</div>',
            subTitle: '<div class="center" (click)="copyAddress()"> <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=' + bchAddress + '"  alt="QR Code" style="width: 80%;" ></div><div class="center">' + bchAddress + '<div>',
            buttons: [
                {
                    text: 'copy',
                    handler: function (data) {
                        _this.clipboard.copy(bchAddress);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log("hello");
                    }
                },
            ]
        });
        alert.present();
    };
    SendcryptoPage.prototype.sendCryptoCoinByUser = function () {
        var _this = this;
        if (!this.values.recieverBCHCoinAddress || !this.values.amount) {
            var toast = this.toastCtrl.create({
                message: 'field should be required!!',
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 5000
            });
            toast.present();
        }
        else {
            var prompt_1 = this.alertCtrl.create({
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
                        handler: function (data) {
                            console.log("hello");
                        }
                    },
                    {
                        text: 'submit',
                        handler: function (data) {
                            var loading = _this.loadingCtrl.create({
                                content: 'transaction is in progress...'
                            });
                            loading.present();
                            _this.values.userMailId = _this.email.userMailId;
                            _this.values.spendingPassword = data.spendingPassword;
                            _this._setupService.sendBCHCoinByUser(_this.values).subscribe(function (response) {
                                if (response.statusCode == 200) {
                                    localStorage.setItem('logindetail', JSON.stringify(response));
                                    _this.userdata();
                                    var toast = _this.toastCtrl.create({
                                        message: 'Transaction Successfully !!',
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    loading.dismiss();
                                    toast.present();
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                                }
                                else {
                                    loading.dismiss();
                                    var toast = _this.toastCtrl.create({
                                        message: response.message,
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    toast.present();
                                }
                            });
                        }
                    }
                ],
                enableBackdropDismiss: false
            });
            prompt_1.present();
        }
    };
    SendcryptoPage.prototype.scanBarCode = function () {
        var _this = this;
        this.fabButton = false;
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.getImageData = barcodeData.text;
            if (_this.getImageData.indexOf(",") > 0) {
                _this.codeArray = _this.getImageData.split(',');
                _this.values.recieverBCHCoinAddress = _this.codeArray[0].replace(/bitcoincash:|bitcoincash=|bch:|bch=|bcc:|bcc=|bchaddress:|bchaddress=|bccaddress:|bccaddress=/g, "").trim();
                _this.values.amount = _this.codeArray[1].replace(/amount:|amount=/g, "").trim();
            }
            else if (_this.getImageData.indexOf(":") > 0 || _this.getImageData.indexOf("=") > 0) {
                _this.codeArray = _this.getImageData;
                _this.values.recieverBCHCoinAddress = _this.codeArray.replace(/bitcoincash:|bitcoincash=|bch:|bch=|bcc:|bcc=|bchaddress:|bchaddress=|bccaddress:|bccaddress=/g, "").trim();
            }
            else {
                _this.values.recieverBCHCoinAddress = _this.getImageData;
            }
        }, function (err) {
            console.log("An error happened -> " + err);
        });
    };
    return SendcryptoPage;
}());
SendcryptoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-sendcrypto',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/sendcrypto/sendcrypto.html"*/'\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Send BCH</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content >\n<div class="light-blue darken-4 white-text padding">\n      <div class="row">\n        <h4 class="col white-text no-margin text-roboto"><span class="crypto-icon crypto-vault-symbol">Ƀ&nbsp;</span>{{BCHbalance}}</h4>\n        <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl={{userBCHAddress}}" alt="QR Code" style="height: 10%; width: 10%;" (click)="showConfirm()">\n      </div>\n      <div class="row no-margin">\n        <div class="col col-66  white-text">\n          <small style="color: #a9a9a9">Freezed BCH Balance </small><br><span class="">Ƀ&nbsp;</span>{{FreezedBCHbalance}}\n        </div>\n      </div>\n    </div>\n    <div class="row padding">\n      <form class="col s12 center">\n\n        <div class="row">\n          <div class="input-field col s12">\n          	 <input id="address" type="text" placeholder="Address" [(ngModel)]="values.recieverBCHCoinAddress" name="address">            \n          </div>\n        </div>\n        <div class="row">\n          <div class="input-field col s12">\n          	 <input id="amount" type="text" placeholder="Amount" [(ngModel)]="values.amount" name="amount">              \n          </div>\n        </div>\n        <button class="btn waves-effect waves-light light-blue darken-4 white-text" type="submit" name="action" (click)="sendCryptoCoinByUser(values)">Submit\n           <ion-icon name="send"></ion-icon>\n          </button>\n      </form>\n    </div>  \n\n   <ion-fab  right bottom *ngIf="fabButton">\n     <button ion-fab mini (click)=scanBarCode()><ion-icon name="camera"></ion-icon></button>   \n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/sendcrypto/sendcrypto.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_clipboard__["a" /* Clipboard */]])
], SendcryptoPage);

//# sourceMappingURL=sendcrypto.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestcryptoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { SendbtcPage } from'../sendbtc/sendbtc';
//import { HomePage } from '../home/home';

/**
 * Generated class for the RequestcryptoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RequestcryptoPage = (function () {
    function RequestcryptoPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl, actionSheetCtrl, sharingVar) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.sharingVar = sharingVar;
        this.requestAmountBCH = 0;
        this.email = {
            "userMailId": ""
        };
        this.currentUserBalance = {
            "ask": "",
            "bid": ""
        };
        this.currentPrice();
        this.userdata();
        //this.requestAmountBTC=0;
    }
    RequestcryptoPage.prototype.currentPrice = function () {
        var _this = this;
        this._setupService.getBidCoin().subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.currentUserBalance.ask = response.currentPrice.ask;
                _this.currentUserBalance.bid = response.currentPrice.bid;
                _this.ask = _this.currentUserBalance.ask;
            }
            else {
                console.log("no data found ... ");
            }
        });
        this.footer = false;
        this.fabButton = true;
    };
    RequestcryptoPage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this.BTCbalance = this.user.user.BTCbalance;
        this.BCHbalance = this.user.user.BCHbalance;
        this.FreezedBCHbalance = this.user.user.FreezedBCHbalance;
        this.FreezedBTCbalance = this.user.user.FreezedBTCbalance;
        this.userBCHAddress = this.user.user.userBCHAddress;
        this.userId = this.user.user.id;
    };
    RequestcryptoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RequestbtcPage');
    };
    RequestcryptoPage.prototype.shareBCHRequest = function (address) {
        var _this = this;
        console.log("address = =" + address);
        //alert("address = ="+address);
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Share address Via',
            buttons: [
                {
                    text: 'whatsapp',
                    role: 'destructive',
                    handler: function () {
                        _this.whatsUpShare(address);
                    }
                }, {
                    text: 'facebook',
                    role: 'destructive',
                    handler: function () {
                        _this.facebookShare(address);
                    }
                }, {
                    text: 'message',
                    role: 'destructive',
                    handler: function () {
                        _this.messageShare(address);
                    }
                },
                {
                    text: 'email',
                    role: 'destructive',
                    handler: function () {
                        _this.emailShare(address);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    RequestcryptoPage.prototype.whatsUpShare = function (address) {
        console.log("address = =" + address);
        this.sharingVar.shareViaWhatsApp(address, null /* img */, null /* url */).then(function (data) {
            console.log('Shared via whatsup');
        })
            .catch(function (err) {
            console.log('Was not shared via whatsup');
        });
    };
    RequestcryptoPage.prototype.facebookShare = function (address) {
        this.sharingVar.shareViaFacebook(address, null /* img */, null /* url */).then(function (data) {
            console.log('Shared via Facebook');
        })
            .catch(function (err) {
            console.log('Was not shared via Facebook');
        });
    };
    RequestcryptoPage.prototype.messageShare = function (address) {
        this.sharingVar.shareViaSMS(address, null /* img */).then(function (data) {
            console.log('Shared via sms');
        })
            .catch(function (err) {
            console.log('Was not shared via sms');
        });
    };
    RequestcryptoPage.prototype.emailShare = function (address) {
        this.sharingVar.shareViaEmail(address, null /* img */, null /* url */).then(function (data) {
            console.log('Shared via email');
        })
            .catch(function (err) {
            console.log('Was not shared via email');
        });
    };
    RequestcryptoPage.prototype.myRequestFunc = function (a) {
        this.requestAmountBCH = a;
    };
    return RequestcryptoPage;
}());
RequestcryptoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-requestcrypto',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/requestcrypto/requestcrypto.html"*/'<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Request BCH</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n	 <div class="row center">\n\n      <div class="col center">\n        <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=bitcoin:{{userBCHAddress}},amount:{{requestAmountBCH}}" alt="QR Code">\n        <div class="">\n          <span>{{userBCHAddress}}\n                        </span>\n        </div>\n\n      </div>\n\n    </div>\n    <div class="row padding">\n      <div  class="input-field col s12">\n                                   \n           <input type="number" [(ngModel)]="requestAmountBCH" (ngModelChange)="myRequestFunc(requestAmountBCH)" placeholder="Amount(BTC)">\n          \n      </div>\n    </div>\n    <div class="center">\n      <a class="btn-floating btn-large waves-effect center waves-light light-blue darken-4 center" (click)="shareBCHRequest(\'bitcoincash:\'+userBCHAddress+\',amount:\'+requestAmountBCH)"><ion-icon name="share"></ion-icon></a>\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/requestcrypto/requestcrypto.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */]])
], RequestcryptoPage);

//# sourceMappingURL=requestcrypto.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptosenttransactionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { HomePage } from '../home/home';
/**
 * Generated class for the CryptosenttransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CryptosenttransactionPage = (function () {
    function CryptosenttransactionPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.email = {
            "userMailId": ""
        };
        this.userdata();
    }
    CryptosenttransactionPage.prototype.userdata = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this._setupService.getBCHTransactions(this.email).subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.transactionData = response.tx;
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: response.message,
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 5000
                });
                toast.present();
            }
        });
    };
    return CryptosenttransactionPage;
}());
CryptosenttransactionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-cryptosenttransaction',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/cryptosenttransaction/cryptosenttransaction.html"*/'\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Sent BCH</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content >\n      <div *ngFor="let item of transactionData" >\n        <div *ngIf="item.category == \'send\'" class="card white-text orange lighten-1 margin padding">\n          <div class="row no-margin">\n            <span class="font-lighter">To:&nbsp;{{item.address}}</span><br>\n          </div>\n          <div class="row no-margin">\n            <div class="col-50 ">\n              <small class="valign-wrapper"><em>{{item.time* 1000 | date:\'dd-MM-yy HH:mm\'}}</em></small>\n              <a class="white-text" ng-click="transDetails(all.txid)">see details</a>\n            </div>\n            <div class="col-50 no-margin">\n              <div class="pull-right">\n                <span class="crypto-icon">Ƀ&nbsp;</span><span class="font-25">{{item.amount}}</span>\n              </div>\n            </div>\n          </div>\n        </div>\n     </div>  \n</ion-content>\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/cryptosenttransaction/cryptosenttransaction.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], CryptosenttransactionPage);

//# sourceMappingURL=cryptosenttransaction.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoreceivedtransactionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { HomePage } from '../home/home';
/**
 * Generated class for the CryptoreceivedtransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CryptoreceivedtransactionPage = (function () {
    function CryptoreceivedtransactionPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.email = {
            "userMailId": ""
        };
        this.userdata();
    }
    CryptoreceivedtransactionPage.prototype.userdata = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this._setupService.getBCHTransactions(this.email).subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.transactionData = response.tx;
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: response.message,
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 5000
                });
                toast.present();
            }
        });
    };
    return CryptoreceivedtransactionPage;
}());
CryptoreceivedtransactionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-cryptoreceivedtransaction',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/cryptoreceivedtransaction/cryptoreceivedtransaction.html"*/'\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Received BCH</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content >\n      <div *ngFor="let item of transactionData" >\n        <div *ngIf="item.category == \'receive\'" class="card white-text blue lighten-1 margin padding">\n          <div class="row no-margin">\n            <span class="font-lighter">To:&nbsp;{{item.address}}</span><br>\n          </div>\n          <div class="row no-margin">\n            <div class="col-50 ">\n              <small class="valign-wrapper"><em>{{item.time* 1000 | date:\'dd-MM-yy HH:mm\'}}</em></small>\n              <a class="white-text" ng-click="transDetails(all.txid)">see details</a>\n            </div>\n            <div class="col-50 no-margin">\n              <div class="pull-right">\n                <span class="crypto-icon">Ƀ&nbsp;</span><span class="font-25">{{item.amount}}</span>\n              </div>\n            </div>\n          </div>\n        </div>\n     </div>  \n</ion-content>'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/cryptoreceivedtransaction/cryptoreceivedtransaction.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], CryptoreceivedtransactionPage);

//# sourceMappingURL=cryptoreceivedtransaction.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuysellcryptotransactionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { HomePage } from '../home/home';
/**
 * Generated class for the BuysellcryptotransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BuysellcryptotransactionPage = (function () {
    function BuysellcryptotransactionPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.email = {
            "userMailId": ""
        };
        this.userdata();
    }
    BuysellcryptotransactionPage.prototype.userdata = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this._setupService.getBCHTransactions(this.email).subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.transactionData = response.tx;
                _this.category = response.tx.category;
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: response.message,
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 5000
                });
                toast.present();
            }
        });
    };
    return BuysellcryptotransactionPage;
}());
BuysellcryptotransactionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-buysellcryptotransaction',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/buysellcryptotransaction/buysellcryptotransaction.html"*/'\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Buy/Sell Orders</ion-title>\n  </ion-navbar>\n</ion-header>\n\n    <ion-content class="white">\n      <div *ngFor="let item of transactionData ">\n        <div *ngIf="category == \'move\' && item.amount < 0" class="card  white-text blue lighten-1 margin padding-left padding-right">\n          <div class="row no-margin">\n            <span class=" white-text font-lighter">Sell</span><br>\n          </div>\n          <div class="row no-margin">\n            <div class="col-50 valign-wrapper">\n              <h6 class="valign-wrapper  white-text">{{item.time* 1000 | date:\'dd-MM-yy HH:mm\'}}</h6>\n            </div>\n            <div class="col-50 no-margin">\n              <span class="font-20 white-text pull-right">{{item.amount}} BCC</span>\n            </div>\n          </div>\n        </div>\n\n        <div *ngIf="category == \'move\' && item.amount > 0" class="card white-text orange lighten-1 margin padding-left padding-right">\n          <div class="row no-margin">\n            <span class="font-lighter white-text ">Buy</span><br>\n          </div>\n          <div class="row no-margin">\n            <div class="col-50 valign-wrapper">\n              <h6 class="valign-wrapper white-text ">{{item.time* 1000 | date:\'dd-MM-yy HH:mm\'}}</h6>\n            </div>\n            <div class="col-50 no-margin">\n              <span class="font-20 white-text  pull-right">{{item.amount}} BCC</span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div *ngIf="category != \'receive\'" style="margin-top: 100px;">\n        <img src="../../img/empty.jpg" width="100%" class="pull-left">\n      </div>\n    </ion-content>\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/buysellcryptotransaction/buysellcryptotransaction.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], BuysellcryptotransactionPage);

//# sourceMappingURL=buysellcryptotransaction.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__changepassword_changepassword__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ForgotPasswordPage = (function () {
    function ForgotPasswordPage(navCtrl, toastCtrl, menuCtrl, navParams, alertCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.user = {
            "userMailId": ""
        };
        this.otpvalue = {
            "userMailId": "",
            "otp": ""
        };
    }
    ForgotPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    ForgotPasswordPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menuCtrl.enable(false);
    };
    ForgotPasswordPage.prototype.forgotPassword = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'sending otp in your mailId...'
        });
        loading.present();
        this._setupService.forgotPassword(this.user).subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.responseData = response;
                loading.dismiss();
                localStorage.setItem('ResponseData', JSON.stringify(response));
                var toast = _this.toastCtrl.create({
                    message: 'OTP sent to your email id',
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 5000
                });
                toast.present();
                var prompt_1 = _this.alertCtrl.create({
                    title: 'One Time Password',
                    inputs: [
                        {
                            name: 'otp',
                            type: 'password',
                            placeholder: 'One Time Password'
                        }
                    ],
                    buttons: [
                        {
                            text: 'Cancel',
                            handler: function (data) {
                            }
                        },
                        {
                            text: 'submit',
                            handler: function (data) {
                                var loading = _this.loadingCtrl.create({
                                    content: 'verifying otp...'
                                });
                                loading.present();
                                _this._setupService.forgotPasswordOTP({ "userMailId": response.userMailId, "otp": data.otp
                                }).subscribe(function (response) {
                                    if (response.statusCode == 200) {
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__changepassword_changepassword__["a" /* ChangepasswordPage */]);
                                        loading.dismiss();
                                    }
                                    else {
                                        var toast_1 = _this.toastCtrl.create({
                                            message: response.message,
                                            showCloseButton: true,
                                            closeButtonText: 'Ok',
                                            duration: 5000
                                        });
                                        toast_1.present();
                                        loading.dismiss();
                                    }
                                });
                            }
                        }
                    ],
                    enableBackdropDismiss: false
                });
                prompt_1.present();
            }
            else {
                _this.responseData = response;
                var toast = _this.toastCtrl.create({
                    message: _this.responseData.message,
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 5000
                });
                toast.present();
                loading.dismiss();
            }
        });
    };
    ForgotPasswordPage.prototype.login = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    ForgotPasswordPage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    return ForgotPasswordPage;
}());
ForgotPasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-forgotPassword',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/forgotPassword/forgotPassword.html"*/'<ion-content class="light-blue darken-4 white-text">\n\n    <div class="logo center padding-top">\n\n      <h1 class="white-text font-lighter">Bccpay</h1>\n\n    </div>\n\n    <div class="padding-top padding-left">\n\n      <h4 class="white-text font-lighter">Forgot Password?, <br>don\'t worry</h4>\n\n    </div>\n\n<form class="col s12 center">\n\n      <div class="row">\n\n        <div class="custom-input-focus-color input-field col s12">\n\n         \n\n          <input id="email" type="text" value="" placeholder="Email" [(ngModel)]="user.userMailId" class="white-text" name="email">\n\n         <!--  <label for="address">Email</label> -->\n\n        </div>\n\n      </div>\n\n<button class="btn waves-effect waves-light primarytext-color " type="submit" name="action" (click)="forgotPassword(user)">Reset Password\n\n       <ion-icon name="send"></ion-icon>\n\n      </button>\n\n    </form>\n\n    <div class="row center">\n\n      <span class="col center white-text">Already Have Account? <a class="white-text" (click)="login()">Login !</a></span>\n\n    </div>\n\n    <div class="row center">\n\n      <span class="col center white-text">Don\'t Have Account? <a class="white-text" (click)="signup()">Signup !</a></span>\n\n    </div>\n\n     </ion-content>'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/forgotPassword/forgotPassword.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], ForgotPasswordPage);

//# sourceMappingURL=forgotPassword.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangepasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChangepasswordPage = (function () {
    function ChangepasswordPage(navCtrl, toastCtrl, menuCtrl, alertCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.newPasswordvalue = {
            "userMailId": "",
            "newPassword": "",
            "confirmNewPassword": ""
        };
        this.userdata();
    }
    ChangepasswordPage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('ResponseData'));
        this.newPasswordvalue.userMailId = this.user.userMailId;
    };
    ChangepasswordPage.prototype.changecurrentPassword = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'updating current password...'
        });
        loading.present();
        this._setupService.updateForgotPassord(this.newPasswordvalue).subscribe(function (response) {
            if (response.statusCode == 200) {
                loading.dismiss();
                var toast = _this.toastCtrl.create({
                    message: 'Password update successfully',
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 5000
                });
                toast.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
            }
            else {
                loading.dismiss();
                var toast = _this.toastCtrl.create({
                    message: response.message,
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 5000
                });
                toast.present();
            }
        });
    };
    ChangepasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangepasswordPage');
    };
    return ChangepasswordPage;
}());
ChangepasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-changepassword',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/changepassword/changepassword.html"*/'<!--\n  Generated template for the ChangepasswordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n\n  <ion-content class="light-blue darken-4 white-text">\n    <div class="logo center padding-top no-margin">\n      <h1 class="white-text font-lighter no-margin">BCC PAY</h1>\n    </div>\n    <div class="padding-top padding-left no-margin">\n      <h4 class="white-text font-lighter no-margin">Change Password</h4>\n    </div>\n    <form class="col s12 center">\n      <div class="row no-margin">\n        <div class="custom-input-focus-color input-field col s12">\n            <input id="password" type="password" placeholder="Password" value="" [(ngModel)]="newPasswordvalue.newPassword" name="password" class="white-text">\n        </div>\n      </div>\n      <div class="row no-margin">\n        <div class="custom-input-focus-color input-field col s12">\n        	   <input id="password" type="password" placeholder="Confirm Password" value="" [(ngModel)]="newPasswordvalue.confirmNewPassword" name="password" class="white-text">          \n        </div>\n      </div>\n\n      <button class="btn waves-effect waves-light light-blue-text darken-4-text white" type="submit" name="action" (click)="changecurrentPassword(newPasswordvalue)">submit\n        <ion-icon name="send"></ion-icon>\n      </button>\n\n    </form>\n  </ion-content>'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/changepassword/changepassword.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], ChangepasswordPage);

//# sourceMappingURL=changepassword.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangespendingpasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__setting_setting__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_setup_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { LoginPage } from '../login/login';
//import { SignupPage} from '../signup/signup';



//import { ChangepasswordPage } from '../changepassword/changepassword';
/**
 * Generated class for the ChangespendingpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChangespendingpasswordPage = (function () {
    function ChangespendingpasswordPage(navCtrl, toastCtrl, menuCtrl, alertCtrl, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.newSpendingPasswordvalue = {
            "userMailId": "",
            "newSpendingPassword": "",
            "confirmSpendingPassword": ""
        };
        this.userdata();
    }
    ChangespendingpasswordPage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.newSpendingPasswordvalue.userMailId = this.user.user.email;
    };
    ChangespendingpasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangespendingpasswordPage');
    };
    ChangespendingpasswordPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menuCtrl.enable(false);
    };
    ChangespendingpasswordPage.prototype.ionViewWillLeave = function () {
        // enable the root left menu when leaving the tutorial page
        this.menuCtrl.enable(true);
    };
    ChangespendingpasswordPage.prototype.newSpendingPassword = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'updating spending password...'
        });
        this._setupService.setNewSpendingPassord(this.newSpendingPasswordvalue).subscribe(function (response) {
            if (response.statusCode == 200) {
                loading.dismiss();
                var toast = _this.toastCtrl.create({
                    message: 'Spending Password update successfully',
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 5000
                });
                toast.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            }
            else {
                loading.dismiss();
                var toast = _this.toastCtrl.create({
                    message: response.message,
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 5000
                });
                toast.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__setting_setting__["a" /* SettingPage */]);
            }
        });
    };
    return ChangespendingpasswordPage;
}());
ChangespendingpasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-changespendingpassword',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/changespendingpassword/changespendingpassword.html"*/'<!--\n  Generated template for the ChangespendingpasswordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<!-- <ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Change Spending Password</ion-title>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content class="light-blue darken-4 white-text">\n    <div class="logo center padding-top no-margin">\n      <h1 class="white-text font-lighter no-margin">BCC PAY</h1>\n    </div>\n    <div class="padding-top padding-left no-margin">\n      <h4 class="white-text font-lighter no-margin">Update Spending Password</h4>\n    </div>\n    <form class="col s12 center">\n\n\n      <div class="row no-margin">\n        <div class="custom-input-focus-color input-field col s12">\n          <input id="password" type="password" placeholder="New Spending Password" value="" [(ngModel)]="newSpendingPasswordvalue.newSpendingPassword" name="password" class="white-text">\n\n        </div>\n      </div>\n      <div class="row no-margin">\n        <div class="custom-input-focus-color input-field col s12">\n           <input id="password2" type="password" placeholder="New Spending Password" value="" [(ngModel)]="newSpendingPasswordvalue.confirmSpendingPassword" name="password2" class="white-text">\n      </div>\n      </div>\n\n      <button class="btn waves-effect waves-light light-blue-text darken-4-text white" type="submit" name="action" (click)="newSpendingPassword(newSpendingPasswordvalue)">submit\n      <ion-icon name="send"></ion-icon>\n      </button>\n\n    </form>\n  </ion-content>\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/changespendingpassword/changespendingpassword.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], ChangespendingpasswordPage);

//# sourceMappingURL=changespendingpassword.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(242);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_changepassword_changepassword__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_forgotPassword_forgotPassword__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_changespendingpassword_changespendingpassword__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_askcrypto_askcrypto__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_bidcrypto_bidcrypto__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_buycrypto_buycrypto__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_sellcrypto_sellcrypto__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_cryptovault_cryptovault__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_btcvault_btcvault__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_sendbtc_sendbtc__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_sendcrypto_sendcrypto__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_requestbtc_requestbtc__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_requestcrypto_requestcrypto__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_btcsenttransaction_btcsenttransaction__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_btcreceivedtransaction_btcreceivedtransaction__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_cryptosenttransaction_cryptosenttransaction__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_cryptoreceivedtransaction_cryptoreceivedtransaction__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_buysellcryptotransaction_buysellcryptotransaction__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_setting_setting__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_status_bar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_splash_screen__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_services_services__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_social_sharing__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_clipboard__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_barcode_scanner__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_pin_dialog__ = __webpack_require__(222);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
































//import *as HighCharts from 'highcharts';




//import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
//import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_changepassword_changepassword__["a" /* ChangepasswordPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_forgotPassword_forgotPassword__["a" /* ForgotPasswordPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_askcrypto_askcrypto__["a" /* AskcryptoPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_bidcrypto_bidcrypto__["a" /* BidcryptoPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_buycrypto_buycrypto__["a" /* BuycryptoPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_sellcrypto_sellcrypto__["a" /* SellcryptoPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_cryptovault_cryptovault__["a" /* CryptovaultPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_btcvault_btcvault__["a" /* BtcvaultPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_sendbtc_sendbtc__["a" /* SendbtcPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_sendcrypto_sendcrypto__["a" /* SendcryptoPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_requestbtc_requestbtc__["a" /* RequestbtcPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_requestcrypto_requestcrypto__["a" /* RequestcryptoPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_btcsenttransaction_btcsenttransaction__["a" /* BtcsenttransactionPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_btcreceivedtransaction_btcreceivedtransaction__["a" /* BtcreceivedtransactionPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_cryptosenttransaction_cryptosenttransaction__["a" /* CryptosenttransactionPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_cryptoreceivedtransaction_cryptoreceivedtransaction__["a" /* CryptoreceivedtransactionPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_buysellcryptotransaction_buysellcryptotransaction__["a" /* BuysellcryptotransactionPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_changespendingpassword_changespendingpassword__["a" /* ChangespendingpasswordPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_setting_setting__["a" /* SettingPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_changepassword_changepassword__["a" /* ChangepasswordPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_forgotPassword_forgotPassword__["a" /* ForgotPasswordPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_askcrypto_askcrypto__["a" /* AskcryptoPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_bidcrypto_bidcrypto__["a" /* BidcryptoPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_buycrypto_buycrypto__["a" /* BuycryptoPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_sellcrypto_sellcrypto__["a" /* SellcryptoPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_cryptovault_cryptovault__["a" /* CryptovaultPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_btcvault_btcvault__["a" /* BtcvaultPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_sendbtc_sendbtc__["a" /* SendbtcPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_sendcrypto_sendcrypto__["a" /* SendcryptoPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_requestbtc_requestbtc__["a" /* RequestbtcPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_requestcrypto_requestcrypto__["a" /* RequestcryptoPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_btcsenttransaction_btcsenttransaction__["a" /* BtcsenttransactionPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_btcreceivedtransaction_btcreceivedtransaction__["a" /* BtcreceivedtransactionPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_cryptosenttransaction_cryptosenttransaction__["a" /* CryptosenttransactionPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_cryptoreceivedtransaction_cryptoreceivedtransaction__["a" /* CryptoreceivedtransactionPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_buysellcryptotransaction_buysellcryptotransaction__["a" /* BuysellcryptotransactionPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_changespendingpassword_changespendingpassword__["a" /* ChangespendingpasswordPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_setting_setting__["a" /* SettingPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_35__ionic_native_pin_dialog__["a" /* PinDialog */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_32__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_33__ionic_native_clipboard__["a" /* Clipboard */], __WEBPACK_IMPORTED_MODULE_34__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_30__providers_services_services__["a" /* ServicesProvider */], __WEBPACK_IMPORTED_MODULE_31__services_setup_service__["a" /* SetupService */],
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_welcome_welcome__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_cryptovault_cryptovault__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_btcvault_btcvault__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_setting_setting__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_pin_dialog__ = __webpack_require__(222);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












//import { FingerprintAIO ,FingerprintOptions} from '@ionic-native/fingerprint-aio';
var MyApp = (function () {
    function MyApp(platform, toastCtrl, pinDialog, events, _setupService, app, alertCtrl, statusBar, splashScreen) {
        var _this = this;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.pinDialog = pinDialog;
        this.events = events;
        this._setupService = _setupService;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.email = {
            "userMailId": ""
        };
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_welcome_welcome__["a" /* WelcomePage */];
        this.togglePin = JSON.parse(localStorage.getItem('pinLockEnabel'));
        this.pinValueForApp = JSON.parse(localStorage.getItem('pinforapp'));
        this.toggleFingerPrint = JSON.parse(localStorage.getItem('fingerPrintEnabel'));
        //  alert("this.toggleFingerPrint = = "+this.toggleFingerPrint);
        if (this.togglePin == null || this.togglePin == false || this.pinValueForApp == null) {
            this.initializeApp();
        }
        else {
            this.pinDialog.prompt('Enter your PIN', 'Verify PIN', ['OK'])
                .then(function (result) {
                if (result.buttonIndex == 1) {
                    console.log('User clicked OK, value is: ', result.input1);
                    if (_this.pinValueForApp != null || _this.pinValueForApp != undefined) {
                        if (result.input1 == _this.pinValueForApp) {
                            _this.initializeApp();
                        }
                        else {
                            var toast = _this.toastCtrl.create({
                                message: 'Pin not matched !!',
                                showCloseButton: true,
                                closeButtonText: 'Ok',
                                duration: 5000
                            });
                            toast.present();
                            _this.platform.exitApp();
                        }
                    }
                }
                else if (result.buttonIndex == 2) {
                    _this.platform.exitApp();
                }
            });
        }
        this.registerBackButtonAction();
        this.pages = [
            { title: 'Dashboard', component: __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */], icon: 'home' },
            { title: 'BTC Wallet', component: __WEBPACK_IMPORTED_MODULE_8__pages_btcvault_btcvault__["a" /* BtcvaultPage */], icon: 'apps' },
            { title: 'BCH Wallet', component: __WEBPACK_IMPORTED_MODULE_7__pages_cryptovault_cryptovault__["a" /* CryptovaultPage */], icon: 'apps' },
            { title: 'Setting', component: __WEBPACK_IMPORTED_MODULE_9__pages_setting_setting__["a" /* SettingPage */], icon: 'settings' },
            { title: 'Logout', component: null, icon: 'log-out' }
        ];
        events.subscribe('shareObject', function (userData) {
            localStorage.setItem('userprofileEmailId', JSON.stringify(userData));
            _this.user = JSON.parse(localStorage.getItem('userprofileEmailId'));
            if (_this.user) {
                _this.emailId = _this.user;
            }
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            var firstVisit = localStorage.getItem('firstVisit');
            if (firstVisit == null) {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
            }
            else if (localStorage.getItem('logindetail')) {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
            }
            else {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
            }
            _this.statusBar.backgroundColorByHexString('#001f38');
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.registerBackButtonAction = function () {
        var _this = this;
        this.platform.registerBackButtonAction(function () {
            var nav = _this.app.getActiveNavs()[0];
            var activeView = nav.getActive();
            if (activeView.name === "HomePage") {
                if (nav.canGoBack()) {
                    nav.pop();
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'App termination',
                        message: 'Do you want to close the app?',
                        buttons: [{
                                text: 'Cancel',
                                role: 'cancel',
                                handler: function () {
                                    console.log('Application exit prevented!');
                                }
                            }, {
                                text: 'Close App',
                                handler: function () {
                                    _this.platform.exitApp(); // Close this application
                                }
                            }]
                    });
                    alert_1.present();
                }
            }
        });
    };
    MyApp.prototype.welcomeToBack = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        if (page.component) {
            this.nav.setRoot(page.component);
        }
        else {
            localStorage.removeItem("logindetail");
            //localStorage.clear();
            setTimeout(function () { return _this.welcomeToBack(); }, 1000);
        }
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/app/app.html"*/'<ion-menu [content]="content" id="myMenu">\n  <ion-header>\n    <ion-toolbar color="custom">\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="light-blue darken-4" style="top:0!important">\n  <h4 class="text-center" style="margin-left: 67px">\n    <ion-icon name="contact" class="large white-text text-center"style="margin-left: 67px"></ion-icon><br><small class="white-text">{{this.emailId}}</small>\n  </h4>\n\n  <hr class="no-margin">\n    <ion-list class="light-blue darken-4 white-text" >\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)" class="light-blue darken-4 white-text">       \n          <ion-icon name="{{p.icon}}" item-left></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_pin_dialog__["a" /* PinDialog */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_10__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ServicesProvider = (function () {
    function ServicesProvider(http) {
        this.http = http;
        this.endpoint_url = 'http://162.213.252.66:1338';
        this.http = http;
        console.log('Hello ServicesProvider Provider');
    }
    return ServicesProvider;
}());
ServicesProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], ServicesProvider);

//# sourceMappingURL=services.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forgotPassword_forgotPassword__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_setup_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, toastCtrl, events, menuCtrl, navParams, _setupService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.logindetail = {
            "email": "",
            "password": ""
        };
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menuCtrl.enable(false);
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        // enable the root left menu when leaving the tutorial page
        this.menuCtrl.enable(true);
    };
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        if (!this.logindetail.email || !this.logindetail.password) {
            var toast = this.toastCtrl.create({
                message: 'Email and password should be required',
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 5000
            });
            toast.present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: 'Logging please wait...'
            });
            loading_1.present();
            this._setupService.createLoginDetail(this.logindetail).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.responseData = result;
                    localStorage.setItem('logindetail', JSON.stringify(_this.responseData));
                    _this.user = _this.responseData.user.email;
                    _this.events.publish("shareObject", _this.user);
                    loading_1.dismiss();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                }
                else {
                    _this.responseData = result;
                    loading_1.dismiss();
                    var toast = _this.toastCtrl.create({
                        message: _this.responseData.message,
                        showCloseButton: true,
                        closeButtonText: 'Ok',
                        duration: 5000
                    });
                    toast.present();
                }
            });
        }
    };
    LoginPage.prototype.forgotPassword = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__forgotPassword_forgotPassword__["a" /* ForgotPasswordPage */]);
    };
    LoginPage.prototype.signup = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/login/login.html"*/'\n<ion-content  class="light-blue darken-4 white-text" content>\n    <div class="logo center padding-top">\n      <h1 class="white-text font-lighter">BccPay</h1>\n    </div>\n    <div class="padding-top padding-left">\n      <h4 class="white-text font-lighter">Hello there, <br>welcome back</h4>\n    </div>\n    <form class="col s12 center">\n       <div class="row">\n        <div class="custom-input-focus-color input-field col s12">\n          <input id="email" type="text" value="" placeholder="Email" [(ngModel)]="logindetail.email" class="white-text" name="email">\n          <!-- <label for="address">Email</label> -->\n        </div>\n      </div>\n      <div class="row">\n        <div class="custom-input-focus-color input-field col s12">\n          <input id="password" type="password" placeholder="Password" value="" [(ngModel)]="logindetail.password" name="password" class="white-text">\n          <!-- <label for="amount">Password</label> -->\n        </div>\n      </div>\n      <button class="btn waves-effect waves-light primarytext-color " type="submit" name="action" (click)="doLogin(logindetail)">Log me in\n      <ion-icon name="send"></ion-icon>\n      </button>\n      \n    </form>\n    <div class="row center">\n      <span class="col center white-text">Forgot Password? <a class="white-text"  (click)="forgotPassword()">Get New !</a></span><br>\n    </div>\n    <div class="row center">\n      <span class="col center white-text">Don\'t Have Account? <a class="white-text" (click)="signup()">Signup !\n      </a></span>\n    </div>\n  </ion-content>'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BtcvaultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_setup_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sendbtc_sendbtc__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__requestbtc_requestbtc__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__btcsenttransaction_btcsenttransaction__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__btcreceivedtransaction_btcreceivedtransaction__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_clipboard__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the BtcvaultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BtcvaultPage = (function () {
    function BtcvaultPage(navCtrl, alertCtrl, toastCtrl, _setupService, loadingCtrl, actionSheetCtrl, sharingVar, clipboard) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this._setupService = _setupService;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.sharingVar = sharingVar;
        this.clipboard = clipboard;
        this.email = {
            "userMailId": ""
        };
        this.currentUserBalance = {
            "ask": "",
            "bid": ""
        };
        this.currentPrice();
        this.userdata();
    }
    BtcvaultPage.prototype.currentPrice = function () {
        var _this = this;
        this._setupService.getBidCoin().subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.currentUserBalance.ask = (response.currentPrice.ask).toFixed(5);
                _this.currentUserBalance.bid = (response.currentPrice.bid).toFixed(5);
                _this.ask = _this.currentUserBalance.ask;
            }
            else {
                console.log("no data found ... ");
            }
        });
        this.footer = false;
        this.fabButton = true;
    };
    BtcvaultPage.prototype.userdata = function () {
        this.user = JSON.parse(localStorage.getItem('logindetail'));
        this.email.userMailId = this.user.user.email;
        this.BTCbalance = (this.user.user.BTCbalance).toFixed(5);
        this.BCHbalance = (this.user.user.BCHbalance).toFixed(5);
        this.FreezedBCHbalance = (this.user.user.FreezedBCHbalance).toFixed(5);
        this.FreezedBTCbalance = (this.user.user.FreezedBTCbalance).toFixed(5);
        this.userBTCAddress = this.user.user.userBTCAddress;
        this.userId = this.user.user.id;
    };
    BtcvaultPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BtcvaultPage');
    };
    BtcvaultPage.prototype.footerShow = function () {
        this.footer = true;
        this.fabButton = false;
    };
    BtcvaultPage.prototype.showConfirm = function () {
        var _this = this;
        var btcAddress = this.userBTCAddress;
        console.log("btcaddress = =" + this.userBTCAddress);
        var alert = this.alertCtrl.create({
            title: '<div class="center" >My BTC Address</div>',
            subTitle: '<div class="center" (click)="copyAddress()"> <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=' + btcAddress + '"  alt="QR Code" style="width: 80%;" ></div><div class="center">' + btcAddress + '<div>',
            buttons: [
                {
                    text: 'copy',
                    handler: function (data) {
                        _this.clipboard.copy(btcAddress);
                        var toast = _this.toastCtrl.create({
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
                    handler: function (data) {
                        _this.shareAddress(btcAddress);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log("hello");
                    }
                },
            ]
        });
        alert.present();
    };
    BtcvaultPage.prototype.shareAddress = function (a) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Share address Via',
            buttons: [
                {
                    text: 'whatsapp',
                    role: 'destructive',
                    handler: function () {
                        _this.whatsUpShare(a);
                    }
                }, {
                    text: 'facebook',
                    role: 'destructive',
                    handler: function () {
                        _this.facebookShare(a);
                    }
                }, {
                    text: 'message',
                    role: 'destructive',
                    handler: function () {
                        _this.messageShare(a);
                    }
                },
                {
                    text: 'email',
                    role: 'destructive',
                    handler: function () {
                        _this.emailShare(a);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    BtcvaultPage.prototype.whatsUpShare = function (address) {
        this.sharingVar.shareViaWhatsApp(address, null /* img */, null /* url */).then(function (data) {
            console.log('Shared via whatsup');
        })
            .catch(function (err) {
            console.log('Was not shared via whatsup');
        });
    };
    BtcvaultPage.prototype.facebookShare = function (address) {
        this.sharingVar.shareViaFacebook(address, null /* img */, null /* url */).then(function (data) {
            console.log('Shared via Facebook');
        })
            .catch(function (err) {
            console.log('Was not shared via Facebook');
        });
    };
    BtcvaultPage.prototype.messageShare = function (address) {
        this.sharingVar.shareViaSMS(address, null /* img */).then(function (data) {
            console.log('Shared via sms');
        })
            .catch(function (err) {
            console.log('Was not shared via sms');
        });
    };
    BtcvaultPage.prototype.emailShare = function (address) {
        this.sharingVar.shareViaEmail(address, null /* img */, null /* url */).then(function (data) {
            console.log('Shared via email');
        })
            .catch(function (err) {
            console.log('Was not shared via email');
        });
    };
    BtcvaultPage.prototype.btcsent = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__btcsenttransaction_btcsenttransaction__["a" /* BtcsenttransactionPage */]);
    };
    BtcvaultPage.prototype.btcreceived = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__btcreceivedtransaction_btcreceivedtransaction__["a" /* BtcreceivedtransactionPage */]);
    };
    BtcvaultPage.prototype.sendBTC = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__sendbtc_sendbtc__["a" /* SendbtcPage */]);
    };
    BtcvaultPage.prototype.requestBTC = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__requestbtc_requestbtc__["a" /* RequestbtcPage */]);
    };
    return BtcvaultPage;
}());
BtcvaultPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-btcvault',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/btcvault/btcvault.html"*/'<!--\n  Generated template for the BtcvaultPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="custom">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>BTC wallet</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content >\n     <div class="light-blue darken-4 white-text padding">\n      <div class="row">\n        <h4 class="col white-text no-margin text-roboto"><span class="crypto-icon crypto-vault-symbol">Ƀ&nbsp;</span>{{BTCbalance}}</h4>\n        <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl={{userBTCAddress}}" alt="QR Code" style="height: 10%; width: 10%;" (click)="showConfirm()">\n      </div>\n      <div class="row no-margin">\n        <div class="col col-66  white-text">\n          <small style="color: #a9a9a9">Freezed BTC Balance </small><br><span class="">Ƀ&nbsp;</span>{{FreezedBTCbalance}}\n        </div>\n      </div>\n    </div>\n       <div class="list" style="background: #ececec;">\n       <a class="item item-avatar valign-wrapper" (click)="btcsent()">\n              <img src="assets/icon/Bitcoin_Logo.png">\n              <h2>Sent Transactions</h2>\n          </a>\n      <hr class="no-margin">\n      <a class="item item-avatar valign-wrapper" (click)="btcreceived()">\n              <img src="assets/icon/Bitcoin_Logo.png">\n              <h2>Received Transactions</h2>\n      </a>      \n    </div>  \n    <ion-fab  right bottom *ngIf="fabButton">\n    <button ion-fab mini (click)=footerShow()><ion-icon name="add"></ion-icon></button>   \n  </ion-fab>\n\n\n</ion-content>\n<ion-footer color="custom" *ngIf="footer">\n\n   <div class="bar bar-footer footer-height light-blue darken-3 center valign-wrapper">\n    <div class="row no-margin footer-button-line-height white-text">\n      <div class="col-xl-3" style="margin-left: 46px" (click)="sendBTC()">\n\n        <ion-icon name="send"></ion-icon>&nbsp;Send</div>\n\n      <div class="col-xl-3" style="margin-left: 150px" (click)="requestBTC()">\n       <ion-icon name="person"></ion-icon>\n        &nbsp;Request</div>\n\n    </div>\n  </div>\n</ion-footer>\n\n'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/btcvault/btcvault.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_clipboard__["a" /* Clipboard */]])
], BtcvaultPage);

//# sourceMappingURL=btcvault.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_setup_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = (function () {
    function SignupPage(navCtrl, platform, loadingCtrl, alertCtrl, menuCtrl, navParams, _setupService, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        this._setupService = _setupService;
        this.toastCtrl = toastCtrl;
        this.signUpDetail = {
            "email": "",
            "password": "",
            "confirmPassword": "",
            "spendingpassword": "",
            "confirmspendingpassword": ""
        };
        this.otpvalue = {
            "userMailId": "",
            "otp": ""
        };
        var backAction = platform.registerBackButtonAction(function () {
            _this.navCtrl.pop();
            backAction();
        }, 2);
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menuCtrl.enable(false);
    };
    SignupPage.prototype.ionViewWillLeave = function () {
        // enable the root left menu when leaving the tutorial page
        this.menuCtrl.enable(true);
    };
    SignupPage.prototype.createNewUser = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'account creating...'
        });
        loading.present();
        if (!this.signUpDetail.email || !this.signUpDetail.password || !this.signUpDetail.confirmPassword || !this.signUpDetail.spendingpassword || !this.signUpDetail.confirmspendingpassword) {
            var toast = this.toastCtrl.create({
                message: 'All fields should be required',
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 5000
            });
            toast.present();
        }
        else {
            this._setupService.createUserAccount(this.signUpDetail).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.responseData = result;
                    loading.dismiss();
                    localStorage.setItem('signUp', JSON.stringify(_this.responseData));
                    var response_1 = JSON.parse(localStorage.getItem('signUp'));
                    var toast = _this.toastCtrl.create({
                        message: 'OTP sent to your email id',
                        showCloseButton: true,
                        closeButtonText: 'Ok',
                        duration: 5000
                    });
                    toast.present();
                    var prompt_1 = _this.alertCtrl.create({
                        title: 'One Time Password',
                        inputs: [
                            {
                                name: 'otp',
                                type: 'password',
                                placeholder: 'One Time Password'
                            }
                        ],
                        buttons: [
                            {
                                text: 'Cancel',
                                handler: function (data) {
                                    var toast = _this.toastCtrl.create({
                                        message: 'account created please login and verify !!',
                                        showCloseButton: true,
                                        closeButtonText: 'Ok',
                                        duration: 5000
                                    });
                                    toast.present();
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                                }
                            },
                            {
                                text: 'submit',
                                handler: function (data) {
                                    if (!data.otp) {
                                        var toast_1 = _this.toastCtrl.create({
                                            message: 'Otp should be required please signUp retry',
                                            showCloseButton: true,
                                            closeButtonText: 'Ok',
                                            duration: 5000
                                        });
                                        toast_1.present();
                                    }
                                    else {
                                        var loading_1 = _this.loadingCtrl.create({
                                            content: 'verifying otp...'
                                        });
                                        loading_1.present();
                                        _this._setupService.VerificationEmail({ "userMailId": response_1.userMailId, "otp": data.otp
                                        }).subscribe(function (result) {
                                            loading_1.dismiss();
                                            if (result.statusCode == 200) {
                                                var toast_2 = _this.toastCtrl.create({
                                                    message: 'SignUp successfully',
                                                    showCloseButton: true,
                                                    closeButtonText: 'Ok',
                                                    duration: 5000
                                                });
                                                toast_2.present();
                                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                                            }
                                        });
                                    }
                                }
                            }
                        ],
                        enableBackdropDismiss: false
                    });
                    prompt_1.present();
                }
                else {
                    loading.dismiss();
                    _this.responseData = result;
                    var toast = _this.toastCtrl.create({
                        message: _this.responseData.message,
                        showCloseButton: true,
                        closeButtonText: 'Ok',
                        duration: 5000
                    });
                    toast.present();
                }
            });
        }
    };
    SignupPage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/signup/signup.html"*/'\n<ion-content  class="light-blue darken-4 white-text" content>\n    <div class="logo center padding-top">\n      <h1 class="white-text font-lighter">BccPay</h1>\n    </div>\n    <div class="padding-top padding-left">\n      <h4 class="white-text font-lighter">Hello there, <br>welcome back</h4>\n    </div>\n    <form class="col s12 center">\n       <div class="row">\n        <div class="custom-input-focus-color input-field col s12">\n          <input id="email" type="text" value="" placeholder="Email" [(ngModel)]="signUpDetail.email" class="white-text" name="email">\n          <!-- <label for="address">Email</label> -->\n        </div>\n      </div>\n      <div class="row">\n        <div class="custom-input-focus-color input-field col s12">\n          <input id="password" type="password" placeholder="Password" value="" [(ngModel)]="signUpDetail.password" name="password" class="white-text">\n          <!-- <label for="amount">Password</label> -->\n        </div>\n      </div>\n      <div class="row">\n        <div class="custom-input-focus-color input-field col s12">\n          <input id="password" type="password" placeholder="confirmPassword" value="" [(ngModel)]="signUpDetail.confirmPassword" name="password" class="white-text">\n          <!-- <label for="amount">Password</label> -->\n        </div>\n      </div>\n      <div class="row">\n        <div class="custom-input-focus-color input-field col s12">\n          <input id="password" type="password" placeholder="spendingpassword" value="" [(ngModel)]="signUpDetail.spendingpassword" name="password" class="white-text">\n          <!-- <label for="amount">Password</label> -->\n        </div>\n      </div>\n      <div class="row">\n        <div class="custom-input-focus-color input-field col s12">\n          <input id="password" type="password" placeholder="confirmspendingpassword" value="" [(ngModel)]="signUpDetail.confirmspendingpassword" name="password" class="white-text">\n          <!-- <label for="amount">Password</label> -->\n        </div>\n      </div>\n      <button class="btn waves-effect waves-light primarytext-color " type="submit"  (click)="createNewUser(signUpDetail)">Get Started\n         <ion-icon name="send"></ion-icon>\n      </button>\n      \n    </form>\n     <div class="row center">\n      <span class="col center white-text">Already Have Account? <a class="white-text" (click)="login()">Login !</a></span>\n    </div>\n  </ion-content>'/*ion-inline-end:"/home/pankaj/Videos/bccpayApp(version 2.0.5)/src/pages/signup/signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__services_setup_service__["a" /* SetupService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetupService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SetupService = (function () {
    function SetupService(http) {
        this.http = http;
        //endpoint_url: string = 'http://192.168.0.148:1338';
        this.endpoint_url = 'http://162.213.252.66:1338';
        this.http = http;
        console.log('Hello ServicesProvider Provider');
    }
    //endpoint_url: string = 'http://192.168.43.132:1338';
    SetupService.prototype.createLoginDetail = function (loginDetail) {
        // console.log("loginDetail = = "+JSON.stringfy(loginDetail));
        var response = this.http.post(this.endpoint_url + '/auth/authentcate', loginDetail).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.createUserAccount = function (SignUpDetail) {
        var response = this.http.post(this.endpoint_url + '/user/createNewUser', SignUpDetail).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.VerificationEmail = function (otpDetail) {
        var response = this.http.post(this.endpoint_url + '/user/updateUserVerifyEmail', otpDetail).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.forgotPassword = function (userDetail) {
        var response = this.http.post(this.endpoint_url + '/user/sentOtpToEmailForgotPassword', userDetail).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.forgotPasswordOTP = function (otp) {
        var response = this.http.post(this.endpoint_url + '/user/verifyOtpToEmailForgotPassord', otp).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.updateForgotPassord = function (newpasswordvalues) {
        var response = this.http.post(this.endpoint_url + '/user/updateForgotPassordAfterVerify', newpasswordvalues).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.chartAvailabelData = function (chartdata) {
        var response = this.http.post(this.endpoint_url + '/user/getChart', chartdata).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.CurrntBalanceOfBCH = function (emailId) {
        var response = this.http.post(this.endpoint_url + '/usertransaction/getBalBCH', emailId).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.CurrntBalanceOfBTC = function (emailId) {
        var response = this.http.post(this.endpoint_url + '/usertransaction/getBalBTC', emailId).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.getBidCoin = function () {
        var response = this.http.post(this.endpoint_url + '/user/getCurrntPriceOfBTC', '').map(function (res) { return res.json(); });
        console.log("response = = =" + JSON.stringify(response));
        return response;
    };
    SetupService.prototype.buyBCHCoinByUser = function (buyAmountSend) {
        var response = this.http.post(this.endpoint_url + '/usertransaction/getBalBTC', buyAmountSend).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.sellBCHCoinByUser = function (sellAmount) {
        var response = this.http.post(this.endpoint_url + '/usertransaction/getBalBTC', sellAmount).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.bidCryptoAmount = function (bidCryptoAmount) {
        var response = this.http.post(this.endpoint_url + '/bid/addbid', bidCryptoAmount).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.askCryptoAmount = function (askCryptoAmount) {
        var response = this.http.post(this.endpoint_url + '/ask/addask', askCryptoAmount).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.sendBTCCoinByUser = function (values) {
        var response = this.http.post(this.endpoint_url + '/usertransaction/sendBTC', values).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.getBTCTransactions = function (values) {
        var response = this.http.post(this.endpoint_url + '/usertransaction/getTxsListBTC', values).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.getBCHTransactions = function (values) {
        var response = this.http.post(this.endpoint_url + '/usertransaction/getTxsListBCH', values).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.sendBCHCoinByUser = function (values) {
        var response = this.http.post(this.endpoint_url + '/usertransaction/sendBCH', values).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.changecurrentpasswords = function (values) {
        var response = this.http.post(this.endpoint_url + '/user/updateCurrentPassword', values).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.OtpToUpdateSpendingPassword = function (values) {
        var response = this.http.post(this.endpoint_url + '/user/sentOtpToUpdateSpendingPassword', values).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.OtpToEmailForgotSpendingPassord = function (values) {
        var response = this.http.post(this.endpoint_url + '/user/verifyOtpToEmailForgotSpendingPassord', values).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.setNewSpendingPassord = function (values) {
        var response = this.http.post(this.endpoint_url + '/user/updateForgotSpendingPassordAfterVerify', values).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.NewEmailVerification = function (values) {
        var response = this.http.post(this.endpoint_url + '/user/verifyOtpToEmailVerification', values).map(function (res) { return res.json(); });
        return response;
    };
    SetupService.prototype.EmailVerifyforAccount = function (values) {
        var response = this.http.post(this.endpoint_url + '/user/sentOtpToEmailVerificatation', values).map(function (res) { return res.json(); });
        return response;
    };
    return SetupService;
}());
SetupService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], SetupService);

//# sourceMappingURL=setup.service.js.map

/***/ })

},[223]);
//# sourceMappingURL=main.js.map