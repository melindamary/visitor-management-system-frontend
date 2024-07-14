import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Chart ,registerables} from 'chart.js';

Chart.register(...registerables);

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
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    // Sort your data and labels based on the data in descending order
    let labels = ['House Keeping', 'Customer visit', 'Vendor Meetings', 'Interview', 'AC Service', 'CCTV Service', 'Fire extinguisher service', 'Plumbing related service', 'Pest control service', 'Water Purifier service', 'Access door service', 'Server room related', 'Laptop Vendors', 'Laptop technicians', 'Training', 'Chief guest', 'F&B Vendors', 'Others'];
    let data = [65, 59, 90, 81, 56, 55, 40,65, 59, 90, 81, 56, 55, 40,81, 56, 55, 0];
    // Sort data in descending order
    const sortedData = data.slice().sort((a, b) => b - a);
    const sortedLabels = labels.slice().sort((a, b) => data[labels.indexOf(b)] - data[labels.indexOf(a)]);
    
    const othersData = sortedData.slice(6);
    const others = othersData.reduce((a, b) => a + b, 0);
    sortedData.splice(6, othersData.length);
    sortedLabels.splice(6, othersData.length);
    sortedData.push(others);
    sortedLabels.push('Others');

    this.data = {
      labels: sortedLabels,
      datasets: [{
        data: sortedData,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(201, 203, 207, 1)'
        ],
        borderWidth: 1
      }]
    };
  

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        },
        
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            title: (tooltipItem: any) => {
              console.log(tooltipItem[0].label);
              
              return tooltipItem[0].label;

            },
            label: (context: any) => {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              
              if (context.parsed.y !== null) {
                // Calculate total within the function
                const total = context.chart.data.datasets[0].data.reduce((a: any, b: any) => a + b, 0);
                const percentage = (context.parsed.y / total) * 100;
                label += `${context.parsed.y} (${percentage.toFixed(2)}%)`;
              }
              return label;
            },
            footer: (tooltipItems: any) => {
              if (tooltipItems[0].label === 'Others') {
                const otherLabels = sortedLabels.slice(6).join(', ');
                const otherData = sortedData.slice(6).join(', ');
                
                return `${otherLabels}: ${otherData}`;
              }
              return '';
            }
          }
        }
      }
    };
  

    this.createRadarChart();

  }
  
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
