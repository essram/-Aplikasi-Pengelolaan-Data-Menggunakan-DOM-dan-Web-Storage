document.addEventListener("DOMContentLoaded", () => {
  const judulBukuInput = document.getElementById("judul-buku");
  const penulisBukuInput = document.getElementById("penulis-buku");
  const tahunBukuInput = document.getElementById("tahun-buku");
  const isCompleteInput = document.getElementById("isComplete");
  const tambahBukuButton = document.getElementById("tambah-buku");
  const rakBuku = {
      "rak-1": document.querySelector("#rak-1 .daftar-buku"),
      "rak-2": document.querySelector("#rak-2 .daftar-buku"),
  };

  const muatBuku = () => {
      for (let key in rakBuku) {
          const buku = JSON.parse(localStorage.getItem(key)) || [];
          buku.forEach((bukuObj) => {
              const li = buatElemenBuku(bukuObj);
              rakBuku[key].appendChild(li);
          });
      }
  };

  const simpanBuku = () => {
      for (let key in rakBuku) {
          const buku = [];
          rakBuku[key].querySelectorAll("li").forEach((li) => {
              buku.push(JSON.parse(li.dataset.book));
          });
          localStorage.setItem(key, JSON.stringify(buku));
      }
  };

  const buatElemenBuku = (bukuObj) => {
      const li = document.createElement("li");
      li.textContent = `${bukuObj.title} - ${bukuObj.author} (${bukuObj.year})`;
      li.dataset.book = JSON.stringify(bukuObj);

      const pindahButton = document.createElement("button");
      pindahButton.textContent = "Pindah";
      pindahButton.addEventListener("click", () => {
          const rakSekarang = li.parentElement.parentElement.id;
          const rakTujuan = rakSekarang === "rak-1" ? "rak-2" : "rak-1";
          rakBuku[rakSekarang].removeChild(li);
          rakBuku[rakTujuan].appendChild(li);
          simpanBuku();
      });

      const hapusButton = document.createElement("button");
      hapusButton.textContent = "Hapus";
      hapusButton.addEventListener("click", () => {
          li.parentElement.removeChild(li);
          simpanBuku();
      });

      li.appendChild(pindahButton);
      li.appendChild(hapusButton);

      return li;
  };

  tambahBukuButton.addEventListener("click", () => {
      const judul = judulBukuInput.value.trim();
      const penulis = penulisBukuInput.value.trim();
      const tahun = parseInt(tahunBukuInput.value);
      const isComplete = isCompleteInput.checked;

      if (judul !== "" && penulis !== "" && !isNaN(tahun)) {
          const bukuObj = {
              id: +new Date(),
              title: judul,
              author: penulis,
              year: tahun,
              isComplete: isComplete,
          };

          const li = buatElemenBuku(bukuObj);
          rakBuku["rak-1"].appendChild(li);
          judulBukuInput.value = "";
          penulisBukuInput.value = "";
          tahunBukuInput.value = "";
          isCompleteInput.checked = false;
          simpanBuku();
      }
  });

  muatBuku();
});
