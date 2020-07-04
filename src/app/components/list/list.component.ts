import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      console.log(posts);
    });
  }

}
