import { LoadingController } from '@ionic/angular';
import { CovidService } from './../covid.service';
import { Component, OnInit, } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { title } from 'process';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  urllatlng = 'https://latlongpnru.herokuapp.com/api/latlongs';
  profileApi = 'https://ratthaphoncovid19.herokuapp.com/api/getuser';
  getLatlong = 'https://latlongpnru.herokuapp.com/api/userlatlong/';
  private loading;
  map = null;
  lat: any;
  lng: any;
  truck: any;
  idToken: string;
  id: string;
  showlat: any;
  showlng: any;
  getLL: any;
  getatlongmap: any;
  makermap: any;
  constructor(
    private loadingCtr: LoadingController,
    private covidApi: CovidService,
    public geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.location();
    this.getToken();
    this.getapi();
    // this.set();
    // this.loadingCtr.create({
    //   message: 'กำลังโหลด Map....'
    // }).then((overley) => {
    //   this.loading = overley;
    //   this.loading.present();
    //   this.loading.dismiss(),   
    // });
    this.getLatlongmap();
  }
  set(){
    setInterval(() => {
      this.postlocaltion();
    }, 10000);
  }
  async getapi() {
    const getApi: any = await this.covidApi.getProfile(this.profileApi, this.idToken);
    this.id = getApi.data._id;
  }
  async getLatlongmap() {
    const getApi: any = await this.covidApi.getProfile(this.profileApi, this.idToken);
    this.id = getApi.data._id;
    const getatlongmap = await this.covidApi.getLatlog(this.getLatlong + this.id);
    this.getLL = getatlongmap;
  }
  getToken() {
    this.idToken = localStorage.getItem('token');
  }
  async postlocaltion() {
    try {
      const latlng = {
        userId: this.id,
        lat: this.lat,
        lng: this.lng,
      };
      const localtion = await this.covidApi.postLatlog(this.urllatlng, latlng, this.idToken);
    } catch (error) {
    }
  }
  async location() {
    const watch = await this.geolocation.watchPosition();
    watch.subscribe((result) => {
      // ตัวแปรเก็บ latlng
      this.lat = result.coords.latitude;
      this.lng = result.coords.longitude;
      // ตัวแปรแสดง localtion
      this.truck = new google.maps.LatLng(result.coords.latitude, result.coords.longitude);
      const mapEle: HTMLElement = document.getElementById('map');
      this.map = new google.maps.Map(mapEle, {
        center: this.truck,
        Zoom: 16,
      });
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEle.classList.add('show-map');
        // this.renderMarkers()
        this.userlocation();
        for (let i = 0; i < this.getLL.data.length; i++) {
          this.makermap = [{
            lat: Number(this.getLL.data[i].lat),
            lng: Number(this.getLL.data[i].lng)
          },
          ];
          this.makermap.forEach(marker => {
            this.marker(marker);
          });
          console.log(this.makermap);
        }

      });
    });
  }
  userlocation() {
    return new google.maps.Marker({
      icon: {
        url: 'assets/maker-localtion/userlocaltion.png',
        scaledSize: new google.maps.Size(50, 50)
      },
      position: this.truck,
      map: this.map
    });
  }
  marker(marker) {

    return new google.maps.Marker({
      icon: {
        url: 'assets/maker-localtion/location.png',
        scaledSize: new google.maps.Size(60, 60)
      },
      position: marker,
      map: this.map,
    });

  }

}
