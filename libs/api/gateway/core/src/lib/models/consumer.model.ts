export interface IConsumer {
  id: string;
  email: string;
  providers: Map<string, string>;
}
