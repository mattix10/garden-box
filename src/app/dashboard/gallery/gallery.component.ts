import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  fileName: string = '';
  constructor(private fileService: FileService) { }


  ngOnInit(): void {
  }

  onSelectFile(event: any) {

    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);

        this.fileService.upload(formData);
    }
}


}
