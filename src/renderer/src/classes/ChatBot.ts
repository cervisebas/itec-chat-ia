import { Observable } from 'rxjs';

export class ChatBot {
  public ask(message: string) {
    return new Observable<string>((subscribe) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.api.botAsk(message).then((request: any) => {
        request._subscribe({
          next(value) {
            subscribe.next(value);
          },
          error(err) {
            subscribe.error(err);
          },
          complete() {
            subscribe.complete();
          },
        });
      });
    });
  }
}
