import { Component,OnInit ,NgZone,ElementRef, ViewChild} from '@angular/core';
import { gsap } from 'gsap';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
interface GridCell {
  active: boolean;
}
@Component({
  selector: 'app-parallax',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parallax.component.html',
  styleUrl: './parallax.component.scss'
})
export class ParallaxComponent implements OnInit {

//   // To maintain which section is being displayed.
//   currentSection: any;
//   constructor() { }

//   ngOnInit(): void {
//     // Register the ScrollTrigger with gsap
//     gsap.registerPlugin(ScrollTrigger);

//     // Get an array of all the sections
//     let sections = gsap.utils.toArray("section");

//     //Set the first section as the current section
//     this.currentSection = sections[0];

//     // Stretch out the body height according to however many sections there are. 
//     gsap.set("body", { height: (sections.length * 100) + "vh" });

    
//     // loop over section to create animations
//     sections.forEach((section: any, i) => {
//       // Set the background for each section
//       section.style.backgroundImage = `url(https://picsum.photos/${innerWidth}/${innerHeight}?random=${i})`;

//       // create a ScrollTrigger for each section
//       gsap.to(section, {
//         scrollTrigger: {

//           // use dynamic scroll positions based on the window height
//           start: () => (i - 0.5) * innerHeight,
//           end: () => (i + 0.5) * innerHeight,

//           // when a new section activates (from either direction), set the section accordinglyl.
//           onToggle: self => self.isActive && this.setCurrentSection(section)
//         }
//       });
//     });
//   }



// setCurrentSection(newSection: any) {
//   if (newSection !== this.currentSection) {
//     // Hide the current section by fading out
//     gsap.to(this.currentSection, { scale: 0.8, autoAlpha: 0 })
    
//     // Display the current section by fading in
//     gsap.to(newSection, { scale: 1, autoAlpha: 1 });
    
//     // Update the current section.
//     this.currentSection = newSection;
//   }
// }
@ViewChild('slider') sliderElement!: ElementRef;
@ViewChild('gridContainer') gridContainer!: ElementRef;
private isDragging = false;
private startX = 0;
private sliderLeft = 0;
sections = [
  { text: "WELCOME TO EXPERION TECHNOLOGIES" },
  { text: "GREAT TO SEE YOU" }

];

currentSectionIndex = 0;
gridCells: GridCell[] = [];
private animationInterval: any;
constructor(private router: Router, private ngZone: NgZone) {}
ngOnInit(): void {
  this.setBackgroundImages();
  this.createGrid();
  this.startAnimation();
}
createGrid() {
  for (let i = 0; i < 200; i++) {
    this.gridCells.push({ active: false });
  }
}

startAnimation() {
  this.animationInterval = setInterval(() => {
    this.gridCells.forEach((cell, index) => {
      if (Math.random() > 0.7) {
        cell.active = true;
        setTimeout(() => {
          cell.active = false;
        }, 300);
      }
    });
  }, 100);
}

stopAnimation() {
  if (this.animationInterval) {
    clearInterval(this.animationInterval);
  }
}
ngOnDestroy(): void {
  this.stopAnimation();
}

setBackgroundImages(): void {
  this.sections.forEach((section, i) => {
    gsap.set(`section:nth-child(${i + 1})`, {
      backgroundImage: `url(https://picsum.photos/${innerWidth}/${innerHeight}?random=${i})`
    });
  });
}



nextSection(): void {
  const nextIndex = (this.currentSectionIndex + 1) % this.sections.length;
  this.fadeSection(this.currentSectionIndex, nextIndex);
  this.currentSectionIndex = nextIndex;
}

fadeSection(fromIndex: number, toIndex: number): void {
  gsap.to(`section:nth-child(${fromIndex + 1})`, { autoAlpha: 0, duration: 1 });
  gsap.to(`section:nth-child(${toIndex + 1})`, { autoAlpha: 1, duration: 1 });
}


startSlide(event: MouseEvent | TouchEvent) {
  event.preventDefault();
  this.isDragging = true;
  this.startX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  this.sliderLeft = this.sliderElement.nativeElement.offsetLeft;
  
  document.addEventListener('mousemove', this.drag);
  document.addEventListener('touchmove', this.drag);
  document.addEventListener('mouseup', this.endSlide);
  document.addEventListener('touchend', this.endSlide);
}

drag = (event: MouseEvent | TouchEvent) => {
  if (!this.isDragging) return;
  const currentX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  const walk = currentX - this.startX;
  const containerWidth = this.sliderElement.nativeElement.parentElement.offsetWidth;
  const maxSlide = containerWidth - 50; // 50 is the width of the slider button
  
  let newPosition = Math.max(0, Math.min(this.sliderLeft + walk, maxSlide));
  this.sliderElement.nativeElement.style.left = `${newPosition}px`;

  if (newPosition >= maxSlide * 0.9) {
    this.endSlide();
    this.goToTodoPage();
  }
}

endSlide = () => {
  if (!this.isDragging) return;
  this.isDragging = false;
  document.removeEventListener('mousemove', this.drag);
  document.removeEventListener('touchmove', this.drag);
  document.removeEventListener('mouseup', this.endSlide);
  document.removeEventListener('touchend', this.endSlide);
  
  // Reset slider position if not slid far enough
  const containerWidth = this.sliderElement.nativeElement.parentElement.offsetWidth;
  const maxSlide = containerWidth - 50;
  if (this.sliderElement.nativeElement.offsetLeft < maxSlide * 0.9) {
    this.sliderElement.nativeElement.style.left = '0px';
  }
}

goToTodoPage(): void {
  this.ngZone.run(() => {
    this.router.navigate(['/amaindashbord']);
  });
}
}