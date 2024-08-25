import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';


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
  constructor(private http: HttpClient) {
}

 
  ngOnInit() {

    // let data:any=this.fetchpiedata();


    // let data = [
    //   { value: 100, name: 'House Keeping' },
    //   { value: 100, name: 'CCTV Service' },
    //   { value: 48, name: 'Vendor Meetings' },
    //   { value: 48, name: 'Chief guest' },
    //   { value: 48, name: 'Laptop technicians' },
    //   { value: 28, name: 'Customer visit' },
    //   { value: 96, name: 'Fire extinguisher service' },
    //   { value: 40, name: 'Plumbing related service' },
    //   { value: 19, name: 'Pest control service' },
    //   { value: 19, name: 'Water Purifier service' },
    //   { value: 96, name: 'Access door service' },
    //   { value: 0, name: 'Server room related' },
    //   { value: 28, name: 'Laptop Vendors' },
    //   { value: 48, name: 'Laptop technicians' },
    //   { value: 0, name: 'Training' },
    //   { value: 48, name: 'Chief guest' },
    //   { value: 0, name: 'F&B Vendors' }
    // ];
    this.fetchpiedata().then((data: any[]) => {
      let { top6, otherItems } = this.prepareData(data);
  
      // ... rest of your code ...
  

    // let { top6, otherItems } = this.prepareData(data);

    const colors = [
      '#64A2F5','#3E68B9','#8061C3','#9792E8','#756DE8', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
    ];

    this.data = {
      labels: top6.map((item: { name: any; }) => item.name),
      datasets: [
        {
          data: top6.map((item: { value: any; }) => item.value),
          backgroundColor: colors,
          radius:'80%'
        }
      ]
    };

    this.options = {
      plugins: {
        title: {
          display: true,
          font: {
            size: 16,
            color:'#00000',
            weight:'bolder'
          },      
          padding: {
            top: 10,
            bottom: 30  // This will add some space between the title and the legend
          }
        },
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            usePointStyle: true,
            boxWidth: 6,       
             font: {
              size: 12 ,            
              color:'#00000',
              // Increase font size for better readability
            }
          }
            },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              if (context.label === 'Others') {
                return otherItems;
              } else {
                let value = context.raw;
                let total = context.chart.getDatasetMeta(0).total;
                let percentage = Math.round((value / total) * 100);
                return `${context.label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
      // ,
      // layout: {
      //   padding: {
      //     top: 20,
      //     bottom: 20,
      //     left: 20,
      //     right: 20
      //   }
      // }
    };
  
  });


  }


  fetchpiedata() {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>('https://localhost:7121/Statistics/GetPurposeStatistics/purpose').subscribe(res => {
        let formattedData = res.$values.map((item: { value: any; name: any; }) => {
          return { value: item.value, name: item.name };
        });
        console.log(formattedData);
        resolve(formattedData);
      }, error => {
        reject(error);
      });
    });
//   fetchpiedata() {
//     this.http.get<any> ('https://localhost:7121/Statistics/GetPurposeStatistics/purpose').subscribe((res)=>{
//       console.log(res);
      
//     })

// }



// fetchpiedata() {
//   this.http.get<any>('https://localhost:7121/Statistics/GetPurposeStatistics/purpose').subscribe((res) => {
//     let formattedData = res.$values.map((item: { value: any; name: any; }) => {
//       return { value: item.value, name: item.name };
//     });
//     console.log(formattedData);
//     return formattedData;
//   })
// }


  

}
prepareData(data: any[]) {
  // Sort the data in descending order
  data.sort((a, b) => b.value - a.value);

  // Extract the top 6 values
  let top6 = data.slice(0, 6);

  // Create the "Others" slice with the remaining values
  let others = data.slice(6);
  let othersValue = others.reduce((acc, item) => acc + item.value, 0);
  top6.push({
    value: othersValue,
    name: 'Others'
  });

  // Prepare the otherItems array
  let otherItems = others.map((item) => `${item.name}: ${item.value}`);

  return { top6, otherItems };
}
}
