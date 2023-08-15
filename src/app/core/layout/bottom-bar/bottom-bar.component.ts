import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent {
   menus = [
    { name: "Home", link: "/", icon: "Home" },
    { name: "shorts", link: "/shorts", icon: "play_circle" },
    { name: "Messages", link: "/message", icon: "chat"  },
    {
      name: "notification",
      link: "/notification",
      icon: "notifications",
    },
    {
      name: "request",
      link: "/requests",
      icon: "request_page",
    },
  ];

}
