import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  fileName: string = '';
  constructor(private fileService: FileService) { }
  images$: Observable<any>;
  images: any[] = [];
  @ViewChild('fileUpload') fileUpload: any;

  ngOnInit(): void {
    // this.images$ = this.fileService.getImages().pipe(startsWith([]))
    this.fileService.getImages().subscribe(data => {
      console.log(data)
      this.images = data.images
    })
  }

  onSelectFile(event: any) {
    event.preventDefault();
    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("image", file);

        this.fileService.upload(formData).subscribe(data => console.log(data));
    }
}

}

