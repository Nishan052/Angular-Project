import { Component, OnInit, } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TableService } from './table.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private tableService : TableService, private fb : FormBuilder) { }
   data : any[] = [];
   dataSlice : any[] = [];
   title : string = ""
   displayStyle = "none";
  tableForm !: FormGroup;
  description : string = "";
  ngOnInit(): void {
    this.tableForm = this.fb.group({
      title : [''],
      description : [''],
      price : [''],
      category : [''],
      img : [''],
      rate : [''],
      count : ['']
    })
    //retrveing data
this.tableService.getData().subscribe(response =>{
  this.mapData(response);
  
})

  }

mapData(value: any){
  value.map((ele: any)  =>{
    const values = {
      id : ele.id,
      title : ele.title,
      price : ele.price,
      description : ele.description,
      category : ele.category,
      image : ele.image,
      rating : ele.rating,
      isEditable : false
    }
    this.data.push(values)
  })
  
  this.dataSlice = this.data.splice(0,5)
 
}



onPageChange(event : PageEvent){
  const startIndex = event.pageIndex * event.pageSize;
  let endIndex = startIndex + event.pageSize;
  if(endIndex > this.data.length){
    endIndex = this.data.length
  }
  this.dataSlice = this.data.slice(startIndex, endIndex)
}


onDelete(i:any){
  this.dataSlice.splice(i,1)
  
}

onDetails(i:number){
  this.description =  this.dataSlice[i].description
}
}
