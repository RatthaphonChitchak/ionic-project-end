import { LoadingService } from './../loading.service';
import { NavController, LoadingController } from '@ionic/angular';
import { CovidService } from './../covid.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  fileUploadTask: AngularFireUploadTask;
  percentageVal: Observable<number>;
  trackSnapshot: Observable<any>;
  UploadedImageURL: Observable<string>;
  files: Observable<imgFile[]>;
  imgName: string;
  imgSize: number;
  isFileUploading: boolean;
  isFileUploaded: boolean;
  postProfile: string;
  private filesCollection: AngularFirestoreCollection<imgFile>;
  show: boolean = true;
  urlRegis = 'https://ratthaphoncovid19.herokuapp.com/api/auth/signup';
  regisform: FormGroup;
  constructor(
    public loading: LoadingService,
    private covidApi: CovidService,
    public navCtrl: NavController,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    this.regisform = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('')]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z.a-z]')]),
      tel: new FormControl('', [Validators.required, Validators.pattern('')]),
      username: new FormControl('', [Validators.required, Validators.pattern('')]),
      password: new FormControl('', [Validators.required, Validators.pattern('')])
    });
    this.isFileUploading = false;
    this.isFileUploaded = false;
    
    // Define uploaded files collection
    this.filesCollection = afs.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();
  }
  ngOnInit() {
  }
  async ngSubmit() {
    await this.loading.presentLoadingWithOptions();
    this.register();
    this.loading.dismissOnPageChange();
  }
  async register() {
    await this.loading.presentToastWithOptions
    try {
      const regishome = {
        firstName: this.regisform.value.firstName,
        lastName: this.regisform.value.lastName,
        username: this.regisform.value.username,
        password: this.regisform.value.password,
        email: this.regisform.value.email,
        tel: this.regisform.value.tel,
        profileImageURL: this.postProfile,
      };
      const regis = await this.covidApi.register(this.urlRegis, regishome);
      this.navCtrl.navigateForward('login');
      this.loading.dismissOnPageChange();
    } catch (error) {
      this.loading.dismissOnPageChange();
    }
  }
  uploadImage(event: FileList) {
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') { 
      console.log('File type is not supported!')
      return;
    }
    this.isFileUploading = true;
    this.isFileUploaded = false;
    this.imgName = file.name;
    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    const imageRef = this.afStorage.ref(fileStoragePath);
    this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);
    this.percentageVal = this.fileUploadTask.percentageChanges();
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      
      finalize(() => {
        this.UploadedImageURL = imageRef.getDownloadURL();
        this.UploadedImageURL.subscribe(resp=>{
          this.storeFilesFirebase({
            name: file.name,
            filepath: resp,
            size: this.imgSize
          });
          this.isFileUploading = false;
          this.isFileUploaded = true;
        },error=>{
          console.log(error);
        })
      }),
      tap(snap => {
          this.imgSize = snap.totalBytes;
      })
    )
}
storeFilesFirebase(image: imgFile) {
    const fileId = this.afs.createId();
    this.postProfile = image.filepath;
    this.filesCollection.doc(fileId).set(image).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
}
}
