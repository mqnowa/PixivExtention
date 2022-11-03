main = () => {
    const scripts = ["prexiview.js"];
    scripts.forEach(file => {
        const s = document.createElement("script");
        s.src = "https://4vent.github.io/PixivExtention/" + file;
        document.body.appendChild(s);
    });
};

document.addEventListener("DOMNodeInserted", function(e) {
    e.stopPropagation();
    if(href !== location.href) {
        main();
        href = location.href;
    }
});

main();