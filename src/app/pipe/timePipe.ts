import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return '';

    const now = new Date();
    const timestamp = new Date(value);

    const seconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

    if (seconds < 30) {
      return 'Just now';
    } else if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else if (seconds < 2592000) {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
    } else if (seconds < 31536000) {
      const months = Math.floor(seconds / 2592000);
      return `${months} months ago`;
    } else {
      const years = Math.floor(seconds / 31536000);
      return `${years} years ago`;
    }
  }
}
