import { Component ,OnInit} from '@angular/core';

import { adminService } from '../../services/admin-api.service';
import { Post } from 'src/app/core/models/interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  Posts!:Post[]
  videos!:Post[]
  constructor(private adminService: adminService) {}

  selected=true
  setSelected(){
    this.selected=!this.selected; 
  }

  ngOnInit(){
    this.adminService.getPosts().subscribe((data:Post[])=>{
       this.Posts=data
       this.adminService.getVideos().subscribe((data:Post[])=>{
           this.videos=data
            
       })
    })
  }
}
