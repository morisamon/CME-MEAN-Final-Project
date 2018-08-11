import { Component } from '@angular/core';
import {TaskService} from './services/task.service';
import { DataService } from './services/DataService/data.service';
import { SVM } from 'svm';
import { SvmVectorService } from './admin/services/svmvectors.service';
import { svmVector } from './components/game-zone/variables';

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
