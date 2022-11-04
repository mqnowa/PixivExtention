function insertCheckbox(){
    const grid = document.getElementsByClassName('eLoyxI')[0]; grid.setAttribute('style', 'grid-template-columns: repeat(5, auto)');
     const div = document.createElement('div');          div.style = "height: 40px"
      const ul = document.createElement('ul');           ul.style = "list-style: none; margin: 0; padding: 0;";
       const li1 = document.createElement('li');
        const toggle1 = document.createElement('div');   toggle1.className = "mytoggle"; toggle1.id = "mytoggler18";
         const input1 = document.createElement('input'); input1.type = "checkbox";       input1.name = "check";
       const li2 = document.createElement('li');         li2.style = "margin-top: 4px"
        const toggle2 = document.createElement('div');   toggle2.className = "mytoggle"; toggle2.id = "mytoggler18g";
         const input2 = document.createElement('input'); input2.type = "checkbox";       input2.name = "check";
    
    toggle1.addEventListener('click', e => {
        if (toggle1.classList.contains('checked')) toggle1.classList.remove('checked');
        else toggle1.classList.add('checked');
    })
    toggle2.addEventListener('click', e => {
        if (toggle2.classList.contains('checked')) toggle2.classList.remove('checked');
        else toggle2.classList.add('checked');
    })
    
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