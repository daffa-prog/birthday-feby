
document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. AMBIL ELEMEN DARI index.html
  // =========================================
  const screens = [...document.querySelectorAll(".screen")];
  const petalLayer = document.getElementById("petalLayer");
  const giftButton = document.getElementById("openGift");
  const musicToggle = document.getElementById("musicToggle");
  const musicLabel = document.getElementById("musicLabel");
  const music = document.getElementById("birthday-music");

  const letterContent = document.getElementById("letterContent");
  const slideCount = document.getElementById("slideCount");
  const slideDots = document.getElementById("slideDots");
  const prevSlide = document.getElementById("prevSlide");
  const nextSlide = document.getElementById("nextSlide");

  if (!screens.length) {
    console.error("Elemen .screen tidak ditemukan di index.html");
    return;
  }

  // =========================================
  // 2. NAVIGASI ANTARHALAMAN
  // =========================================
  function showScreen(id) {
    const target = document.getElementById(id);

    if (!target || !target.classList.contains("screen")) {
      console.warn("Halaman tidak ditemukan:", id);
      return;
    }

    screens.forEach((screen) => {
      const active = screen === target;
      screen.classList.toggle("active", active);
      screen.setAttribute("aria-hidden", String(!active));
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (id !== "home") {
      document.body.classList.add("has-opened");
    }
  }

  // Tombol yang memakai data-next
  document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => {
      const destination = button.dataset.next;

      if (destination === "0" || destination === "home") {
        showScreen("home");
        if (giftButton) giftButton.classList.remove("opening");
        return;
      }

      if (destination === "next-slide") {
        goToNextSlide();
        return;
      }

      showScreen(destination);

      if (destination === "ending") {
        burstPetals(35);
      }
    });
  });

  // Tombol yang memakai data-go, jika masih ada di HTML
  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
      const destination = button.dataset.go;

      if (destination === "home") {
        showScreen("home");
        if (giftButton) giftButton.classList.remove("opening");
        return;
      }

      showScreen(destination);

      if (destination === "ending") {
        burstPetals(35);
      }
    });
  });

  // Klik logo untuk kembali ke halaman kado
  document.querySelectorAll(".brand").forEach((brand) => {
    brand.addEventListener("click", (event) => {
      event.preventDefault();
      showScreen("home");
    });
  });

  // =========================================
  // 3. MUSIK LOKAL
  // =========================================
  function updateMusicButton(isPlaying) {
    if (musicToggle) {
      musicToggle.classList.toggle("playing", isPlaying);
      musicToggle.setAttribute("aria-pressed", String(isPlaying));
    }

    if (musicLabel) {
      musicLabel.textContent = isPlaying ? "Jeda Musik" : "Putar Musik";
    }
  }

  async function playMusic() {
    if (!music) {
      alert("Elemen audio tidak ditemukan. Periksa index.html.");
      return;
    }

    try {
      await music.play();
      updateMusicButton(true);
    } catch (error) {
      updateMusicButton(false);
      console.warn("Musik tidak bisa diputar:", error);
      alert(
        "Musik belum bisa diputar. Pastikan file music/golden-hour.mp3 tersedia dan nama filenya benar, lalu tekan tombol Putar Musik."
      );
    }
  }

  if (musicToggle && music) {
    musicToggle.addEventListener("click", async () => {
      if (music.paused) {
        await playMusic();
      } else {
        music.pause();
        updateMusicButton(false);
      }
    });

    music.addEventListener("play", () => updateMusicButton(true));
    music.addEventListener("pause", () => updateMusicButton(false));
    music.addEventListener("ended", () => updateMusicButton(false));
  }

  // =========================================
  // 4. KOTAK KADO
  // =========================================
  if (giftButton) {
    giftButton.addEventListener("click", async () => {
      if (giftButton.classList.contains("opening")) return;

      giftButton.classList.add("opening");
      burstPetals(90);

      // Klik kado adalah tindakan pengguna yang mencoba memulai musik.
      if (music && music.paused) {
        try {
          await music.play();
          updateMusicButton(true);
        } catch (error) {
          // Jika autoplay gagal, pengguna masih bisa menekan tombol musik.
          updateMusicButton(false);
          console.info("Tekan tombol Putar Musik untuk memulai lagu.");
        }
      }

      // Beri waktu singkat untuk animasi kado.
      window.setTimeout(() => {
        showScreen("greeting");
        giftButton.classList.remove("opening");
      }, 700);
    });
  }

  // =========================================
  // 5. ISI SURAT ULANG TAHUN UNTUK FEBY
  // =========================================
  const letterSlides = [
    [
      "Happy birthday, my love. ❤️",
      "Selamat ulang tahun yang ke-22 untuk seseorang yang sudah menjadi bagian dari perjalanan hidupku selama lebih dari 5 tahun ini.",
      "Kalau dipikir-pikir, waktu berjalan begitu cepat. Rasanya baru kemarin kita masih sama-sama duduk di bangku kelas 11 MAN, masih sama-sama belajar, masih belum tahu akan sejauh apa perjalanan kita. Tapi ternyata, sampai hari ini kita masih bersama. Dari masa MAN, melewati banyak cerita, sampai sekarang kita sudah sama-sama berada di semester 7 perkuliahan."
    ],
    [
      "Selama lebih dari 5 tahun ini, mungkin kita sudah banyak berubah. Kita pernah bahagia, pernah berantem, pernah salah paham, pernah kecewa, pernah saling menguatkan, dan mungkin ada juga masa-masa di mana kita sama-sama merasa lelah. Tapi dari semua itu, aku bersyukur kita masih memilih untuk tetap bertahan dan berjalan bersama sampai sejauh ini.",
      "Aku nggak tahu nanti perjalanan kita akan seperti apa, tapi untuk hari ini aku cuma ingin kamu tahu bahwa aku benar-benar bersyukur pernah dan masih bisa menjadi bagian dari hidup kamu."
    ],
    [
      "Di umur kamu yang ke-22 ini, aku nggak mau cuma mendoakan kamu supaya bahagia hari ini. Aku ingin kamu selalu sehat, dipanjangkan umur, dilancarkan semua kegiatan dan urusanmu, dimudahkan setiap langkah yang kamu ambil, dan diberikan kekuatan ketika menghadapi hal-hal yang nggak mudah.",
      "Semoga semua yang sedang kamu perjuangkan sekarang bisa mendapatkan hasil yang baik. Semoga apa yang kamu inginkan, apa yang kamu impikan, dan apa yang selama ini kamu doakan, perlahan-lahan bisa Allah wujudkan di waktu yang paling tepat."
    ],
    [
      "Kalau suatu hari nanti kamu merasa capek, merasa tertinggal, atau merasa semuanya terlalu berat, aku harap kamu ingat bahwa kamu sudah sejauh ini. Kamu sudah melewati banyak hal yang dulu mungkin kamu pikir nggak akan sanggup kamu lewati. Jadi jangan terlalu keras sama diri kamu sendiri.",
      "Aku juga berharap di umur 22 ini kamu bisa lebih banyak menemukan alasan untuk tersenyum, lebih banyak merasakan ketenangan, dan lebih sering merasa bangga dengan diri kamu sendiri."
    ],
    [
      "Terima kasih sudah menjadi bagian dari hidupku selama lebih dari 5 tahun. Terima kasih untuk semua waktu, cerita, perhatian, kesabaran, dan hal-hal kecil yang mungkin sering nggak sempat aku ucapkan terima kasihnya.",
      "Kita mungkin nggak selalu menjadi pasangan yang sempurna, tapi aku bersyukur pernah melewati masa-masa itu bersama kamu. Dari dua orang yang dulu masih sama-sama di kelas 11 MAN, sampai sekarang sudah sama-sama berjuang menyelesaikan perkuliahan di semester 7.",
      "Semoga tahun ini menjadi salah satu tahun terbaik dalam hidup kamu. Semoga langkah kamu selalu dipermudah, rezeki kamu dilancarkan, hati kamu ditenangkan, dan semua hal baik selalu menemukan jalan untuk datang kepada kamu."
    ],
    [
      "Dan untuk perjalanan kita ke depannya, aku nggak berani menjanjikan semuanya akan selalu mudah. Tapi selama kita masih sama-sama mau belajar, saling memahami, dan saling menjaga, aku berharap kita masih bisa terus berjalan dan melihat sejauh apa cerita ini akan membawa kita.",
      "Happy 22nd birthday, my love. ❤️",
      "Semoga kamu selalu sehat. Semoga kamu selalu bahagia. Semoga semua impian kamu tercapai. Dan semoga di setiap langkah yang kamu ambil, selalu ada hal baik yang menunggu di depan sana.",
      "Terima kasih sudah menjadi kamu. Dan terima kasih karena selama lebih dari 5 tahun ini, kamu sudah menjadi salah satu bagian terpenting dalam perjalanan hidupku.",
      "I love you, more than words can explain. ❤️"
    ]
  ];

  let currentSlide = 0;

  // Gunakan titik slide yang sudah tersedia di HTML.
  // Kalau belum tersedia, buat enam titik secara otomatis.
  if (slideDots && slideDots.children.length === 0) {
    letterSlides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slide-dot";
      dot.setAttribute("aria-label", `Buka bagian surat ${index + 1}`);
      slideDots.appendChild(dot);
    });
  }

  function renderSlide() {
    if (!letterContent) return;

    letterContent.style.animation = "none";
    void letterContent.offsetWidth;
    letterContent.style.animation = "";

    letterContent.replaceChildren();

    letterSlides[currentSlide].forEach((paragraph, index) => {
      const element = document.createElement("p");
      element.textContent = paragraph;

      if (currentSlide === 5 && index === 4) {
        element.classList.add("highlight");
      }

      letterContent.appendChild(element);
    });

    if (slideCount) {
      slideCount.textContent =
        `${String(currentSlide + 1).padStart(2, "0")} / ` +
        `${String(letterSlides.length).padStart(2, "0")}`;
    }

    if (prevSlide) {
      prevSlide.disabled = currentSlide === 0;
      prevSlide.style.opacity = currentSlide === 0 ? "0.45" : "1";
    }

    if (nextSlide) {
      nextSlide.textContent =
        currentSlide === letterSlides.length - 1
          ? "Lihat kenangan →"
          : "Lanjutkan →";
    }

    if (slideDots) {
      [...slideDots.children].forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
        dot.setAttribute(
          "aria-current",
          index === currentSlide ? "step" : "false"
        );
      });
    }
  }

  function goToNextSlide() {
    if (currentSlide < letterSlides.length - 1) {
      currentSlide++;
      renderSlide();
    } else {
      showScreen("gallery");
      burstPetals(35);
    }
  }

  function goToPreviousSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      renderSlide();
    }
  }

  if (prevSlide) {
    prevSlide.addEventListener("click", goToPreviousSlide);
  }

  if (nextSlide) {
    nextSlide.addEventListener("click", goToNextSlide);
  }

  if (slideDots) {
    [...slideDots.children].forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (index < letterSlides.length) {
          currentSlide = index;
          renderSlide();
        }
      });
    });
  }

  // =========================================
  // 6. ANIMASI KELopak BUNGA JATUH
  // =========================================
  const petalColors = [
    "#b92337",
    "#d94355",
    "#ef9da8",
    "#f5c4ca",
    "#e6ae48",
    "#fff0d7",
    "#e87583"
  ];

  function burstPetals(amount) {
    if (!petalLayer) return;

    for (let i = 0; i < amount; i++) {
      const petal = document.createElement("span");
      petal.className = "petal";

      const size = 8 + Math.random() * 15;

      petal.style.left = `${Math.random() * 100}%`;
      petal.style.width = `${size}px`;
      petal.style.height = `${size * (1.1 + Math.random() * 0.7)}px`;
      petal.style.background =
        petalColors[Math.floor(Math.random() * petalColors.length)];
      petal.style.setProperty("--drift", `${Math.random() * 260 - 130}px`);
      petal.style.setProperty("--spin", `${Math.random() * 1000 - 500}deg`);
      petal.style.animationDuration = `${3.5 + Math.random() * 5.5}s`;
      petal.style.animationDelay = `${Math.random() * 0.8}s`;

      petalLayer.appendChild(petal);

      petal.addEventListener(
        "animationend",
        () => petal.remove(),
        { once: true }
      );
    }
  }

  // =========================================
  // 7. TOMBOL ESCAPE
  // =========================================
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      // Musik tidak dihentikan oleh Escape.
      // Tombol musik tetap dapat digunakan kapan saja.
    }
  });

  // =========================================
  // 8. MULAI WEBSITE
  // =========================================
  screens.forEach((screen) => {
    screen.setAttribute(
      "aria-hidden",
      String(!screen.classList.contains("active"))
    );
  });

  renderSlide();
});
