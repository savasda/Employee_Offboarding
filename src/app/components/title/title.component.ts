import { AsyncPipe, NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ActionButton } from '@models/action-button';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, NgClass, AsyncPipe]
})
export class TitleComponent {
  @Input() title: string | undefined;
  @Input() button: ActionButton | undefined;
  @Input({ transform: booleanAttribute }) displayGoBack = false;
  @Input() defaultURL = 'employees';
  router = inject(Router);

  onGoBack() {
    if (window.history.length) {
      console.log(this.defaultURL, window.history.length);

      window.history.back();
    } else {
      this.router.navigate([this.defaultURL]);
    }
  }
}
