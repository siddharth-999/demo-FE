import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: [];
  relative_data = [];
  constructor(
    private authenticationService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authenticationService.relationship().subscribe((res: any) => {
      this.data = res;
      this.authenticationService.relative(0).subscribe((res: any) => {
        if(res.results){
          this.relative_data = res.results;
        }
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });
  }

  onChange(event) {
    const newVal = event.target.value;
    this.authenticationService.relative(newVal).subscribe((res: any) => {
      if(res.results){
        this.relative_data = res.results;
      }
    }, err => {
      console.log(err);
    });
  }


  onDelete = (id:number, id2:number) => {
    this.authenticationService.deleterelative(id).subscribe(
      resdata => {
        console.log("delete successfully")
        this.authenticationService.relative(id2).subscribe((res: any) => {
          if(res.results){
            this.relative_data = res.results;
          }
        }, err => {
          console.log(err);
        });
      },
      error => {
        console.log("delete fail:::",error)
      }
    )
  };
}
