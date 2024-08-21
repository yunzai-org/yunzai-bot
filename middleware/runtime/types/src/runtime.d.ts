import * as common from 'yunzai'
import { type EventEmun } from 'yunzai'
import { MysApi, MysInfo, NoteUser, MysUser } from 'yunzai-mys'
export declare class Runtime {
  #private
  constructor(
    e:
      | Parameters<EventEmun['message.group']>[0]
      | Parameters<EventEmun['message.private']>[0]
  )
  get handler(): {
    '__#44109@#events': {}
    add(cfg: any): void
    del(ns: any, key?: string): void
    callAll(key: any, e: any, args: any): Promise<any>
    call(key: any, e: any, args: any, allHandler?: boolean): Promise<any>
    has(key: any): boolean
  }
  get user(): any
  get uid(): any
  get hasCk(): any
  get cfg(): {
    getOther(): any
    readonly 'masterQQ': any
    getdefSet(name: string): any
    '__#44098@#config': {}
    '__#44098@#watcher': {
      config: {}
      defSet: {}
    }
    '__#44098@#package': any
    readonly 'bot': any
    readonly 'group': any
    readonly 'notice': any
    readonly 'other': any
    readonly 'puppeteer': any
    readonly 'qq': number
    readonly 'pwd': string
    readonly 'platform': number
    readonly 'redis': any
    readonly 'renderer': any
    getDefSet(name: string): any
    getConfig(name: string): any
    getYaml(type: 'config' | 'default_config', name: string): any
    watch(file: string, name: string, type?: string): void
    readonly 'package': any
    readonly 'pm2': any
    getGroup(groupId?: number | string): any
  }
  get gsCfg(): {
    nameID: typeof Map.prototype | false
    sr_nameID: typeof Map.prototype | false
    isSr: boolean
    defSetPath: string
    defSet: {}
    configPath: string
    config: {}
    watcher: {
      config: {}
      defSet: {}
    }
    ignore: string[]
    readonly element: any
    getdefSet(app: any, name: any): any
    getConfig(app: any, name: any): any
    getYaml(app: any, name: any, type: any): any
    getFilePath(app: any, name: any, type: any): string
    watch(file: any, app: any, name: any, type?: string): void
    getBingCk(game?: string): Promise<{
      ck: {}
      ckQQ: {}
      noteCk: {}
    }>
    roleIdToName(id: any): any
    roleNameToID(keyword: any, isSr: any): any
    shortName(name: any, isWeapon?: boolean): any
    change_myspubCk(): Promise<void>
    getGachaSet(groupId?: string): any
    getMsgUid(msg: any): string | false
    getRole(
      msg: any,
      filterMsg?: string,
      isSr?: boolean
    ):
      | false
      | {
          roleId: any
          uid: string
          alias: any
          game: any
          name: any
        }
    cpCfg(app: any, name: any): void
    _getAbbr(): void
    _roleNameToID(keyword: any, isSr?: boolean): any
    _getRole(
      msg: any,
      filterMsg?: string,
      _?: boolean
    ):
      | false
      | {
          roleId: any
          uid: string
          alias: any
          name: any
        }
    getWeaponDataByWeaponHash(_: any): {}
    getAllAbbr(): {}
    getBingCkSingle(_: any): {}
    saveBingCk(_: any, __: any): void
    getElementByRoleName(_: any): string
    getSkillDataByskillId(_: any, __: any): {}
    fightPropIdToName(_: any): string
    getRoleTalentByTalentId(_: any): {}
    getAbbr(): void
  }
  get common(): typeof common
  get puppeteer(): any
  get MysInfo(): typeof MysInfo
  get NoteUser(): typeof NoteUser
  get MysUser(): typeof MysUser
  getMysInfo(targetType?: string): Promise<any>
  getUid(): Promise<any>
  getMysApi(
    targetType?: string,
    option?: {},
    isSr?: boolean
  ): Promise<false | MysApi>
  createMysApi(uid: any, ck: any, option: any, isSr?: boolean): Promise<MysApi>
  render(pluginName: any, basePath: any, data?: any, cfg?: any): Promise<any>
}
