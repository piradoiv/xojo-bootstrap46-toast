interface JQuery {
    toast: any;
}

interface ToastCommand {
    type: string;
    title?: string;
    time_ago?: string;
    body?: string;
    auto_hide?: boolean;
    hide_delay?: number;
    index?: number;
}

namespace Bootstrap46 {
    export class Toast extends XojoWeb.XojoControl {
        private mWrapperElementID: string = 'bs46-toast-wrapper';
        private mToastWrapper: HTMLDivElement | null = null;

        updateControl(data: string) {
            const js = JSON.parse(data);
            if (typeof js.commands === 'object' && js.commands.length > 0) {
                js.commands.forEach((command: ToastCommand) => this.parseCommand(command));
            }
        }

        toast(title: string, timeAgo: string, body: string, autoHide: boolean = true, hideDelay: number = 500) {
            this.createWrapperIfNeeded();
            const element = document.createElement('div');
            this.mToastWrapper?.appendChild(element);
            const toastId = 'bs46-toast-' + Date.now();

            // The HTML template is coming almost verbatim from Bootstrap's documentation:
            // https://getbootstrap.com/docs/4.6/components/toasts/#stacking
            element.outerHTML =
                `
                <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true"
                      data-autohide="${autoHide}" data-delay="${hideDelay}">
                  <div class="toast-header">
                    <strong class="mr-auto">${title}</strong>
                    <small class="text-muted">${timeAgo}</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="toast-body">${body}</div>
                </div>
                `.trim();

            if (!autoHide) {
                document.getElementById(toastId)?.removeAttribute('data-delay');
            }

            $(`#${toastId}`)
                .toast({})
                .toast('show')
                .on('hidden.bs.toast', (el: Event) => {
                    if (!el.target) {
                        return;
                    }

                    $(el.target).toast('dispose');
                    const target = <HTMLDivElement>el.target;
                    target.remove();
                });
        }

        hideAt(index: number) {
            const elements = document.querySelectorAll(`#${this.mWrapperElementID} .toast`);
            if (index < elements.length) {
                $(`#${elements[index].id}`).toast('hide');
            }
        }

        hideAll() {
            document.querySelectorAll(`#${this.mWrapperElementID} .toast`)
                .forEach((element) => {
                    $(`#${element.id}`).toast('hide');
                });
        }

        private parseCommand(command: ToastCommand) {
            switch (command.type) {
                case 'toast':
                    const title = command.title || '';
                    const timeAgo = command.time_ago || '';
                    const body = command.body || '';
                    let autoHide = true;
                    if (typeof command.auto_hide === 'boolean') {
                        autoHide = command.auto_hide;
                    }
                    const hideDelay = command.hide_delay || 2500;
                    this.toast(title, timeAgo, body, autoHide, hideDelay);
                    break;
                case 'hide-at':
                    command.index && this.hideAt(command.index);
                    break;
                case 'hide-all':
                    this.hideAll();
                    break;
            }
        }

        private createWrapperIfNeeded() {
            this.mToastWrapper = <HTMLDivElement>document.getElementById(this.mWrapperElementID);
            if (this.mToastWrapper) {
                return;
            }

            this.mToastWrapper = document.createElement('div');
            this.mToastWrapper.id = this.mWrapperElementID;
            this.mToastWrapper.style.position = 'absolute';
            this.mToastWrapper.style.top = '20px';
            this.mToastWrapper.style.right = '20px';
            this.mToastWrapper.style.width = '350px';
            this.mToastWrapper.style.zIndex = '1040';

            document.getElementById('XojoSession')?.appendChild(this.mToastWrapper);
        }
    }
}