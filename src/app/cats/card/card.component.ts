import { Component, Input } from '@angular/core';
import { ICat } from '../../communication';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() item: ICat | undefined;
}
