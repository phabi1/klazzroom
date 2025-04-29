export class CommandManager {
  private commands: { [key: string]: (payload: unknown) => void } = {};

  register(name: string, command: (payload: unknown) => void): void {
    this.commands[name] = command;
  }

  unregister(name: string): void {
    if (this.commands[name]) {
      delete this.commands[name];
    } else {
      console.error(`Command ${name} not found.`);
    }
  }

  execute(name: string, payload: unknown): void {
    if (this.commands[name]) {
      this.commands[name](payload);
    } else {
      console.error(`Command ${name} not found.`);
    }
  }
}
