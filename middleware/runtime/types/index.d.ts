export * from './src/runtime.js';
type options = {
    name: string;
};
declare const _default: (config?: options) => {
    typing: "message";
    name: string;
    on: <T extends keyof import("yunzai").EventEmun = "message.group">(event: Parameters<import("yunzai").EventEmun[T]>[0]) => Promise<void>;
};
export default _default;
