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
                name: 'Webtop',
                blocks: [
                    {
                        opcode: 'newWindow',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'new window content:[CONTENT] x:[X] y:[Y] width:[WIDTH] height:[HEIGHT]',
                        arguments: {
                            CONTENT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello'
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            WIDTH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 200
                            },
                            HEIGHT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 150
                            }
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
    }
    Scratch.extensions.register(new Extension());
})(Scratch);