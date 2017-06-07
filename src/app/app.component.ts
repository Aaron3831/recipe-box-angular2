import { Component } from '@angular/core';
import { ConfirmComponent } from './confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `

    <ul [class]="priorityColor(currentRecipe)" (click)="isDone(currentRecipe)" *ngFor="let currentRecipe of recipes"><button (click)="editRecipe(currentRecipe)">Edit!</button>
      <li>{{currentRecipe.title}}</li>
      <li>Ingredients: {{currentRecipe.ingredients}}</li>
      <li>Instructions: {{currentRecipe.instructions}}</li>
      <li>Rating: {{currentRecipe.rating}}</li>
      <li>Has anyone tried this recipe?: {{currentRecipe.done}}</li>
    </ul>

    <div *ngIf="selectedRecipe">
      <h4>Edit Recipe</h4>
      <input type="radio" [(ngModel)]="selectedRecipe.priority" [value]="1">1 (Simple)<br>
      <input type="radio" [(ngModel)]="selectedRecipe.priority" [value]="2">2 (Intermediate)<br>
      <input type="radio" [(ngModel)]="selectedRecipe.priority" [value]="3">3 (Master)
      <div>
        <label>Have you tried this recipe?</label>
        <select [(ngModel)]='selectedRecipe.done'>
          <option *ngFor='let status of doneStatus' [value]=status.value>
          {{status.display}}
          </option>
        </select>
      </div>
      <button (click)="finishedEditing()">Done</button>
    </div>
  `
})
// export class AppComponent {
//   title = 'Recipe Box';
//   recipes: Recipe[] = [
//     new Recipe('Bell Peppers and Beef', 'Beef, Bell Peppers, olive oil, onions, garlic, mushrooms, soy sauce, teriyaki sauce', 'Peel the garlic and cut off the cap. Pour the olive oil into a pan/wok and stir-fry onion, bell pepper, mushrooms and garlic with the butter for about 5 minutes or less. Add ground beef and fry till done to taste. Take bouillon cube and crumble over the mixture, along with the soy and teriyaki sauce.', 4)
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
  title = 'Recipe Box';
  recipes: Recipe[] = [
    new Recipe('Bell Peppers and Beef', 'Beef, Bell Peppers, olive oil, onions, garlic, mushrooms, soy sauce, teriyaki sauce', 'Peel the garlic and cut off the cap. Pour the olive oil into a pan/wok and stir-fry onion, bell pepper, mushrooms and garlic with the butter for about 5 minutes or less. Add ground beef and fry till done to taste. Take bouillon cube and crumble over the mixture, along with the soy and teriyaki sauce.', 4, 3)
  ];

  selectedRecipe = null;

  editRecipe(selectedRecipe) {
    this.selectedRecipe = selectedRecipe;
  }

  finishedEditing() {
    this.selectedRecipe = null;
  }

  isDone(clickedRecipe: Recipe) {
    if(clickedRecipe.done === 'true') {
      alert("This recipe has been done before!");
    } else {
      alert("This recipe hasn't been tried out yet, give it a go.");
    }
  }
  priorityColor(currentRecipe){
    if (currentRecipe.priority === 3){
      return "bg-danger";
    } else if (currentRecipe.priority === 2) {
      return  "bg-warning";
    } else {
      return "bg-info";
    }
  }
  public doneStatus = [
    {value: true, display: 'Yes'},
    {value: false, display: 'Nope'}
  ];
}

export class Recipe {
  public done: string = 'false';
  constructor(public title: string, public ingredients: string, public instructions: string, public rating: number, public priority: number){ }
}
