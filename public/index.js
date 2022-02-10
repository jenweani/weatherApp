var form = document.getElementById('form')
var input = document.getElementById('input')
const info = document.getElementById('info')
const locate = document.getElementById('location')
const lat = document.getElementById('lat')
const long = document.getElementById('long')

var address = null
input.onchange = e => {
    address = e.target.value
}

const getWeather = (e) => {
    e.preventDefault()
    console.log(address)
    if(address){
        locate.innerHTML = '...'
        info.innerHTML = '...'
        lat.innerHTML = '...'
        long.innerHTML = '...'

        fetch(`/weather?address=${address}`).then((response) => {
            response.json().then(data => {
                if (data.error){
                    document.getElementById('errorMsg').innerHTML = data.error
                    document.getElementById('errorMsg').style.visibility = 'visible'
                }else {
                    locate.innerHTML = data.address
                    info.innerHTML = data.forecast
                    lat.innerHTML = data.location.latitude
                    long.innerHTML = data.location.longitude
                    document.getElementById('errorMsg').style.visibility = 'hidden'
                }
            })
        })
    }else{
        document.getElementById('errorMsg').style.visibility = 'visible'
    }
}

form.onsubmit = getWeather