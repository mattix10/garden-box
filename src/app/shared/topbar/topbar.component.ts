import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  header: string = '';

  constructor(private activatedRoute: ActivatedRoute, public router: Router, public location: Location) { }

  ngOnInit(): void {
    this.header = 'Panel';
    this.router.events
    .pipe(
      filter((event: any) => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      if(this.activatedRoute.firstChild) {
        this.activatedRoute.firstChild.url.subscribe(data =>{
          if(data != []) this.header = data[0]?.path;
        })
      }
      else {
        this.header = 'Panel';
      }
    })
  }


  extractChildUrl(path: string): string {
    const newPath = path.substring(1);
    console.log(newPath);
    const slashIndex = newPath.indexOf('/');
    return newPath;

  }
}
