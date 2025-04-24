import { Injectable, Type } from '@angular/core';
import { DashboardWidgetTypeDirective } from '../directives/dashboard-widget-type.directive';

@Injectable()
export class DashboardWidgetRegistryService {
  private types = new Map<
    string,
    () => Promise<Type<DashboardWidgetTypeDirective>>
  >();

  register(
    type: string,
    component: () => Promise<Type<DashboardWidgetTypeDirective>>
  ) {
    this.types.set(type, component);
  }

  get(type: string): Promise<Type<DashboardWidgetTypeDirective>> {
    const fn = this.types.get(type);
    if (!fn) {
      return Promise.reject(
        new Error(`Widget ${type} not found in registry`)
      );
    }
    return fn();
  }
}
