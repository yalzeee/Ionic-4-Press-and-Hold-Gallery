import { Component, Input, OnInit, ElementRef, Renderer2, NgZone } from '@angular/core';
import { Platform, DomController } from '@ionic/angular';

@Component({
  selector: 'app-expandable-header',
  templateUrl: './expandable-header.component.html',
  styleUrls: ['./expandable-header.component.scss'],
})
export class ExpandableHeaderComponent implements OnInit {
  animating: boolean = false;

  newHeaderHeight: any;
  @Input('scrollArea') scrollArea: any;
  @Input('secondBar') secondBar: any;
  @Input('headerHeight') headerHeight: number;
  @Input('gradient') gradient: boolean;
  constructor(public platform: Platform, public element: ElementRef, public renderer: Renderer2, public zone: NgZone, public domCtrl: DomController) { }

  ngOnInit() {
    console.log(this.scrollArea)
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
    })
    this.scrollArea.ionScroll.subscribe((ev) => {
      console.log(ev)
      this.resizeHeader(ev);
      this.scrollArea.resize();
    });
  }

  resizeHeader(ev) {
    console.log('resizing header')
    ev.domWrite(() => {
      var direction;
      if (ev.deltaY > 200) {
        this.newHeaderHeight = 0
        opacity = 0.8;
        direction = 'up';
        this.animateHeader(direction)
      }
      if (ev.deltaY < -200) {
        this.newHeaderHeight = this.headerHeight;
        opacity = 1;
        direction = 'down';
        this.animateHeader(direction)
      }

      var opacity;

      if (this.newHeaderHeight < 0) {
        this.newHeaderHeight = 0;
        opacity = 0.8;
      }
      this.domCtrl.write(() => {
        if (this.secondBar) {
          this.renderer.setStyle(this.secondBar, 'opacity', opacity);
        }
      });
    })

  }
  animateHeader(direction) {
    console.log('animating', this.animating)
    if (!this.animating) {
      this.animating = true;
      console.log(direction)
      if (direction === 'up') {
        for (let i = this.headerHeight; i > 0; i -= 0.05) {
          console.log(direction, i)
          this.domCtrl.write(() => {
            this.renderer.setStyle(this.element.nativeElement, 'height', i + 'px')
          })
        }
        this.animating = false
      }
      else if (direction === 'down') {
        for (let i = 0; i <= this.headerHeight; i += 0.05) {
          console.log(direction, i)
          this.domCtrl.write(() => {
            this.renderer.setStyle(this.element.nativeElement, 'height', i + 'px')
          })
        }
        this.animating = false;
      }
    }
  }
}
