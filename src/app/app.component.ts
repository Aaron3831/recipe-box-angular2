import { Component } from '@angular/core';
import { ConfirmComponent } from './confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <div class="container">
      <button class="btn btn-default" (click)=showConfirm()>Show confirm</button>
    </div>

    <div *ngFor="let recipe of recipes">
      <h3>{{recipe.title}}</h3>
      <p>{{recipe.ingredients}}</p>
      <p>{{recipe.instructions}}</p>
      <p>{{recipe.rating}}</p>
    </div>
  `
})
// export class AppComponent {
//   title = 'Recipe Box';
//   recipes: Recipe[] = [
//     new Recipe('Bell Peppers and Beef', 'Beef, Bell Peppers, olive oil, onions, garlic, mushrooms, soy sauce, teriyaki sauce', 'Peel the garlic and cut off the cap. Pour the olive oil into a pan/wok and stir-fry onion, bell pepper, mushrooms and garlic with the butter for about 5 minutes or less. Add ground beef and fry till cooked to taste. Take bouillon cube and crumble over the mixture, along with the soy and teriyaki sauce.', 4)
//   ];
// }

export class AppComponent {
    constructor(private dialogService:DialogService) {}
    showConfirm() {
        let disposable = this.dialogService.addDialog(ConfirmComponent, {
            title:'Confirm title',
            message:'Confirm message'})
            .subscribe((isConfirmed)=>{
                //We get dialog result
                if(isConfirmed) {
                    alert('accepted');
                }
                else {
                    alert('declined');
                }
            });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        setTimeout(()=>{
            disposable.unsubscribe();
        },10000);
    }
}

export class Recipe {
  constructor(public title: string, public ingredients: string, public instructions: string, public rating: number){ }
}
