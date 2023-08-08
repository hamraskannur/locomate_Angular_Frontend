import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div>
      <div class="w-9 rounded-full overflow-hidden">
        <img [src]="imgSrc" alt="logo" />
      </div>
    </div>
  `,
})
export class AvatarComponent {
  @Input() imgSrc: string='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';

  
}
