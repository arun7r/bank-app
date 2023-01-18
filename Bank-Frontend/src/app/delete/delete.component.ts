import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input() item:string| undefined
  //input() - It is used to hold data from parent component

  @Output() onCancel = new EventEmitter();
  //Output() - It is used to hold data from child component

  @Output() onDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cancel(){
    // alert('clicked')
    this.onCancel.emit()
    //onCancel - userdefined event
  }

  delete(){
    // alert('clicked')
    this.onDelete.emit(this.item)
  }
}
