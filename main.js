main = () => {
    const scripts = ["middleclick2previw"];
    scripts.forEach(file => {
        const s = document.createElement("script");
        s.src = "https://4vent.github.io/PixivExtention/" + file;
        document.body.appendChild(s);
    });
};

main();