import { effect } from '@angular/core';

export function waitSpacesLoaded(store: any): Promise<void> {
  return new Promise((resolve) => {
    if (store.loaded()) {
      resolve();
    } else {
      effect(() => {
        if (store.loading()) {
          return;
        }
        if (store.loaded()) {
          resolve();
        }
      });
      store.init();
    }
  });
}
