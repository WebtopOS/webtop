(function (Scratch) {
    'use strict';

    const icon ="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwLDAsMjAwLDIwMCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM4MCwtMjYwKSI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMzgwLDM2MGMwLC01NS4yMjg0NyA0NC43NzE1MywtMTAwIDEwMCwtMTAwYzU1LjIyODQ3LDAgMTAwLDQ0Ljc3MTUzIDEwMCwxMDBjMCw1NS4yMjg0NyAtNDQuNzcxNTMsMTAwIC0xMDAsMTAwYy01NS4yMjg0NywwIC0xMDAsLTQ0Ljc3MTUzIC0xMDAsLTEwMHoiIGZpbGw9IiM1NTRkNGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik00ODAsMzkxLjg1MTY3djIzLjgyMzI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik00OTkuMjI1MzYsMzMzLjE3NTAzbC01LjQ5NzIxLDIuMjc1MTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTQ5OS4yMjUzNiwzMTkuNTAwNDlsLTUuNDk3MjEsLTIuMjgxMDgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTUwOC44OTc1OSwzMDkuODI4MjVsLTIuMjgxMDgsLTUuNTAzMTciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTUwOC44OTc1OSwzNDIuODQ3MjdsLTIuMjgxMDgsNS40OTcyMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNNTI0Ljg1MzIxLDMwNC4zMjUwOGwtMi4yODEwOCw1LjUwMzE3IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik01MjIuNTcyMTMsMzQyLjg0NzI3bDIuMjc1MTIsNS41MDMxNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNNTM3Ljc0NzU0LDMxNy4yMTk0MWwtNS41MDMxNywyLjI4MTA4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik01MzIuMjQ0MzcsMzMzLjE3NTAzbDUuNTAzMTcsMi4yODEwOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNNTM5LjU1ODEsMzY4LjAyODQzdjExLjkxMTYyYzAsNi41Nzg2MSAtNS4zMzMwMSwxMS45MTE2MiAtMTEuOTExNjIsMTEuOTExNjJoLTk1LjI5Mjk3Yy02LjU3ODYxLDAgLTExLjkxMTYyLC01LjMzMzAxIC0xMS45MTE2MiwtMTEuOTExNjJ2LTU5LjU1ODFjMCwtNi41Nzg2MSA1LjMzMzAxLC0xMS45MTE2MiAxMS45MTE2MiwtMTEuOTExNjJoNDEuNjkwNjciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTQ1Ni4xNzY3Niw0MTUuNjc0OTJoNDcuNjQ2NDgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTQ5Ny44Njc0MywzMjYuMzM3NzZjMCwtOS44Njc5MSA3Ljk5OTUyLC0xNy44Njc0MyAxNy44Njc0MywtMTcuODY3NDNjOS44Njc5MSwwIDE3Ljg2NzQzLDcuOTk5NTIgMTcuODY3NDMsMTcuODY3NDNjMCw5Ljg2NzkxIC03Ljk5OTUyLDE3Ljg2NzQzIC0xNy44Njc0MywxNy44Njc0M2MtOS44Njc5MSwwIC0xNy44Njc0MywtNy45OTk1MiAtMTcuODY3NDMsLTE3Ljg2NzQzeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxMDA6MTAwLS0+"

    const extSupport = document.createElement("script");
    extSupport.type = "module";
    extSupport.src = "https://WebtopOS.github.io/webtop/js/extSupport.js";
    document.head.appendChild(extSupport);

    class Extension {
        constructor() {
            this.windows = {};
        }

        getInfo() {
            return {
                id: 'toolsforwebtop',
                name: 'Webtop Tools',
                color1: '#554d4d',
                menuIconURI: icon,
                blocks: [
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Packaged projects in Webtop only!"
                    },

                    {
                        opcode: 'newWindow',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'new window content:[CONTENT] x:[X] y:[Y] width:[WIDTH] height:[HEIGHT]',
                        hideFromPalette: true,
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
                                menu: 'windowPropertiesIndex'
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
                        hideFromPalette: true,
                        arguments: {
                            TITLE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Notepad'
                            }
                        }
                    },

                    "---",

                    {
                        opcode: 'setWindowProperty',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set [PROPERTY] of custom window [ID] to [VALUE]',
                        arguments: {
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'settableProperties'
                            },
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'main'
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Window'
                            }
                        }
                    },

                    {
                        opcode: 'getCustomWindowProperty',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[PROPERTY] of custom window [ID]',
                        arguments: {
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'settableProperties'
                            },
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'main'
                            }
                        }
                    },

                    {
                        opcode: 'createCustomWindow',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'spawn custom window [ID]',
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'main'
                            }
                        }
                    },
                ],

                menus: {
                    windowProperties: {
                        acceptReporters: false,
                        items: [
                            "icon",
                            "content",
                            "x",
                            "y",
                            "width",
                            "height",
                            "zIndex",
                        ]
                    },

                    windowPropertiesIndex: {
                        acceptReporters: false,
                        items: [
                            "title",
                            "icon",
                            "content",
                            "x",
                            "y",
                            "width",
                            "height",
                            "zIndex"
                        ]
                    },

                    settableProperties: {
                        acceptReporters: false,
                        items: [
                            "title",
                            "icon",
                            "content",
                            "url",
                            "x",
                            "y",
                            "width",
                            "height",
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


        createCustomWindow(args) {
            if (!window.windowManager) return;

            const config = this.windows[args.ID];

            if (!config) return;

            window.windowManager.createWindow?.({
                content: config.content ?? (config.url ? `<iframe src="${config.url}" id="${args.ID}" width="100%" height="100%" style="border:none;" allowtransparency="true"></iframe>` : ""),
                icon: config.icon ?? "",
                x: Number(config.x ?? 0),
                y: Number(config.y ?? 0),
                width: Number(config.width ?? 200),
                height: Number(config.height ?? 150),
                title: config.title ?? undefined,
            });
        }


        setWindowProperty(args) {
            if (!this.windows[args.ID]) {
                this.windows[args.ID] = {};
            }

            this.windows[args.ID][args.PROPERTY] = args.VALUE;
        }


        getProperty(win, property) {
            if (!win) return "";

            switch (property) {

                case "title":
                    return win.querySelector(".window-title")
                        ?.textContent.trim() || "";

                case "icon":
                    return win.querySelector(".window-title-group img")
                        ?.getAttribute("src") || "";

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

                case "content":
                    return win.outerHTML;

                default:
                    return "";
            }
        }


        getWindowProperty(args) {
            const windows = [
                ...window.parent.document.querySelectorAll('#windows .window')
            ];

            const matches = windows.filter(win => {
                const titleEl = win.querySelector('.window-title');
                return titleEl &&
                    titleEl.textContent.trim() === args.TITLE;
            });

            return this.getProperty(
                matches[Number(args.INDEX) - 1],
                args.PROPERTY
            );
        }


        getWindowPropertyByIndex(args) {
            const windows = [
                ...window.parent.document.querySelectorAll('#windows .window')
            ];

            return this.getProperty(
                windows[Number(args.INDEX) - 1],
                args.PROPERTY
            );
        }

        getCustomWindowProperty(args) {
            const window = this.windows[args.ID];

            if (!window) return "";

            return window[args.PROPERTY] ?? "";
        }

        focusWindow(args) {
            const windows =
                window.parent.document.querySelectorAll('#windows .window');

            for (const win of windows) {
                const titleEl = win.querySelector('.window-title');

                if (titleEl &&
                    titleEl.textContent.trim() === args.TITLE) {
                    win.style.zIndex = 1000;
                    break;
                }
            }
        }
    }

    Scratch.extensions.register(new Extension());

})(Scratch);