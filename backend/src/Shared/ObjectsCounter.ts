export class Monitor {
    public static printInstances(): string {
        let resp =  ''
        Counter.objectsCount.forEach((val: number, key: string) => {
            resp = `${key}: ${val} \n`
        })
        return resp
    }
}

class Counter {
    static objectsCount = new Map<string, number>()
    static increment(className: string) {
        if (!this.objectsCount.get(className)) {
            this.objectsCount.set(className, 1)
        } else {
            const currVal = this.objectsCount.get(className)
            this.objectsCount.set(className, currVal! + 1)
        }
    }
}

export function countInstances<T extends {new(...args: any[]):{}}>(constructor: T) {
    return class extends constructor {
        counter = Counter.increment(constructor.name)
    }
}