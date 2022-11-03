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

async function main() {
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

function sleep3sec() {
    const div = document.createElement('div')
    div.style = 'display: flex; position: fixed; z-index: 100; height: 100%; width: 100%; background: #000000cc;';
    document.body.insertBefore(div, document.body.children[0]);
    setTimeout(() => {
        main();
        div.remove();
    }, 3000);
}

var href = location.href;
document.addEventListener("DOMNodeInserted", function(e) {
    e.stopPropagation();
    // observer.observe(document, config);
    if(href !== location.href) {
        sleep3sec();
        href = location.href;
    }
});

// var _status = 0

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        // const my_status = _status + 1;
        // console.log(my_status)
        // _status = my_status;
        // setTimeout(() => {
        //     if (_status == my_status) {
        observer.disconnect();
        main();
        //         _status = 0;
        //     }
        // }, 1000);
    })
})

const config = {
    characterData: true,
    subtree: true
}

sleep3sec();