flip = () => {
    document.getElementById('card').classList.toggle('flipped')
    
    document.querySelector('#front .reflection').classList.toggle('move')

    document.querySelector('#back .reflection').classList.toggle('move')

}

document.getElementById('show-btn').addEventListener('click',flip)
document.getElementById('hide-btn').addEventListener('click',flip)