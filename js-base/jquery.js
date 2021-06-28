
class jQuery {
    constructor(selector) {
        const selectors = document.querySelectorAll(selector)
        const length = selectors.length

        for (let i = 0; i < length; i++) {
            this[i] = selectors[i]
        }
        this.length = length
        this.selectors = selectors
    }

    get(index) {
        return this[index]
    }
    each(fn) {
        for (let i = 0; i < this.length; i++) {
            const elem = this[i]
            fn(elem)
        }
    }
    on(type, fn) {
        return this.each(elem => {
            elem.addEventListener(type, fn, false)
        })
    }
}

//  插件
jQuery.prototype.dialog = function(info) {
    alert(info)
}

//  扩展
class myJquery extends jQuery {
    constructor(selector) {
        super(selector)
    }
    // 扩展方法
    addClass() {
        //  ...
    }
}