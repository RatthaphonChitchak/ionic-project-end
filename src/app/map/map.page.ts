import { LoadingService } from './../loading.service';
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
  public setOn: boolean = false;
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
  clear: any;
  constructor(
    public loading: LoadingService,
    private covidApi: CovidService,
    public geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.location();
    setInterval(() => {
      this.location();
    }, 60000);
    this.getToken();
    this.getapi();
    this.getLatlongmap();
  }
  async location() {
    await this.loading.presentLoadingWithOptions();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.truck = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const mapEle: HTMLElement = document.getElementById('map');
      this.map = new google.maps.Map(mapEle, {
        center: this.truck,
        Zoom: 16,
      });
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEle.classList.add('show-map');
        this.userlocation();
        this.loading.presentLoadingWithOptions();
        setTimeout(() => {
          for (let i = 0; i < this.getLL.data.length; i++) {
            this.makermap = [{
              lat: Number(this.getLL.data[i].lat),
              lng: Number(this.getLL.data[i].lng)
            },
            ];
            this.makermap.forEach(marker => {
              this.marker(marker);
            });
          }
          this.loading.dismissOnPageChange();
        }, 5000);

      });
      this.loading.dismissOnPageChange();
    }).catch((error) => {
      this.loading.dismissOnPageChange();
      console.log('Error getting location', error);
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
  set() {
    if (this.setOn === true) {
      this.clear = setInterval(() => {
        this.postlocaltion();
      }, 10000);
    } else {
      clearInterval(this.clear)
    }
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
}

