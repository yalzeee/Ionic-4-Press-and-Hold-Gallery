import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selected: Array<object>;
  highlight= {

  }
  myArray=['Item1','Item2','Item3','Item4','Item5','Item6']
  constructor(public renderer: Renderer2){
    this.selected = [];

  }
  onHold(event, item) {
    console.log('Held')
    console.log('event', event, 'item', item);
    const name = item;
    if (this.highlight[name]) {
      this.highlight[name] = false;
      const element = (event.target).closest('ion-item');
      this.renderer.setStyle(element, 'color', '');
      const index = this.selected.indexOf(item);
      this.selected.splice(index, 1);
    }
    else {
      this.highlight[name] = true;
      const element = (event.target).closest('ion-item');
      this.renderer.setStyle(element, 'color', '#FF7F50')
      this.selected.push(item);
    }
    console.log(this.selected);

  }
  onClick(event, item) {
    if (this.selected.indexOf(item) > -1) {
      const name = item;
      if (this.highlight[name]) {
        this.highlight[name] = false;
        const element = (event.target).closest('ion-item');
        this.renderer.setStyle(element, 'color', '');
        const index = this.selected.indexOf(item);
        this.selected.splice(index, 1);
      }
      else {
        this.highlight[name] = true;
        const element = (event.target).closest('ion-item');
        this.renderer.setStyle(element, 'color', '#FF7F50')
        this.selected.push(item);
      }

    }
    else if (this.selected.length > 0 && this.selected.indexOf(item) === -1) {
      console.log('This is the second possibility')
      const name = item;
      this.highlight[name] = true;
      const element = (event.target).closest('ion-item');
      this.renderer.setStyle(element, 'color', '#FF7F50')
      this.selected.push(item);
    }

  }
}
