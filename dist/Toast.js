"use strict";
var Bootstrap46;
(function (Bootstrap46) {
    class Toast extends XojoWeb.XojoControl {
        constructor() {
            super(...arguments);
            this.mWrapperElementID = 'bs46-toast-wrapper';
            this.mToastWrapper = null;
        }
        updateControl(data) {
            const js = JSON.parse(data);
            const commands = JSON.parse(Toast.decode(js.commands));
            if (typeof commands === 'object' && commands.length > 0) {
                commands.forEach((command) => this.parseCommand(command));
            }
        }
        toast(title, timeAgo, body, autoHide = true, hideDelay = 500) {
            var _a, _b;
            this.createWrapperIfNeeded();
            const element = document.createElement('div');
            (_a = this.mToastWrapper) === null || _a === void 0 ? void 0 : _a.appendChild(element);
            const toastId = 'bs46-toast-' + Date.now();
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
                (_b = document.getElementById(toastId)) === null || _b === void 0 ? void 0 : _b.removeAttribute('data-delay');
            }
            $(`#${toastId}`)
                .toast({})
                .toast('show')
                .on('hidden.bs.toast', (el) => {
                if (!el.target) {
                    return;
                }
                $(el.target).toast('dispose');
                const target = el.target;
                target.remove();
            });
        }
        hideAt(index) {
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
        parseCommand(command) {
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
        createWrapperIfNeeded() {
            var _a;
            this.mToastWrapper = document.getElementById(this.mWrapperElementID);
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
            (_a = document.getElementById('XojoSession')) === null || _a === void 0 ? void 0 : _a.appendChild(this.mToastWrapper);
        }
        static decode(str) {
            return decodeURIComponent(atob(str));
        }
    }
    Bootstrap46.Toast = Toast;
})(Bootstrap46 || (Bootstrap46 = {}));
