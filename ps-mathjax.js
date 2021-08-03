postscriptum.plugin('ps-mathjax', (processor, options) => {
    const SCRIPT_URL = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js";
    const { util } = postscriptum;
    const { io } = util;
    let config = null;
    config = {
        startup: {
            elements: [processor.source],
        },
        loader: {
            load: ["input/tex-full", "input/mml", "output/chtml"]
        }
    };
    if (options.fontsUrl) {
        config.chtml = {
            fontURL: options.fontsUrl
        };
    }
    if (options.config)
        config = Object.assign(Object.create(config), options.config);
    if (options.fontsUrl) {
        const fontConfig = { fontURL: options.fontsUrl };
        if (!config.chtml)
            config.chtml = fontConfig;
        else if (!config.chtml.fontURL)
            Object.assign(config.chtml, fontConfig);
    }
    processor.on('start', async function () {
        if (this.parentFragmentor)
            return;
        //@ts-ignore
        window.MathJax = config;
        await io.loadScript(options.scriptUrl || SCRIPT_URL);
        //@ts-ignore
        await MathJax.startup.promise;
    });
}, { scriptUrl: "", fontsUrl: "", config: null });
