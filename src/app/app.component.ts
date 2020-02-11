import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "./api.service";
import { Lang, Letter } from "./interfaces";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public dateTime: string;
  public showPersonDetailsForm: boolean = false;

  public fg: FormGroup;

  private letter: Letter;
  private submitted = false;

  data: any = {
    types: [],
    langs: []
  };

  public constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.api.getData().subscribe(data => {
      this.data = data;
    });
    this.dateTime = new Date().toLocaleString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZoneName: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    this.letter = {
      person: null,
      lang: Lang["spanish"],
      type: 0
    };
    this.fg = this.formBuilder.group({
      title: ["", []],
      firstName: ["", []],
      lastName: ["", []],
      charge: ["", []],
      organization: ["", []],
      address: ["", []],
      details: ["", []],
      city: ["", []],
      country: ["", []],
      lang: ["", [Validators.required]]
    });
  }

  public setShowPersonDetailsForm(value: boolean) {
    this.showPersonDetailsForm = value;
  }

  get f() {
    return this.fg.controls;
  }

  public onSubmit(type: number) {
    this.submitted = true;

    if (this.fg.invalid) {
      return;
    }

    if (this.showPersonDetailsForm) {
      const {
        title,
        firstName,
        lastName,
        charge,
        organization,
        address,
        details,
        city,
        country
      } = this.fg.value;

      this.letter.person = {
        title,
        firstName,
        lastName,
        charge,
        address: {
          organization,
          address,
          details,
          city,
          country
        }
      };
    }

    this.letter.lang = this.fg.value.lang;
    this.letter.type = type;

    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.letter, null, 2));
  }
}
