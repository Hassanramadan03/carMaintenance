import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../../service/about.service';
import { FormGroup, FormBuilder } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  about: any = {};
  blogsForm: FormGroup;
  loading: Boolean = false;
  upload: Boolean = false;
  hero:any={}
  private internalImage2: File = null;
  isValidImage: Boolean = null;
  emageEdit: Boolean = true;
  constructor(private fb: FormBuilder,
    private aboutService: AboutService,
  ) { }

  ngOnInit() {
    this.getAbout()
  }

  getAbout() {
    this.aboutService.getAbout().subscribe((data) => {
      console.log(data)
      this.about = data.result;
    })
  }
  updateAbout() {
    this.loading = true
    this.aboutService.updateAbout(this.about).subscribe((result) => {
      console.log(result)
      this.loading = false;
    })
  }
  onUpdate() {
    this.uploadimage()
    this.aboutService.updateAbout(this.about).subscribe((data) => {

      this.getAbout()
      console.log(data)
    })
  }
  uploadimage() {
    var data = new FormData();
    $.each($("input[type='file']")[0].files, function (i, file) {
      console.log(file)
      data.append('chairmanImage', file);

    });

    $.ajax({
      type: 'Post',
      url: 'http://192.168.1.177:8080/editAboutUs',
      cache: false,
      datatype: false,
      contentType: false,
      processData: false,
      data: data,
      success: function (result) {
        if (result) {
          console.log('success');
          console.log(result);
        }

      },
      error: function (err) {
        console.log(err);
      }
    })
  }
  handleFileSelectInternal2(evt) {
    this.internalImage2 = <File>evt.target.files[0];
  }
}