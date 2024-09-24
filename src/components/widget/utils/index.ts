import type { App, Plugin, AppContext } from 'vue'
export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}

export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E
) => {
  ; (main as any).install = (app: App): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ; (main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}

export const withInstallFunction = <T>(fn: T, name: string) => {
  ; (fn as SFCWithInstall<T>).install = (app: App) => {
    ; (fn as SFCInstallWithContext<T>)._context = app._context
    app.config.globalProperties[name] = fn
  }

  return fn as SFCInstallWithContext<T>
}


type ClassName = string | undefined | null
type Classes = (ClassName | [any, ClassName, ClassName?])[]
export function createNamespace(name: string) {
  const namespace = `tt-${name}`

  const createBEM = (suffix?: string): string => {
    if (!suffix) return namespace

    return suffix.startsWith('--')
      ? `${namespace}${suffix}`
      : `${namespace}__${suffix}`
  }

  const classes = (...classes: Classes): any[] => {
    return classes.map(className => {
      if (Array.isArray(className)) {
        const [condition, truthy, falsy = null] = className
        return condition ? truthy : falsy
      }

      return className
    })
  }

  return {
    n: createBEM,
    classes
  }
}


export const composeEventHandlers = <E>(
  theirsHandler?: (event: E) => boolean | void,
  oursHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) => {
  const handleEvent = (event: E) => {
    const shouldPrevent = theirsHandler?.(event)

    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler?.(event)
    }
  }
  return handleEvent
}
