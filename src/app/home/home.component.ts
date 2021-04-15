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
  public show: boolean = false;
  public Edit: any = 'Show';

  constructor(
    private authenticationService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authenticationService.relationship().subscribe((res: any) => {
      this.data = res;
      this.authenticationService.relative(0).subscribe((res: any) => {
        if (res) {
          this.relative_data = res;
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
      if (res) {
        this.relative_data = res;
        console.log(res)
      }
    }, err => {
      console.log(err);
    });
  }


  onDelete = (id: number, id2: number) => {
    this.authenticationService.deleterelative(id).subscribe(
      resdata => {
        console.log("delete successfully")
        this.authenticationService.relative(id2).subscribe((res: any) => {
          if (res) {
            this.relative_data = res;
          }
        }, err => {
          console.log(err);
        });
      },
      error => {
        console.log("delete fail:::", error)
      }
    )
  };

  confirmDelete() {
    this.show = !this.show;
    if (this.show) {
      this.Edit = "Hide";
    } else {
      this.Edit = "Show";
      this.authenticationService.relationship().subscribe((res: any) => {
          this.data = res;
        },
        err => {
          console.log(err);
        });
    }
  }

  onUpdate(event, relativeid: number, relationid: number) {
    console.log(relativeid,relationid)
    const newVal = event.target.value;
    this.authenticationService.updaterelation(relativeid, newVal, ).subscribe(
      responsedata => {
        this.authenticationService.relative(relationid).subscribe((res: any) => {
          if (res) {
            this.relative_data = res;
            this.show = !this.show;
          }
        }, err => {
          console.log(err);
        });
      },
      err => {
        console.log(err);
      });
  }
}
