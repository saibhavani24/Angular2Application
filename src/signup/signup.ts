import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Country } from './country';

const styles   = require('./signup.css');
const template = require('./signup.html');

@Component({
  selector: 'signup',
  template: template,
  styles: [ styles ]
})
export class Signup {
  selectedCountry: Country = new Country(2, 'India');
  countries = [
    new Country(1, 'USA' ),
    new Country(2, 'India' ),
    new Country(3, 'Australia' ),
    new Country(4, 'Brazil')
 ];
  constructor(public router: Router, public http: Http) {
  }

  signup(event, name, password) {
    event.preventDefault();
    let body = JSON.stringify({ name, password });
    this.http.post('http://localhost:1978/register', body, { headers: contentHeaders })
      .subscribe(
        response => {
          this.router.navigate(['home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

}
