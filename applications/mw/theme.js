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
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Packaged projects in Webtop only!"
                    },
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
                        opcode: 'getWindowProperty',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[PROPERTY] of window [INDEX] with title [TITLE]',
                        arguments: {
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'windowProperties'
                            },
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            TITLE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Notepad'
                            }
                        }
                    },
                    {
                        opcode: 'getWindowPropertyByIndex',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[PROPERTY] of window [INDEX]',
                        arguments: {
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'windowProperties'
                            },
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
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
                ],
                menus: {
                    windowProperties: {
                        acceptReporters: false,
                        items: [
                            "title",
                            "x",
                            "y",
                            "width",
                            "height",
                            "zIndex",
                            "html"
                        ]
                    }
                }
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

        getProperty(win, property) {
            if (!win) return "";

            switch (property) {
                case "title":
                    return win.querySelector(".window-title")?.textContent.trim() || "";

                case "x":
                    return parseFloat(win.style.left) || win.offsetLeft;

                case "y":
                    return parseFloat(win.style.top) || win.offsetTop;

                case "width":
                    return parseFloat(win.style.width) || win.offsetWidth;

                case "height":
                    return parseFloat(win.style.height) || win.offsetHeight;

                case "zIndex":
                    return parseInt(getComputedStyle(win).zIndex) || 0;

                case "html":
                    return win.outerHTML;

                default:
                    return "";
            }
        }

        getWindowProperty(args) {
            const windows = [...window.parent.document.querySelectorAll('#windows .window')];

            const matches = windows.filter(win => {
                const titleEl = win.querySelector('.window-title');
                return titleEl && titleEl.textContent.trim() === args.TITLE;
            });

            return this.getProperty(matches[Number(args.INDEX) - 1], args.PROPERTY);
        }

        getWindowPropertyByIndex(args) {
            const windows = [...window.parent.document.querySelectorAll('#windows .window')];
            return this.getProperty(windows[Number(args.INDEX) - 1], args.PROPERTY);
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