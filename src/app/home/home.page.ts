import { Component, NgZone } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  devices:any[] = [];
  statusMessage: string;

  constructor(public navCtrl: NavController,private toastCtrl: ToastController,private ble: BLE, private ngZone: NgZone){

  }

  scan(){
    //this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];

    this.ble.scan([],5).subscribe(
      device => this.onDeviceDiscovered(device),
      //error => this.scanError(error)
    );
    //setTimeout(this.setStatus.bind(this),5000,'Scan complete');
  }

  onDeviceDiscovered(device){
    console.log('Discovered ' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device);
    })
    
  }

}
