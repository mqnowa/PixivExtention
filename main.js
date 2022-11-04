main = () => {
    const scripts = ["prexiview.js"];
    scripts.forEach(file => {
        const s = document.createElement("script");
        s.src = "https://4vent.github.io/PixivExtention/" + file;
        document.body.appendChild(s);
    });
};

// var href = location.href;
// var _status = 0

// function a(e) {
//     if(href != location.href) {
//         const my_status = _status + 1;
//         _status = my_status
//         setTimeout(() => {
//             if (my_status == _status) {
//                 main();
//                 href = location.href;
//                 _status = 0;
//             }
//         }, 100);
//     }
// }

// document.addEventListener("DOMNodeInserted", a);

main();