import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-purpose-pie',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './purpose-pie.component.html',
  styleUrl: './purpose-pie.component.scss'
})
export class PurposePieComponent {
  data: any;

  options: any;
 
  ngOnInit() {
    this.createRadarChart();

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    // Sort your data and labels based on the data in descending order
    let labels = ['House Keeping', 'Customer visit', 'Vendor Meetings', 'Interview', 'AC Service', 'CCTV Service', 'Fire extinguisher service', 'Plumbing related service', 'Pest control service', 'Water Purifier service', 'Access door service', 'Server room related', 'Laptop Vendors', 'Laptop technicians', 'Training', 'Chief guest', 'F&B Vendors', 'Others'];
    let data = [65, 59, 90, 81, 56, 55, 40,65, 59, 90, 81, 56, 55, 40,81, 56, 55, 0];

    // let list = [];
    // for (let j = 0; j < labels.length; j++)
    //     list.push({'label': labels[j], 'data': data[j]});

    // // Sorting the array based on 'data'
    // list.sort(function(a, b) {
    //     return ((a.data > b.data) ? -1 : ((a.data == b.data) ? 0 : 1));
    // });

    // // Separate the top 6 and the rest
    // let topSixList = list.slice(0, 6);
    // let restList = list.slice(6);

    // // Prepare your final labels and data
    // let finalLabels = topSixList.map(a => a.label);
    // let finalData = topSixList.map(a => a.data);

    // // Calculate the sum of the rest of the data
    // let restSum = restList.reduce((a, b) => a + b.data, 0);

    // // Add the rest as the 7th category
    // finalLabels.push('Others');
    // finalData.push(restSum);

    this.data = {
      labels: labels,
      datasets: [
          {   
              data: data,
              backgroundColor: [
                '#1E90FF', // DodgerBlue
                '#FFD700', // Gold
                '#008000', // Green
                '#FF0000', // Red
                '#800080', // Purple
                '#FFA500', // Orange
                '#008080', // Teal
                '#FFC0CB', // Pink
                // '#4B0082', // Indigo
                // '#32CD32', // LimeGreen
                // '#00FFFF', // Cyan
                // '#FFBF00', // Amber
                // '#808080', // Gray
                // '#A52A2A', // Brown
                // '#ADD8E6', // LightBlue
                // '#FF8C00', // DarkOrange
                // '#9400D3', // DarkViolet
                // '#90EE90'  // LightGreen
            ],
            hoverBackgroundColor: [
                '#104E8B', // DodgerBlue4
                '#8B6508', // DarkGoldenrod4
                '#006400', // DarkGreen
                '#8B0000', // DarkRed
                '#551A8B', // Purple4
                '#8B4500', // DarkOrange4
                '#4F4F2F', // DarkOliveGreen4
                '#8B3A62', // PaleVioletRed4
                '#2E0854', // Indigo4
                '#1C853D', // LimeGreen4
                '#008B8B', // DarkCyan
                '#8B7D26', // Khaki4
                '#525252', // Gray32
                '#8B2323', // Brown4
                '#68838B', // LightBlue4
                '#8B4500', // DarkOrange4
                '#551A8B', // Purple4
                '#548B54'  // PaleGreen4
            ]
            
          }
      ]
  };


  

    this.options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
              }
            }

        
    };
  


      // const documentStyle = getComputedStyle(document.documentElement);
      // const textColor = documentStyle.getPropertyValue('--text-color');

      // this.data = {
      //     labels: ['House Keeping',
      //       'Customer visit',
      //       'Vendor Meetings',
      //       'Interview',
      //       'AC Service',
      //       'CCTV Service',
      //       'Fire extinguisher service',
      //       'Plumbing related service',
      //       'Pest control service',
      //       'Water Purifier service',
      //       'Access door service',
      //       'Server room related',
      //       'Laptop Vendors',
      //       'Laptop technicians',
      //       'Training',
      //       'Chief guest',
      //       'F&B Vendors',
      //       'Others'],
      //     datasets: [
      //         {   
      //             data: [65, 59, 90, 81, 56, 55, 40,65, 59, 90, 81, 56, 55, 40,81, 56, 55, 40],
      //             backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
      //             hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
      //         }
      //     ]
      // };

      // this.options = {
      //     plugins: {
      //         legend: {
      //             labels: {
      //                 usePointStyle: true,
      //                 color: textColor
      //             }
      //         }
      //     }
      // };
  
  createRadarChart(): void {
    const canvas = document.getElementById('myRadarChart') as HTMLCanvasElement;
    if (canvas) {
      canvas.height = 600;  // Replace with your desired height
      canvas.width = 600; // Replace with your desired width
      new Chart(canvas, {
        
        type: 'radar',
        data: {
          labels: ['House Keeping',
            'Customer visit',
            'Vendor Meetings',
            'Interview',
            'AC Service',
            'CCTV Service',
            'Fire extinguisher service',
            'Plumbing related service',
            'Pest control service',
            'Water Purifier service',
            'Access door service',
            'Server room related',
            'Laptop Vendors',
            'Laptop technicians',
            'Training',
            'Chief guest',
            'F&B Vendors',
            'Others'],
          datasets: [
        
            {
              label: 'Experion visitor purpose',

              data: [  100,28, 48, 0, 19, 100,96, 0,40, 19, 96, 0,28, 48,0, 48, 0, 10],
              fill: true,
              backgroundColor: 'rgba(100, 10, 20, 0.2)',
              borderColor: '#952991',
              pointBackgroundColor: '#952991',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#FF858C',
              pointHoverBorderColor: '#952991'
            }
          ]
        },
        options: {
          maintainAspectRatio: false, // Add this line
          responsive: true, // Add this line if you want the chart to be responsive
          // aspectRatio:false,
          elements: {
            line: {
              borderWidth: 3
            }
          }
        }
      });
    }
  }

}
