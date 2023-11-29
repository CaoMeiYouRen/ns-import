import { isAbsolute, resolve, join, dirname } from 'path'
import { existsSync } from 'fs'

export function ns(options: Options) {
    return new Scope(options)
}
export default ns

function unwrapExports(module: any) {
    return module?.default || module
}

/**
 * 查找 node_modules
 *
 * @author CaoMeiYouRen
 * @param moduleName 要查找的模块
 * @param currentDir 当前目录
 */
function findModule(moduleName: string, currentDir: string): string | null {
    const modulePath = join(currentDir, 'node_modules', moduleName)
    if (existsSync(modulePath)) {
        return modulePath
    }
    const parentDir = dirname(currentDir)
    // 如果已经到达根目录，则停止查找
    if (currentDir === parentDir) {
        return null
    }
    return findModule(moduleName, parentDir)
}

export interface Options {
    namespace: string
    prefix: string
    official?: string
    dirname?: string
}

export class Scope {
    private prefixes: string[]

    constructor(public options: Options) {
        this.prefixes = [`${options.namespace}-${options.prefix}-`]
        if (options.official) {
            this.prefixes.push(`@${options.official}/${options.prefix}-`)
        }
    }

    private throwError(name: string): never {
        throw new Error(`cannot resolve ${this.options.prefix} "${name}"`)
    }

    paths(name: string) {
        // absolute path
        if (isAbsolute(name)) {
            return [name]
        }

        // relative path
        if (name.startsWith('./') || name.startsWith('../')) {
            if (this.options.dirname) {
                return [resolve(this.options.dirname, name)]
            }
            this.throwError(name)

        }

        // full package path
        if (this.prefixes.some((prefix) => name.startsWith(prefix))) {
            return [name]
        }

        // scoped package path
        if (name[0] === '@') {
            const index = name.indexOf('/')
            if (index < 0) {
                this.throwError(name)
            }
            const scope = name.slice(0, index + 1)
            name = name.slice(index + 1)
            if (!name.startsWith(this.prefixes[0])) {
                name = this.prefixes[0] + name
            }
            return [scope + name]
        }

        // normal package path
        return this.prefixes.map((prefix) => prefix + name).reverse()
    }

    require<T = any>(name: string) {
        if (typeof name === 'object') {
            return name
        }
        const path = this.resolve(name)
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const exports = require(path)
        return unwrapExports(exports) as T
    }

    /**
     * Dynamic Import
     *
     * @author CaoMeiYouRen
     * @template T
     * @param name
     */
    async import<T = any>(name: string) {
        if (typeof name === 'object') {
            return name
        }
        const path = this.resolveByImport(name)
        const exports = await import(path)
        return unwrapExports(exports) as T
    }

    resolve(name: string) {
        const modules = this.paths(name)
        for (const path of modules) {
            try {
                return require.resolve(path)
            } catch { /* empty */ }
        }
        this.throwError(name)
    }

    private resolveByImport(name: string) {
        const modules = this.paths(name)
        for (const path of modules) {
            try {
                if (findModule(path, process.cwd())) {
                    return path
                }
            } catch { /* empty */ }
        }
        this.throwError(name)
    }
}

