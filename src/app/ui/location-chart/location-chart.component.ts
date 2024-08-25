import { HttpClient } from '@angular/common/http';
import { Component,AfterViewInit,OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { log } from 'console';
import { subscribe } from 'diagnostics_channel';
import { ChartModule } from 'primeng/chart';

interface ChartDataset {
  label: string;
  backgroundColor: string;
  borderColor: string;
  data: number[];
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

@Component({
  selector: 'app-location-chart',
  standalone: true,
  imports: [ChartModule,RouterLink],
  templateUrl: './location-chart.component.html',
  styleUrl: './location-chart.component.scss'
})
export class LocationChartComponent implements OnInit,AfterViewInit {
  // @ViewChild('chartContainer') chartContainer: ElementRef<HTMLElement>|undefined;

  data!: ChartData;
  options: any;

  constructor(private http:HttpClient){}

  ngOnInit() {
    

      const documentStyle = getComputedStyle(document.documentElement);
      // const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      // const surfaceBorder = documentStyle.getPropertyValue('--none');
      this.fetchChartData();

      // this.data = {
      //     labels: ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', 'Location 6', 'Location 7'],
      //     datasets: [
      //         {
      //             label: 'Passes Generated',
      //             backgroundColor: '#000',
      //             borderColor: '#000',
      //             data: [3, 59, 80, 81, 56, 55, 40]
      //         },
      //         {
      //             label: 'Active Visitors',
      //             backgroundColor: '#FF858C',
      //             borderColor:'#FF858C',
      //             data: [0, 48, 40, 19, 86, 27, 90]
      //         },
      //         {
      //           label: 'Scheduled Visitors',
      //           backgroundColor: '#7857FF',
      //           borderColor: '#7857FF',
      //           data: [3, 84, 20, 34, 55, 40, 50]
      //       }
      //     ]
      // };

      this.options = {
          indexAxis: 'y',
          maintainAspectRatio: false,
          aspectRatio: .8
          ,
          plugins: {                

              legend: {
                display:false,
                  labels: {

                      color: "blue"
                  }
              }
          },
          scales: {
              x: {
                position:'top',
                display:true


              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                 
              }
          }
      };
      // this.createScale();
      
  }


ngAfterViewInit() {
  // this.createScale();
}
fetchChartData() {
  this.http.get<any>('https://localhost:7121/Statistics/GetDashboardStatistics/dashboard').subscribe(res => {
    console.log(res);

    const labels: string[] = [];
    const passesGenerated: number[] = [];
    const activeVisitors: number[] = [];
    const totalVisitors: number[] = [];

    res.$values.forEach((item: any) => {
      labels.push(item.location);
      passesGenerated.push(item.passesGenerated || 0);
      activeVisitors.push(item.activeVisitors || 0);
      totalVisitors.push(item.totalVisitors || 0);
    });

    // Update chart data
    this.data = {
      labels: labels,
      datasets: [
        {
          label: 'Forms Submitted',
          backgroundColor: '#9792E8',
          borderColor: '#9792E8',
          data: passesGenerated
        },
        {
          label: 'Active Visitors',
          backgroundColor: '#3E68B9',
          borderColor: '#3E68B9',
          data: activeVisitors
        },
        {
          label: 'Total Visitors',
          backgroundColor: '#8061C3',
          borderColor: '#8061C3',
          data: totalVisitors
        }
      ]
    };

    console.log(this.data);
  });
}
// createScale() {
//   const scaleElement = document.querySelector('.scale') as HTMLElement;
//   if (!scaleElement) return;

//   const maxValue = Math.max(...this.data.datasets.flatMap(dataset => dataset.data));
//   const steps = 5;
//   const stepSize = Math.ceil(maxValue / steps);

//   for (let i = 0; i <= steps; i++) {
//     const value = i * stepSize;
//     const scaleItem = document.createElement('div');
//     scaleItem.textContent = value.toString();
//     scaleElement.appendChild(scaleItem);
//   }
// }

}

