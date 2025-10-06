import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { Observable } from 'rxjs';

// Custom APIs for renderer
export const api = {
  async botAsk(prompt: string): Promise<Observable<string>> {
    return new Observable<string>((subscribe) => {
      ipcRenderer.invoke('bot.ask', prompt);

      const messageEvent = ipcRenderer.on(
        'bot.ask:stream',
        (_event, args: string) => {
          subscribe.next(args);
        },
      );

      ipcRenderer.once('bot.ask:error', (_event, [error]) => {
        messageEvent.removeAllListeners();
        subscribe.error(error);
      });

      ipcRenderer.once('bot.ask:complete', () => {
        messageEvent.removeAllListeners();
        subscribe.complete();
      });
    });
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
