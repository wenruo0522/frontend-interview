

function loadImg(src) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            const err = new Error(`load image failed`)
            reject(err)
        }
        img.src = src
    })
}

const url = `http://img1.sycdn.imooc.com/5db494da000185a819201080-140-140.jpg`

loadImg(url).then(img => {
    console.log(img.width)
    return img
}).then(img => {
    console.log(img.height)
}).catch(err => console.error(err))