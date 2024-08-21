import * as common from 'yunzai';
import { Handler, ConfigController, puppeteer, BOT_NAME, middlewareOptions, useEvent } from 'yunzai';
import { GSCfg, MysInfo, NoteUser, MysUser, MysApi } from 'yunzai-mys';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { filter, repeat } from 'lodash-es';

class Runtime {
    #mysInfo = {};
    #e;
    constructor(e) {
        this.#e = e;
    }
    get handler() {
        return Handler;
    }
    get user() {
        return this.#e.user;
    }
    get uid() {
        return this.user?.uid;
    }
    get hasCk() {
        return this.user?.hasCk;
    }
    get cfg() {
        return ConfigController;
    }
    get gsCfg() {
        return GSCfg;
    }
    get common() {
        return common;
    }
    get puppeteer() {
        return puppeteer;
    }
    get MysInfo() {
        return MysInfo;
    }
    get NoteUser() {
        return NoteUser;
    }
    get MysUser() {
        return MysUser;
    }
    async getMysInfo(targetType = 'all') {
        if (!this.#mysInfo[targetType]) {
            this.#mysInfo[targetType] = await MysInfo.init(this.#e, targetType === 'cookie' ? 'detail' : 'roleIndex');
        }
        return this.#mysInfo[targetType];
    }
    async getUid() {
        return await MysInfo.getUid(this.#e);
    }
    async getMysApi(targetType = 'all', option = {}, isSr = false) {
        let mys = await this.getMysInfo(targetType);
        if (mys.uid && mys?.ckInfo?.ck) {
            return new MysApi(mys.uid, mys.ckInfo.ck, option, isSr);
        }
        return false;
    }
    async createMysApi(uid, ck, option, isSr = false) {
        return new MysApi(uid, ck, option, isSr);
    }
    async render(pluginName, basePath, data = {}, cfg = {}) {
        basePath = basePath.replace(/.html$/, '');
        let paths = filter(basePath.split('/'), p => !!p);
        basePath = paths.join('/');
        const mkdir = check => {
            let currDir = `${process.cwd()}/temp`;
            for (let p of check.split('/')) {
                currDir = `${currDir}/${p}`;
                if (!existsSync(currDir)) {
                    mkdirSync(currDir);
                }
            }
            return currDir;
        };
        const PName = 'miao-plugin';
        mkdir(`html/${pluginName}/${basePath}`);
        const pluResPath = `../../../${repeat('../', paths.length)}plugins/${pluginName}/resources/`;
        const miaoResPath = `../../../${repeat('../', paths.length)}plugins/${PName}/resources/`;
        const layoutPath = `${process.cwd()}/plugins/${PName}/resources/common/layout/`;
        data = {
            sys: {
                scale: 1
            },
            copyright: `Created By ${BOT_NAME}<span class="version">${ConfigController.package?.version ?? '4'}</span> `,
            _res_path: pluResPath,
            _miao_path: miaoResPath,
            _tpl_path: `${process.cwd()}/plugins/${PName}/resources/common/tpl/`,
            defaultLayout: layoutPath + 'default.html',
            elemLayout: layoutPath + 'elem.html',
            ...data,
            _plugin: pluginName,
            _htmlPath: basePath,
            pluResPath,
            tplFile: `./plugins/${pluginName}/resources/${basePath}.html`,
            saveId: data.saveId || data.save_id || paths[paths.length - 1],
            pageGotoParams: {
                waitUntil: 'networkidle2'
            }
        };
        if (cfg.beforeRender) {
            data = cfg.beforeRender({ data }) || data;
        }
        if (process.argv.includes('dev')) {
            const saveDir = mkdir(`ViewData/${pluginName}`);
            const file = `${saveDir}/${data._htmlPath.split('/').join('_')}.json`;
            writeFileSync(file, JSON.stringify(data));
        }
        const base64 = await puppeteer.screenshot(`${pluginName}/${basePath}`, data);
        if (cfg.retType === 'base64')
            return base64;
        let ret = true;
        if (base64) {
            if (cfg.recallMsg) {
                ret = await this.#e.reply(base64, false, {});
            }
            else {
                ret = await this.#e.reply(base64);
            }
        }
        return cfg.retType === 'msgId' ? ret : true;
    }
}

var index = (config) => {
    return middlewareOptions({
        typing: 'message',
        name: config?.name ?? 'Runtime',
        on: async (event) => {
            await useEvent(async (e) => {
                await MysInfo.initCache();
                const user = await NoteUser.create(e);
                if (user) {
                    e.user = new Proxy(user, {
                        get(self, key) {
                            const fnMap = {
                                uid: 'getUid',
                                uidList: 'getUidList',
                                mysUser: 'getMysUser',
                                ckUidList: 'getCkUidList'
                            };
                            if (fnMap[key]) {
                                return self[fnMap[key]](e.game);
                            }
                            if (key === 'uidData') {
                                return self.getUidData('', e.game);
                            }
                            const list = [
                                'getUid',
                                'getUidList',
                                'getMysUser',
                                'getCkUidList',
                                'getUidMapList',
                                'getGameDs'
                            ];
                            if (list.includes(key)) {
                                return (_game, arg2) => {
                                    return self[key](_game || e.game, arg2);
                                };
                            }
                            const list2 = [
                                'getUidData',
                                'hasUid',
                                'addRegUid',
                                'delRegUid',
                                'setMainUid'
                            ];
                            if (list2.includes(key)) {
                                return (uid, _game = '') => {
                                    return self[key](uid, _game || e.game);
                                };
                            }
                            return self[key];
                        }
                    });
                }
                e.runtime = new Runtime(e);
            }, [event, 'message.group', 'message.private']);
        }
    });
};

export { Runtime, index as default };
