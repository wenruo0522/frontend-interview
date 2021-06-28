
//  闭包可以隐藏数据，只提供 API
function createCache() {
    const data = {}
    return {
        set(key, value) {
            data[key] = value
        },
        get(key) {
            return data[key]
        }
    }
}

const c = createCache()
c.set('a', 100)
console.log(c.get('a')) //  100