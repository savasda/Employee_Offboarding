import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { Store } from '@ngrx/store';
import { loadEmployees } from '@store/employees-store/employees.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [RouterOutlet, NavbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(loadEmployees());
  }
}
