import { signalStore, withState } from '@ngrx/signals';

export interface Timetable {
  id: string;
  title: string;
}

export type TimetableState = {
  items: Timetable[];
  loading: boolean;
}

export const initialState: TimetableState = {
  items: [],
  loading: false,
};

export const timetableStore = signalStore(withState(initialState));