import { Component } from '@angular/core';
import {TaskService} from './services/task.service';
import { DataService } from './services/DataService/data.service';
import { SvmVector } from './models/SvmVector';
import { SVM } from 'svm';
import { SvmVectorService } from './admin/services/svmvectors.service';

const svmVector: SvmVector[] = [
    { "total_time" : 72.049, "video_duration" : 31.557333, "vagrancy_time" : 10.491667, "area1" : 1, "area2" : 4, "area3" : 0, "area4" : 0, "area5" : 3, "area6" : 1, "areaface" : 3, "areaeyes" : 3, "label" : 1 },
    { "total_time" : 81.141, "video_duration" : 26.688, "vagrancy_time" : 28.453, "area1" : 2, "area2" : 3, "area3" : 0, "area4" : 0, "area5" : 2, "area6" : 0, "areaface" : 3, "areaeyes" : 3, "label" : 1 },
    { "total_time" : 50.12, "video_duration" : 18.24, "vagrancy_time" : 28.453, "area1" : 2, "area2" : 0, "area3" : 1, "area4" : 2, "area5" : 0, "area6" : 1, "areaface" : 4, "areaeyes" : 3, "label" : 1 },
    { "total_time" : 509.887, "video_duration" : 39.919999, "vagrancy_time" : 295.967001, "area1" : 31, "area2" : 37, "area3" : 0, "area4" : 2, "area5" : 3, "area6" : 0, "areaface" : 11, "areaeyes" : 3, "label" : 1 },
    { "total_time" : 86.478, "video_duration" : 21.744, "vagrancy_time" : 50.734, "area1" : 1, "area2" : 1, "area3" : 0, "area4" : 0, "area5" : 1, "area6" : 0, "areaface" : 1, "areaeyes" : 3, "label" : 1 },
    { "total_time" : 126.594, "video_duration" : 15.92, "vagrancy_time" : 82.674, "area1" : 2, "area2" : 2, "area3" : 2, "area4" : 2, "area5" : 2, "area6" : 0, "areaface" : 1, "areaeyes" : 3, "label" : 1 },

{
  "total_time" : 139.972,
  "video_duration" : 31.557333,
"vagrancy_time" : 84.414667,
"area1" : 3,
"area2" : 0,
"area3" : 1,
"area4" : 2,
"area5" : 2,
"area6" : 1,
"areaface" : 2,
"areaeyes" : 3,
"label" : 1
},

{
  "total_time" : 131.405,
  "video_duration" : 26.688,
"vagrancy_time" : 62.717,
"area1" : 0,
"area2" : 4,
"area3" : 0,
"area4" : 1,
"area5" : 1,
"area6" : 0,
"areaface" : 12,
"areaeyes" : 3,
"label" : 1
},

{
  
  "total_time" : 89.794,
  "video_duration" : 18.24,
"vagrancy_time" : 43.554,
"area1" : 1,
"area2" : 1,
"area3" : 0,
"area4" : 3,
"area5" : 1,
"area6" : 1,
"areaface" : 4,
"areaeyes" : 3,
"label" : 1
},

{
  "total_time" : 144.685,
  "video_duration" : 31.557333,
"vagrancy_time" : 63.127667,
"area1" : 4,
"area2" : 2,
"area3" : 2,
"area4" : 3,
"area5" : 3,
"area6" : 0,
"areaface" : 8,
"areaeyes" : 3,
"label" : 1
},

{
  "total_time" : 147.526,
  "video_duration" : 26.688,
"vagrancy_time" : 60.838,
"area1" : 2,
"area2" : 0,
"area3" : 16,
"area4" : 2,
"area5" : 3,
"area6" : 0,
"areaface" : 4,
"areaeyes" : 3,
"label" : -1
},

{
  "total_time" : 338.665,
  "video_duration" : 15.92,
"vagrancy_time" : 202.745,
"area1" : 1,
"area2" : 9,
"area3" : 33,
"area4" : 5,
"area5" : 9,
"area6" : 0,
"areaface" : 0,
"areaeyes" : 3,
"label" : -1
},

{
  "total_time" : 207.205,
  "video_duration" : 15.92,
"vagrancy_time" : 87.285,
"area1" : 2,
"area2" : 0,
"area3" : 17,
"area4" : 1,
"area5" : 5,
"area6" : 22,
"areaface" : 2,
"areaeyes" : 3,
"label" : -1
},

{
  "total_time" : 185.758,
  "video_duration" : 31.557333,
"vagrancy_time" : 62.200667,
  "area1" : 0,
  "area2" : 5,
  "area3" : 23,
  "area4" : 1,
  "area5" : 3,
  "area6" : 10,
  "areaface" : 1,
  "areaeyes" : 3,
  "label" : -1
},

{
  "total_time" : 190.342,
  "video_duration" : 15.92,
"vagrancy_time" : 68.422,
  "area1" : 2,
  "area2" : 1,
  "area3" : 18,
  "area4" : 2,
  "area5" : 2,
  "area6" : 21,
  "areaface" : 4,
  "areaeyes" : 3,
  "label" : -1
}]


@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls:['./app.component.css'],
  providers:[TaskService, DataService]
})

export class AppComponent {

  private svm: SVM = new SVM();
  private dataset: Number[][] = [[]];
  private labels: Number[] = [];

  constructor(private dataService : DataService, private svmVectorService : SvmVectorService) {
    svmVectorService.getDataSet().subscribe(data => {
      console.log(data);
      this.InitDataSetToVector();
      if(data.length == 0){
        for(var i=0;i<svmVector.length;i++){
          var x = this.svmVectorService.ConvertVectorToObject(this.dataset[i],this.labels[i]);
          this.svmVectorService.addNewVector(x).subscribe(data => {
            console.log(data.msg);
            if(data.success){
              console.log("svm vector inserted to mongo");
            } else {
              alert("Error while writting the svm vector to mongo db");
            }
          });
        }
      }
    });
  }

  private InitDataSetToVector(){
    for(var i=0;i<svmVector.length;i++){
      var x = svmVector[i];
      this.dataset[i]=[x.total_time, x.video_duration,x.vagrancy_time,x.area1,x.area2,x.area3,x.area4,x.area5,x.area6,x.areaface,x.areaeyes];
      this.labels[i]=x.label;
    }
  }

  public StartTrain(){
    console.log("Train");
  }

  public StartGame(){
    console.log("Game");

  }

}
