type Constructor<T> = new (...args: unknown[]) => T

class DI {
  private objectRegistry: Record<string, Constructor<unknown>> | Record<string, any> = {}
  private dependencyRegistry: Record<string, string[] | Record<string, any>> = {}

  register<T>(
    key: string,
    InjectedObject: Constructor<T> | Record<string, any>,
    dependencyKeys?: string[] | Record<string, any>,
  ): void {
    if (typeof InjectedObject === 'object') {
      class Constructor {
        constructor() {
          Object.assign(this, InjectedObject)
        }
      }
      this.objectRegistry[key] = Constructor
    } else {
      this.objectRegistry[key] = InjectedObject
    }
    if (dependencyKeys) {
      this.dependencyRegistry[key] = dependencyKeys
    }
  }

  resolve<T>(key: string): T {
    const Constructor = this.objectRegistry[key]
    if (!Constructor) {
      throw new Error(`Dependency not registered: ${key}`)
    }
    const dependencyKeys = this.dependencyRegistry[key]
    if (dependencyKeys) {
      if (Array.isArray(dependencyKeys)) {
        const dependencies = dependencyKeys.map((dependencyKey: string) =>
          this.resolve(dependencyKey),
        )
        return new Constructor(...dependencies) as T
      } else {
        const resolvedDependencies = []
        const entries = Object.entries(dependencyKeys)
        for (const [nestedKey] of entries) {
          const resolvedDependency = this.resolve(nestedKey)
          resolvedDependencies.push(resolvedDependency)
        }
        return new Constructor(...resolvedDependencies) as T
      }
    } else {
      return new Constructor() as T
    }
  }

  clear(): void {
    this.objectRegistry = {}
    this.dependencyRegistry = {}
  }
}

export const di = new DI()
