const containerVideos = document.querySelector('.videos__container')

async function getVideos() {
    try {
        const busca = await fetch('http://localhost:3000/videos')
        const videos = await busca.json()
        videos.forEach(video => {
            if (video.categoria == '') {
                throw new Error(`Video "${video.titulo}" sem categoria`)
            }
 
            containerVideos.innerHTML += `
            <div class='videos__item'>
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class='descricao-video'>
                    <img class='img-canal' src='${video.imagem || './assets/sidebar/Avatar_Alura.png'}' aria-hidden='true' />
                    <h3 class='titulo-video'>${video.titulo}</h3>
                    <p class='titulo-canal'>${video.descricao}</p>
                </div>
            </div>
        `
        })
    }
    catch (error) {
        containerVideos.innerHTML = `
            <div class='erro'>
                <img src='/assets/emoji-triste.svg' alt='carinha triste' class='erro__emoji' />
                <p class='erro__texto'>Houve um erro ao carregar os vídeos...</p>
                <p class='erro__texto error'>${error}</p>
            </div>
        `
    }
}

getVideos()
