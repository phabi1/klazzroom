import { Component, Injectable, Type } from '@angular/core';
import { SidebarTypeDirective } from '../directives/sidebar-type.directive';

@Injectable()
export class SidebarRegistryService {
  private _sidebars: Map<string, Type<SidebarTypeDirective> | Promise<Type<SidebarTypeDirective>>> =
    new Map();

  register(
    name: string,
    component: Type<SidebarTypeDirective> | Promise<Type<SidebarTypeDirective>>
  ) {
    this._sidebars.set(name, component);
  }

  unregister(name: string) {
    this._sidebars.delete(name);
  }

  has(name: string): boolean {
    return this._sidebars.has(name);
  }

  async resolve(name: string): Promise<Type<SidebarTypeDirective> | null> {
    if (!this._sidebars.has(name)) {
      return null;
    }
    const component = this._sidebars.get(name);
    if (!component) {
      return null;
    }
    if (component instanceof Promise) {
      return await component;
    }
    return component;
  }
}
