import { Component, OnInit } from '@angular/core';
// import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'monarch';
  // constructor(private meta: Meta) { }


  ngOnInit(): void {
    // this.meta.addTag({ httpEquiv: 'Content-Security-Policy', content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self'; img-src 'self'" });
  }


}
