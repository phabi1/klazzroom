import { Component } from "@angular/core";
import { FieldArrayType } from "@ngx-formly/core";

@Component({
    selector: 'klazzroom-formly-repeat-section',
    template: `
      <div class="mb-3">
        <legend *ngIf="props.label">{{ props.label }}</legend>
        <p *ngIf="props.description">{{ props.description }}</p>
  
        <div *ngFor="let field of field.fieldGroup; let i = index" class="flex">
          <formly-field class="col" [field]="field"></formly-field>
          <div class="col-1 d-flex align-items-center">
            <button mat-icon-button type="button" (click)="remove(i)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
        <div>
          <button mat-button type="button" (click)="add()">
            {{ props['addText'] }}
          </button>
        </div>
      </div>
    `,
  })
  export class RepeatTypeComponent extends FieldArrayType {}