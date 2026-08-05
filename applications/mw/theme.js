(function (Scratch) {
    'use strict';

    const extSupport = document.createElement("script");
    extSupport.type = "module";
    extSupport.src = "https://WebtopOS.github.io/webtop/js/extSupport.js";
    document.head.appendChild(extSupport);

    class Extension {
        getInfo() {
            return {
                id: 'toolsforwebtop',
                name: 'Webtop Tools',
                blocks: [
                    { blockType: Scratch.Blocktype.LABEL
                      text: "Packaged projects only!"
                    }
                    {
                        opcode: 'newWindow',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'new window content:[CONTENT] x:[X] y:[Y] width:[WIDTH] height:[HEIGHT]',
                        arguments: {
                            CONTENT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
                            HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 150 }
                        }
                    },
                    {
                        opcode: 'getWindowByTitle',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'window with title [TITLE]',
                        arguments: {
                            TITLE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Notepad' }
                        }
                    },
                    {
                        opcode: 'focusWindow',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'focus window [TITLE]',
                        arguments: {
                            TITLE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Notepad' }
                        }
                    }
                ]
            };
        }

        newWindow(args) {
            if (!window.windowManager) return;
            window.windowManager.createWindow?.({
                content: args.CONTENT,
                x: args.X,
                y: args.Y,
                width: args.WIDTH,
                height: args.HEIGHT
            });
        }

        getWindowByTitle(args) {
            const windows = window.parent.document.querySelectorAll('#windows .window');
            for (const win of windows) {
                const titleEl = win.querySelector('.window-title');
                if (titleEl && titleEl.textContent.trim() === args.TITLE) {
                    return win.outerHTML;
                }
            }
            return '';
        }

        focusWindow(args) {
            const windows = window.parent.document.querySelectorAll('#windows .window');
            for (const win of windows) {
                const titleEl = win.querySelector('.window-title');
                if (titleEl && titleEl.textContent.trim() === args.TITLE) {
                    win.style.zIndex = 1000;
                    break;
                }
            }
        }
    }
    Scratch.extensions.register(new Extension());
})(Scratch);