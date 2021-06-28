
for (let i = 0; i < 10; i++) {
    let a = document.createElement('a')
    a.innerHTML = i + '<br>'
    a.addEventListener('click', function(e) {
        e.preventDefault()
        console.log(i)
    })
    document.body.appendChild(a)
}