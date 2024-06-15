document.addEventListener("DOMContentLoaded", () => {
    const judulBukuInput = document.getElementById('judul-buku');
    const tambahBukuButton = document.getElementById('tambah-buku');
    const rakBuku = {
        'rak-1' : document.querySelector('#rak-1 .daftar-buku'),
        'rak-2' : document.querySelector('#rak-2 .daftar-buku')
    };

    const muatBuku = () =>{
        for(let key in rakBuku){
            const buku = JSON.parse(localStorage.getItem(key)) || [];
            buku.forEach(judul => {
                const li = buatElement(judul);
                rakBuku[key].appendChild(li);
            });
        }
    };

    const simpanBuku = () => {
        for (let key in rakBuku) {
            const buku = [];
            rakBuku[key].querySelectorAll('li').forEach(li => {
                buku.push(li.firstChild.textContent);
            });
            localStorage.setItem(key, JSON.stringify(buku));
        }
    };


    const buatElemenBuku = (judul) => {
        const li = document.createElement('li');
        li.textContent = judul;

        const pindahButton = document.createElement('button');
        pindahButton.textContent = 'Pindah';
        pindahButton.addEventListener('click', () => {
            const rakSekarang = li.parentElement.parentElement.id;
            const rakTujuan = rakSekarang === 'rak-1' ? 'rak-2' : 'rak-1';
            rakBuku[rakSekarang].removeChild(li);
            rakBuku[rakTujuan].appendChild(li);
            simpanBuku();
        });

        const hapusButton = document.createElement('button');
        hapusButton.textContent = 'Hapus';
        hapusButton.addEventListener('click', () => {
            li.parentElement.removeChild(li);
            simpanBuku();
        });

        li.appendChild(pindahButton);
        li.appendChild(hapusButton);

        return li;
    };

    tambahBukuButton.addEventListener('click', () => {
        const judul = judulBukuInput.value.trim();
        if (judul !== '') {
            const li = buatElemenBuku(judul);
            rakBuku['rak-1'].appendChild(li);
            judulBukuInput.value = '';
            simpanBuku();
        }
    });

    muatBuku();
});