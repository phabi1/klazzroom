import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'lib-libs-client-common-ui-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './libs-client-common-ui-page.component.html',
  styleUrl: './libs-client-common-ui-page.component.css',
})
export class LibsClientCommonUiPageComponent {
  headingTitle = input<string>();
}
