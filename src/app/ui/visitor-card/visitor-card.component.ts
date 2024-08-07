import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-visitor-card',
  standalone: true,
  imports: [],
  templateUrl: './visitor-card.component.html',
  styleUrl: './visitor-card.component.scss'
})
export class VisitorCardComponent {
  @ViewChild('visitorCard', { static: false }) visitorCard!: ElementRef;
  downloadAsPdf() {
    const card = this.visitorCard.nativeElement;
    html2canvas(card, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width/2, canvas.height/2]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width/2, canvas.height/2);
      pdf.save('visitor_card.pdf');
    });
  }

}
