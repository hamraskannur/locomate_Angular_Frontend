import { Component ,OnInit,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { adminService } from '../../services/admin-api.service';
import { Post } from 'src/app/core/models/interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit,OnDestroy {
  Posts!:Post[]
  videos!:Post[]
  subscription1: Subscription | undefined;
  subscription2: Subscription | undefined;
  
  constructor(private adminService: adminService) {}

  selected=true
  setSelected(){
    this.selected=!this.selected; 
  }


  ngOnInit(){
    this.subscription1=this.adminService.getPosts().subscribe((data:Post[])=>{
       this.Posts=data
      this.subscription2= this.adminService.getVideos().subscribe((data:Post[])=>{
           this.videos=data
            
       })
    })
  }
  ngOnDestroy(): void {
    this.subscription1?.unsubscribe()
    this.subscription2?.unsubscribe()
  }
}
