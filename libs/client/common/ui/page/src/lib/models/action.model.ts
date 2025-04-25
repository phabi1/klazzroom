export type Action = {
  name: string;
  label: string;
  handle: () => void;
};
