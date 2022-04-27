const form = document.querySelector('#form')
const render = document.querySelector('#render')
const render1 = document.querySelector('#render1')




form.addEventListener('submit', (e) => {
    e.preventDefault()
    render.textContent = 'loadding...'
    render1.textContent = ''
    const locationI = document.querySelector('#input-address').value
    axios.get(`/weather?address=${locationI}`)
        .then(function (res) {

            render.textContent = res.data.location
            render1.textContent = res.data.forecast
        })
        .cath(
            render.textContent = "data.error"
        )

})