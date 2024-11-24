const searchInput=document.getElementById('searchInput');
const lists=document.querySelectorAll('#list li');
const searchIcon=document.querySelector('.fa-magnifying-glass');
const xmarkIcon=document.querySelector('.fa-xmark');

const updateDisplay = ()=>{
    const searchTerm=searchInput.value.trim().toLowerCase();
    xmarkIcon.computedStyleMap.display=searchTerm ? 'block' : 'none';
    searchIcon.style.display=searchTerm ?'none':'block';

    lists.forEach(item=>{
        const languageName=item.textContent.toLowerCase();
        
        item.style.display=languageName.includes(searchTerm) ? 'block' : 'none';
    });

}

searchInput.addEventListener('input',updateDisplay);
xmarkIcon.addEventListener('click',()=>{
    searchInput.value='';
    updateDisplay();
});
