import { Component } from '@angular/core';
import { Globals } from './Global'
import { Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'FreshVegBox';
  cartCount :number;
  global:Globals;
  constructor( globals:Globals,private router: Router){
  this.global=globals;
  }

products(){
  this.router.navigate(['/products'], { queryParams: {id:17}, skipLocationChange: true}).then(nav => {
    console.log(nav); // true if navigation is successful
  }, err => {
    console.log(err) // when there's an error
  });

}

handleClick(event: Event) {
  console.log('eee', event)
  this.router.navigate(['/products'], { queryParams: {id:17}, skipLocationChange: true}).then(nav => {
    console.log(nav); // true if navigation is successful
  }, err => {
    console.log(err) // when there's an error
  });
}

}
