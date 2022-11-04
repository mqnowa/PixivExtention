/** @param {PointerEvent} e */
function getATag(e) {
    /**@type {HTMLAnchorElement} */
    var ancorElement;
    for (var i = 0; i < e.path.length; i++) {
        if (e.path[i].tagName == 'A') {
            ancorElement = e.path[i];
            break;
        }
    }
    return ancorElement;
}

/**
 * @param {String} url 
 * @returns {Promise<Document>}
 */
function getHTMLDoc(url) {
    return new Promise(resolve => 
        fetch(url)
            .then(res => res.text())
            .then(text => resolve(new DOMParser().parseFromString(text, "text/html")))
    );
}

/**
 * @param {String} url 
 * @returns {Promise<Object>}
 */
function getPreloadData(url) {
    return new Promise(resolve => 
        getHTMLDoc(url)
            .then(parser => {
                const dataElement = parser.getElementById('meta-preload-data')
                const data = JSON.parse(dataElement.getAttribute('content'))
                resolve(data);
            })
    )
}

// const PREVEW_QUALITY = 'mini'
// const PREVEW_QUALITY = 'small'
const PREVEW_QUALITY = 'regular'
// const PREVEW_QUALITY = 'original'

async function apply_script() {
    const links = document.getElementsByTagName('a');
    const img = document.createElement('img');
    img.style = 'display: block; object-fit: contain; height: 100%; width: 100%;';
    const div = document.createElement('div');
    div.style = 'display: none; position: fixed; z-index: 100; height: 100%; width: 100%; background: #000000cc;';
    div.appendChild(img);
    div.addEventListener('click', e => {
        div.style.display = 'none';
    });
    document.body.insertBefore(div, document.body.children[0]);

    promises = []
    Array.from(links).forEach(async link => {
        if (!link.href.startsWith('https://www.pixiv.net/artworks/')) return;

        link.addEventListener("auxclick", async e => {
            if (e.button != 1) return;
            e.preventDefault();

            const a = getATag(e);
            const id = a.href.match(/[^\/]+$/)
            const data = await getPreloadData(a.href);
            const image_reguler_link = data.illust[id].urls[PREVEW_QUALITY]
            img.src = image_reguler_link
            div.style.display = 'flex';
        });
    });
    console.log("com.4vent.pixivextention.prexiview Loading!")
}

function main() {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    const style = document.createElement("style")
    style.innerHTML = `
    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 700,
        'GRAD' 0,
        'opsz' 48
    }`;
    document.head.appendChild(link)
    document.head.appendChild(style)
    const button = document.createElement("button");
    button.style = "margin-left: 10px;"
    button.onclick = () => {
        apply_script();
        button.disabled = true;
        button.children[0].style = "font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48"
    };
    button.className = "cxMKm";
    button.innerHTML = '<span class="material-symbols-outlined"> visibility </span>'
    const list = document.getElementsByClassName("dDbpNF")[0]
    list.appendChild(button);
}

main();