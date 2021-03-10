import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { AdminUsersService } from '../services/admin-users.service';
// import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  public displayedColumns = [
    "id",
    "first_name",
    "last_name",
    "email",
    "gender",
    "image"
  ];
  public dataSource: MatTableDataSource<any>;
  pageSize = 5;
  pageSizeOptions = [5];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [
        {
          id: 'x-axis-0',
          gridLines: {
            color: '#D21016'
          },
          ticks: {
            fontColor: 'white',
          }
        }
      ],
      yAxes: [

        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            // color: 'rgba(255,0,0,0.3)',
            color: '#36A2EB'
          },
          ticks: {
            fontColor: 'white',
          }
        }
      ]
    },
    annotation: {},
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  // public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private service: AdminUsersService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.service
      .getUsers()
      .toPromise().then((response: any) => {
        this.dataSource = new MatTableDataSource<any>(response.users);
        this.dataSource.paginator = this.paginator;
      });

    this.setLineChartData();
  }

  setLineChartData() {
    this.service
      .getSales()
      .toPromise().then((response: any) => {
        let comodin = [];
        response.sales.forEach((element: any) => {
          comodin.push(element.car_make);
        });
        const dataArr = new Set(comodin);
        this.lineChartLabels = [...dataArr];
        console.log(this.lineChartLabels)

        let dataSet = [];
        this.lineChartLabels.forEach((maker: Label) => {
          let data = [];
          // let data: number = 0;
          response.sales.forEach(element => {
            if (element.car_make === maker) {
              data.push(element.quantity)
              // data = data + element.quantity;
            }
          });
          // console.log('data ', data)
          if (data.length > 0) {
            dataSet.push({ data: data, label: '' + maker + '' })
          }
        });
        this.lineChartData = dataSet;
        console.log(this.lineChartData)
      });
  }

  public sanitizer(image: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustUrl(image);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

}
