import { LoadingController } from '@ionic/angular';
import { CovidService } from './../covid.service';
import { Component, OnInit,  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { title } from 'process';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  private loading;
  map = null;
  lat: any;
  lng: any;
  truck: any;

  markers: Marker[] = [
    {
      position: {
        lat: 13.8461602,
        lng: 100.566406,
      },
      title: 'Parque Simón Bolivar'
    },
    {
      position: {
        lat: 13.8779769,
        lng: 100.5876494,
      },
      title: 'Jardín Botánico'
    }
  ];


  constructor(
    private loadingCtr: LoadingController,
    private covidApi: CovidService,
    public geolocation: Geolocation
  ) { }

  ngOnInit() {
    alert('กรุณาเปิดใช้งาน GPS ทุกครั้ง ');
    this.loadingCtr.create({
      message: 'กำลังโหลด Map....'
    }).then((overley) => {
      this.loading = overley;
      this.loading.present();
      this.loading.dismiss(),
      this.location();
    });


    // alert("กรุณาเปิดใช้งาน GPS ทุกครั้ง ")
    // this.marker();
    // this.renderMarkers();
  }

  location() {
    const watch = this.geolocation.watchPosition();
    watch.subscribe((result) => {

      this.truck = new google.maps.LatLng(result.coords.latitude, result.coords.longitude);
      const mapOptions = {

        disableDefaultUI: true

      };
      // create a new map by passing HTMLElement
      const mapEle: HTMLElement = document.getElementById('map');
      // create LatLng object
      // const LatLng = {lat: 13.4444444, lng: 100.000000} ;

      // create map
      this.map = new google.maps.Map(mapEle, {
        center: this.truck,
        Zoom: 16,
      });
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEle.classList.add('show-map');
        // this.renderMarkers()
        this.markers.forEach(marker => {
          this.userlocation(marker);
          // this.marker(marker)
        });

      });

    });


  }

  // renderMarkers() {
  //   this.markers.forEach(marker => {
  //     this.addMarker(marker);
  //   });
  // }
  userlocation(marker: Marker) {
    return new google.maps.Marker({

      position: this.truck,
      map: this.map,


    });
    // marker(marker: Marker); {
    //   return new google.maps.Marker({
    //     position: marker.position,
    //     map: this.map,
    //     title: marker.title
    //   });
    // }
  }


}
