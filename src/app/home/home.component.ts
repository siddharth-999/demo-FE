import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: [];
  relative_data = [];
  user_data = [];
  public show: boolean = false;
  public Edit: any = 'Show';
  public familyForm: FormGroup;
  constructor(
    private authenticationService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.authenticationService.relationship().subscribe((res: any) => {
      this.data = res;
    }, err => {
      console.log(err);
    });
    this.authenticationService.userlist().subscribe((res: any) => {
      if (res) {
        this.user_data = res;
        console.log(res)
      }
    }, err => {
      console.log(err);
    });
    this.familyForm = this.formBuilder.group({
      relative : '',
      relations : ''
    });
  }

  get fval() { return this.familyForm.controls; }

  onDelete = (id: number, id2: number) => {
    this.authenticationService.deleterelative(id).subscribe(
      resdata => {
        console.log("delete successfully")
        console.log(this.fval.relative.value,
          this.fval.relations.value,"ewsffs")
          this.onSubmit()
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
          this.onSubmit()
      },
      err => {
        console.log(err);
      });
      this.show = !this.show;
  }

  onSubmit(){
    this.authenticationService.relative(this.fval.relative.value,
       this.fval.relations.value).subscribe((res: any) => {
      if (res) {
        this.relative_data = res;
        this.show = !this.show;
        console.log(res)
      }
    }, err => {
      console.log(err);
    });
  }
}
