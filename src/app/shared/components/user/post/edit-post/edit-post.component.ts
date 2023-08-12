import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrServiceService } from 'src/app/features/user/services/toastr.service';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  @Input() img: string | undefined;
  @Input() shorts: boolean =false;
  @Input() postId: string | undefined;
  @Input() description: string | undefined;
  @Output() descriptionChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() setEditPost: EventEmitter<any> = new EventEmitter<any>();

  errMessage=""

  constructor(private userApiServiceService:UserApiServiceService,private toastrService:ToastrServiceService){}

  EditPost(){
    this.setEditPost.emit(false)
  }

  submitHandler(){
    if(this.postId  ){
      if(this.description && this.description.trim().length>0){
        this.userApiServiceService.editPost({postId:this.postId,newDescription:this.description}).subscribe(()=>{
          this.setEditPost.emit(false)
          this.descriptionChange.emit(this.description);
          this.toastrService.showSuccess("Post edited successfully")
        })
      }else{
        this.errMessage="please add your description"
      }
    }
  }
}
