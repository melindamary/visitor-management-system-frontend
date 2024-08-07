import { Component,Input } from '@angular/core';
@Component({
  selector: 'app-tiles',
  standalone: true,
  imports: [],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.scss'
})
export class TilesComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() backgroundColor: string = '#896CC7';
  @Input() icon: string = 'pi-user';


}
