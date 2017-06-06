import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recipe Box';
  recipes: Recipe[] = [
    new Recipe('Bell Peppers and Beef', 'Beef, Bell Peppers, olive oil, onions, garlic, mushrooms, soy sauce, teriyaki sauce', 'Peel the garlic and cut off the cap. Pour the olive oil into a pan/wok and stir-fry onion, bell pepper, mushrooms and garlic with the butter for about 5 minutes or less. Add ground beef and fry till cooked to taste. Take bouillon cube and crumble over the mixture, along with the soy and teriyaki sauce.', 4)
  ];
}

export class Recipe {
  constructor(public title: string, public ingredients: string, public instructions: string, public rating: number){ }
}
