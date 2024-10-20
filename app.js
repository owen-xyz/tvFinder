const form = document.querySelector('#searchForm');
const main = document.querySelector('main');
const navbar = document.querySelector('.navbar');
const inputText=document.querySelector('#searchText');
const conth4 = document.createElement('h4');
conth4.addEventListener('click',()=>{
    inputText.focus();
    inputText.select();

});

// Tambahkan class untuk h4 agar lebih mudah dicari
conth4.classList.add('text-center','border','border-info','p-2');
conth4.textContent = 'Find Your Favorite TV Show'; // Set text untuk h4
main.appendChild(conth4); // Tambahkan h4 ke dalam main

const imgContainer = document.createElement('div');
imgContainer.classList.add('img-container'); // Tambahkan class untuk imgContainer

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const keyWord = form.elements.query.value;
    const config = {
        params: {
            q: keyWord,
        }
    };
    try {
        const res = await axios.get('https://api.tvmaze.com/search/shows/', config);
        clear(); 
        getImg(res.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

const getImg = (shows) => {
    main.classList.remove( 'align-items-center'); // Hapus class justify dan align
    main.append(imgContainer); 

    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            imgContainer.append(img); // Tambahkan img ke dalam imgContainer
            img.classList.add('img-fluid', 'rounded', 'shadow', 'm-2');
            img.addEventListener('click', () => {
                alert('click');
            });
        }

        
    }
};

const clear = () => {
    // Menghapus elemen h4 jika ada
    const existingH4 = main.querySelector('h4');
    if (existingH4) {
        existingH4.remove();
    }
    imgContainer.innerHTML = '';
};
