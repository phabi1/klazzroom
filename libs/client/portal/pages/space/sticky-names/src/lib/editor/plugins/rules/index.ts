import { PluginBase } from '../../model/plugin-base.model';
import { Plugin } from '../../interfaces/plugin.interface';

export default class RulesPlugin
  extends PluginBase<unknown>
  implements Plugin<unknown>
{
  load(): void {
    // Load the plugin
    console.log('RulesPlugin loaded');
  }

  unload(): void {
    // Unload the plugin
    console.log('RulesPlugin unloaded');
  }
}
