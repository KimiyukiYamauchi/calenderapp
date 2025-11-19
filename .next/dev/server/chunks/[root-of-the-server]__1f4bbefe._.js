module.exports = [
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/calenderapp/node_modules/node-tesseract-ocr/src/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const exec = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)").exec;
const log = console.debug;
/**
 * @param input - URL, local image path or Buffer
 * @param config - any OCR options and control parameters
 * @returns default output format is text
 */ function recognize(input, config = {}) {
    const options = getOptions(config);
    const binary = config.binary || "tesseract";
    const isSingleLocalFile = typeof input === "string" && !input.match(/^https?:\/\//);
    const inputOption = isSingleLocalFile ? `"${input}"` : "stdin";
    const command = [
        binary,
        inputOption,
        "stdout",
        ...options
    ].join(" ");
    if (config.debug) log("command", command);
    return new Promise((resolve, reject)=>{
        const child = exec(command, (error, stdout, stderr)=>{
            if (config.debug) log(stderr);
            if (error) reject(error);
            resolve(stdout);
        });
        if (inputOption === "stdin") pipeInput(input, child);
    });
}
function pipeInput(input, child) {
    if (typeof input === "string") {
        const protocol = input.match(/^(.*?):/)[1];
        return (()=>{
            const e = new Error("Cannot find module as expression is too dynamic");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })().get(input, (response)=>{
            response.pipe(child.stdin);
        });
    }
    if (Array.isArray(input)) input = Buffer.from(input.join("\n"), "utf-8");
    child.stdin.write(input);
    child.stdin.end();
}
function getOptions(config) {
    const ocrOptions = [
        "tessdata-dir",
        "user-words",
        "user-patterns",
        "psm",
        "oem",
        "dpi"
    ];
    return Object.entries(config).map(([key, value])=>{
        if ([
            "debug",
            "presets",
            "binary"
        ].includes(key)) return;
        if (key === "lang") return `-l ${value}`;
        if (ocrOptions.includes(key)) return `--${key} ${value}`;
        return `-c ${key}=${value}`;
    }).concat(config.presets) // options -l and --psm must occur before any CONFIGFILE
    .filter(Boolean);
}
module.exports = {
    recognize
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1f4bbefe._.js.map