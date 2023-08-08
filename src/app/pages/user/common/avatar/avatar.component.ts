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
  @Input() imgSrc!: string; 
}
