/*
* 深拷贝
* */

const who = {
    age: 20,
    name: 'who',
    address: {
        city: 'FuZhou'
    },
    subjects: ['physics', 'math']
}

let copyWho = deepClone(who)
copyWho['age'] = 21

console.log(copyWho['age'])  // 21
console.log(who['age'])  // 20

function deepClone(cloneObj = {}) {
    if (typeof cloneObj !== 'object' || cloneObj == null) {
        return cloneObj
    }

    let result
    if (cloneObj instanceof Array) {
        result = []
    } else {
        result = {}
    }

    for (let key in cloneObj) {
        if (cloneObj.hasOwnProperty(key)) {
            result[key] = deepClone(cloneObj[key])
        }
    }

    return result
}
