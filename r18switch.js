function insertCheckbox(){
    const grid = document.getElementsByClassName('eLoyxI')[0]; grid.setAttribute('style', 'grid-template-columns: repeat(5, auto)');
     const div = document.createElement('div');
      const ul = document.createElement('ul');           ul.style = "list-style: none;";
       const li1 = document.createElement('li');
        const toggle1 = document.createElement('div');   toggle1.className = "mytoggle";
         const input1 = document.createElement('input'); input1.type = "checkbox";       input1.name = "check";
       const li2 = document.createElement('li');
        const toggle2 = document.createElement('div');   toggle2.className = "mytoggle";
         const input2 = document.createElement('input'); input2.type = "checkbox";       input2.name = "check";
    
    toggle2.appendChild(input2);
    li2.appendChild(toggle2);
    toggle1.appendChild(input1);
    li1.appendChild(toggle1);
    ul.appendChild(li1); ul.appendChild(li2);
    div.appendChild(ul);
    grid.appendChild(div);

    return {
        r18: toggle1,
        r18g: toggle2
    }
}

function importCSS() {
    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://4vent.github.io/PixivExtention/toggle.css";
    document.head.appendChild(link);
}

function main() {
    importCSS();
    toggles = insertCheckbox();
}

main();