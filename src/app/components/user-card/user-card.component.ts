import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() name = '';
  @Input() location = '';
  @Input() imgSrc = '';

  @Output() avatarClicked: EventEmitter<void> = new EventEmitter<void>();

  clickAvatar(): void {
    this.avatarClicked.emit();
  }
}
