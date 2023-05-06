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
  tableForm !: FormGroup
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
this.tableService.getData().subscribe(response =>{
  console.log(response);
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
 console.log("Data", this.data);
 
}

onAdd(){
  let rating = {
    rate : this.tableForm.value.rate,
    count : this.tableForm.value.count
  }
  let value = {
    id : this.data.length+1,
      title : this.tableForm.value.title,
      price : this.tableForm.value.price,
      description : this.tableForm.value.description,
      category : this.tableForm.value.category,
      image : this.tableForm.value.img,
      rating : rating,
      isEditable : false
  }
  this.data.push(value);
  this.displayStyle = "none";
  alert("Details added succesfully")

  console.log("VALUE", this.data, value);
  
}
onEdit(item : any){
  this.dataSlice.forEach(element => {
    element.isEditable = false
    
    
  });
  item.isEditable = true;
}
onUpdate(item : any){
 
  item.isEditable = false;
 alert("Details Updated succesfully")
}

onCancel(item : any){
this.data.forEach(el =>{
  if(el.id == item.id){
  }
}

)
item.isEditable = false
}


onPageChange(event : PageEvent){
  console.log("Pagination", event);
  
  const startIndex = event.pageIndex * event.pageSize;
  let endIndex = startIndex + event.pageSize;
  if(endIndex > this.data.length){
    endIndex = this.data.length
  }
  this.dataSlice = this.data.slice(startIndex, endIndex)
}

openPopup() {
  this.displayStyle = "block";
}
closePopup() {
  this.displayStyle = "none";
}
onDelete(i:any){
  this.dataSlice.splice(i,1)
  console.log("ondelete",i);
  
}
}
