/* Daftar kabupaten & kota (kotamadya) untuk dropdown "Cek Kota Saya".
   Sumber: Kemendagri (514 wilayah). Ibu kota kabupaten ditulis
   dalam kurung jika berbeda dari nama kabupaten, supaya ketikan
   seperti "Ngabang" tetap ketemu. Campaign pertama: semua tersedia. */
export const CITIES = [
  "Jakarta Barat", "Jakarta Pusat", "Jakarta Selatan",
  "Jakarta Timur", "Jakarta Utara", "Kabupaten Aceh Barat (Meulaboh)",
  "Kabupaten Aceh Barat Daya (Blangpidie)", "Kabupaten Aceh Besar (Kota Jantho)", "Kabupaten Aceh Jaya (Calang)",
  "Kabupaten Aceh Selatan (Tapak Tuan)", "Kabupaten Aceh Singkil (Singkil)", "Kabupaten Aceh Tamiang (Karang Baru)",
  "Kabupaten Aceh Tengah (Takengon)", "Kabupaten Aceh Tenggara (Kutacane)", "Kabupaten Aceh Timur (Idi Rayeuk)",
  "Kabupaten Aceh Utara (Lhoksukon)", "Kabupaten Agam (Lubuk Basung)", "Kabupaten Alor",
  "Kabupaten Asahan (Kisaran)", "Kabupaten Asmat", "Kabupaten Badung",
  "Kabupaten Balangan", "Kabupaten Bandung", "Kabupaten Bandung Barat",
  "Kabupaten Banggai", "Kabupaten Banggai Kepulauan", "Kabupaten Banggai Laut",
  "Kabupaten Bangka (Sungailiat)", "Kabupaten Bangka Barat (Mentok)", "Kabupaten Bangka Selatan (Toboali)",
  "Kabupaten Bangka Tengah (Koba)", "Kabupaten Bangkalan", "Kabupaten Bangli",
  "Kabupaten Banjar", "Kabupaten Banjarnegara", "Kabupaten Bantaeng",
  "Kabupaten Bantul", "Kabupaten Banyuasin (Pangkalan Balai)", "Kabupaten Banyumas (Purwokerto)",
  "Kabupaten Banyuwangi", "Kabupaten Barito Kuala", "Kabupaten Barito Selatan",
  "Kabupaten Barito Timur", "Kabupaten Barito Utara", "Kabupaten Barru",
  "Kabupaten Batang", "Kabupaten Batanghari (Muara Bulian)", "Kabupaten Batu Bara (Limapuluh)",
  "Kabupaten Bekasi", "Kabupaten Belitung (Tanjung Pandan)", "Kabupaten Belitung Timur (Manggar)",
  "Kabupaten Belu", "Kabupaten Bener Meriah (Simpang Tiga Redelong)", "Kabupaten Bengkalis",
  "Kabupaten Bengkayang", "Kabupaten Bengkulu Selatan (Kota Manna)", "Kabupaten Bengkulu Tengah (Karang Tinggi)",
  "Kabupaten Bengkulu Utara (Kota Arga Makmur)", "Kabupaten Berau", "Kabupaten Biak Numfor",
  "Kabupaten Bima", "Kabupaten Bintan (Bandar Seri Bentan)", "Kabupaten Bireuen",
  "Kabupaten Blitar", "Kabupaten Blora", "Kabupaten Boalemo",
  "Kabupaten Bogor", "Kabupaten Bojonegoro", "Kabupaten Bolaang Mongondow",
  "Kabupaten Bolaang Mongondow Selatan", "Kabupaten Bolaang Mongondow Timur", "Kabupaten Bolaang Mongondow Utara",
  "Kabupaten Bombana", "Kabupaten Bondowoso", "Kabupaten Bone",
  "Kabupaten Bone Bolango", "Kabupaten Boven Digoel", "Kabupaten Boyolali",
  "Kabupaten Brebes", "Kabupaten Buleleng", "Kabupaten Bulukumba",
  "Kabupaten Bulungan", "Kabupaten Bungo (Muara Bungo)", "Kabupaten Buol",
  "Kabupaten Buru", "Kabupaten Buru Selatan", "Kabupaten Buton",
  "Kabupaten Buton Selatan", "Kabupaten Buton Tengah", "Kabupaten Buton Utara",
  "Kabupaten Ciamis", "Kabupaten Cianjur", "Kabupaten Cilacap",
  "Kabupaten Cirebon", "Kabupaten Dairi (Sidikalang)", "Kabupaten Deiyai",
  "Kabupaten Deli Serdang (Lubuk Pakam)", "Kabupaten Demak", "Kabupaten Dharmasraya (Pulau Punjung)",
  "Kabupaten Dogiyai", "Kabupaten Dompu", "Kabupaten Donggala",
  "Kabupaten Empat Lawang (Tebing Tinggi)", "Kabupaten Ende", "Kabupaten Enrekang",
  "Kabupaten Fak Fak", "Kabupaten Flores Timur", "Kabupaten Garut",
  "Kabupaten Gayo Lues (Blang Kejeren)", "Kabupaten Gianyar", "Kabupaten Gorontalo",
  "Kabupaten Gorontalo Utara", "Kabupaten Gowa", "Kabupaten Gresik",
  "Kabupaten Grobogan", "Kabupaten Gunung Mas", "Kabupaten Gunungkidul",
  "Kabupaten Halmahera Barat", "Kabupaten Halmahera Selatan", "Kabupaten Halmahera Tengah",
  "Kabupaten Halmahera Timur", "Kabupaten Halmahera Utara", "Kabupaten Hulu Sungai Selatan",
  "Kabupaten Hulu Sungai Tengah", "Kabupaten Hulu Sungai Utara", "Kabupaten Humbang Hasundutan (Dolok Sanggul)",
  "Kabupaten Indragiri Hilir (Tembilahan)", "Kabupaten Indragiri Hulu (Rengat)", "Kabupaten Indramayu",
  "Kabupaten Intan Jaya", "Kabupaten Jayapura", "Kabupaten Jayawijaya",
  "Kabupaten Jember", "Kabupaten Jembrana", "Kabupaten Jeneponto",
  "Kabupaten Jepara", "Kabupaten Jombang", "Kabupaten Kaimana",
  "Kabupaten Kampar (Bangkinang)", "Kabupaten Kapuas", "Kabupaten Kapuas Hulu (Putussibau)",
  "Kabupaten Karanganyar", "Kabupaten Karangasem", "Kabupaten Karawang",
  "Kabupaten Karimun (Tanjung Balai Karimun)", "Kabupaten Karo (Kabanjahe)", "Kabupaten Katingan",
  "Kabupaten Kaur", "Kabupaten Kayong Utara (Sukadana)", "Kabupaten Kebumen",
  "Kabupaten Kediri", "Kabupaten Keerom", "Kabupaten Kendal",
  "Kabupaten Kepahiang", "Kabupaten Kepulauan Anambas (Tarempa)", "Kabupaten Kepulauan Aru",
  "Kabupaten Kepulauan Mentawai (Tua Pejat)", "Kabupaten Kepulauan Meranti (Selatpanjang)", "Kabupaten Kepulauan Sangihe",
  "Kabupaten Kepulauan Selayar", "Kabupaten Kepulauan Siau Tagulandang Biaro", "Kabupaten Kepulauan Sula",
  "Kabupaten Kepulauan Talaud", "Kabupaten Kepulauan Tanimbar", "Kabupaten Kepulauan Yapen",
  "Kabupaten Kerinci (Siulak)", "Kabupaten Ketapang (Delta Pawan)", "Kabupaten Klaten",
  "Kabupaten Klungkung", "Kabupaten Kolaka", "Kabupaten Kolaka Timur",
  "Kabupaten Kolaka Utara", "Kabupaten Konawe", "Kabupaten Konawe Kepulauan",
  "Kabupaten Konawe Selatan", "Kabupaten Konawe Utara", "Kabupaten Kotabaru",
  "Kabupaten Kotawaringin Barat", "Kabupaten Kotawaringin Timur", "Kabupaten Kuantan Singingi (Koto Taluk)",
  "Kabupaten Kubu Raya (Sungai Raya)", "Kabupaten Kudus", "Kabupaten Kulon Progo",
  "Kabupaten Kuningan", "Kabupaten Kupang", "Kabupaten Kutai Barat",
  "Kabupaten Kutai Kartanegara", "Kabupaten Kutai Timur", "Kabupaten Labuhanbatu (Rantau Prapat)",
  "Kabupaten Labuhanbatu Selatan (Kota Pinang)", "Kabupaten Labuhanbatu Utara (Aek Kanopan)", "Kabupaten Lahat",
  "Kabupaten Lamandau", "Kabupaten Lamongan", "Kabupaten Lampung Barat",
  "Kabupaten Lampung Selatan", "Kabupaten Lampung Tengah", "Kabupaten Lampung Timur",
  "Kabupaten Lampung Utara", "Kabupaten Landak (Ngabang)", "Kabupaten Langkat (Stabat)",
  "Kabupaten Lanny Jaya", "Kabupaten Lebak", "Kabupaten Lebong (Tubei)",
  "Kabupaten Lembata", "Kabupaten Lima Puluh Kota (Sarilamak)", "Kabupaten Lingga (Daik)",
  "Kabupaten Lombok Barat", "Kabupaten Lombok Tengah", "Kabupaten Lombok Timur",
  "Kabupaten Lombok Utara", "Kabupaten Lumajang", "Kabupaten Luwu",
  "Kabupaten Luwu Timur", "Kabupaten Luwu Utara", "Kabupaten Madiun",
  "Kabupaten Magelang", "Kabupaten Magetan", "Kabupaten Mahakam Ulu",
  "Kabupaten Majalengka", "Kabupaten Majene", "Kabupaten Malaka",
  "Kabupaten Malang", "Kabupaten Malinau", "Kabupaten Maluku Barat Daya",
  "Kabupaten Maluku Tengah", "Kabupaten Maluku Tenggara", "Kabupaten Mamasa",
  "Kabupaten Mamberamo Raya", "Kabupaten Mamberamo Tengah", "Kabupaten Mamuju",
  "Kabupaten Mamuju Tengah", "Kabupaten Mandailing Natal (Panyabungan)", "Kabupaten Manggarai",
  "Kabupaten Manggarai Barat", "Kabupaten Manggarai Timur", "Kabupaten Manokwari",
  "Kabupaten Manokwari Selatan", "Kabupaten Mappi", "Kabupaten Maros",
  "Kabupaten Maybrat", "Kabupaten Melawi (Nanga Pinoh)", "Kabupaten Mempawah",
  "Kabupaten Merangin (Bangko)", "Kabupaten Merauke", "Kabupaten Mesuji",
  "Kabupaten Mimika", "Kabupaten Minahasa", "Kabupaten Minahasa Selatan",
  "Kabupaten Minahasa Tenggara", "Kabupaten Minahasa Utara", "Kabupaten Mojokerto",
  "Kabupaten Morowali", "Kabupaten Morowali Utara", "Kabupaten Muara Enim",
  "Kabupaten Muaro Jambi (Sengeti)", "Kabupaten Mukomuko (Kota Mukomuko)", "Kabupaten Muna",
  "Kabupaten Muna Barat", "Kabupaten Murung Raya", "Kabupaten Musi Banyuasin (Sekayu)",
  "Kabupaten Musi Rawas (Muara Beliti)", "Kabupaten Musi Rawas Utara (Rupit)", "Kabupaten Nabire",
  "Kabupaten Nagan Raya (Suka Makmue)", "Kabupaten Nagekeo", "Kabupaten Natuna (Ranai)",
  "Kabupaten Nduga", "Kabupaten Ngada", "Kabupaten Nganjuk",
  "Kabupaten Ngawi", "Kabupaten Nias (Gido)", "Kabupaten Nias Barat (Lahomi)",
  "Kabupaten Nias Selatan (Teluk Dalam)", "Kabupaten Nias Utara (Lotu)", "Kabupaten Nunukan",
  "Kabupaten Ogan Ilir (Indralaya)", "Kabupaten Ogan Komering Ilir (Kayu Agung)", "Kabupaten Ogan Komering Ulu (Baturaja)",
  "Kabupaten Ogan Komering Ulu Selatan (Muaradua)", "Kabupaten Ogan Komering Ulu Timur (Martapura)", "Kabupaten Pacitan",
  "Kabupaten Padang Lawas (Sibuhuan)", "Kabupaten Padang Lawas Utara (Gunung Tua)", "Kabupaten Padang Pariaman (Parit Malintang)",
  "Kabupaten Pakpak Bharat (Salak)", "Kabupaten Pamekasan", "Kabupaten Pandeglang",
  "Kabupaten Pangandaran", "Kabupaten Pangkajene dan Kepulauan", "Kabupaten Paniai",
  "Kabupaten Parigi Moutong", "Kabupaten Pasaman (Lubuk Sikaping)", "Kabupaten Pasaman Barat (Simpang Ampek)",
  "Kabupaten Pasangkayu", "Kabupaten Paser", "Kabupaten Pasuruan",
  "Kabupaten Pati", "Kabupaten Pegunungan Arfak", "Kabupaten Pegunungan Bintang",
  "Kabupaten Pekalongan", "Kabupaten Pelalawan (Pangkalan Kerinci)", "Kabupaten Pemalang",
  "Kabupaten Penajam Paser Utara", "Kabupaten Penukal Abab Lematang Ilir (Talang Ubi)", "Kabupaten Pesawaran",
  "Kabupaten Pesisir Barat", "Kabupaten Pesisir Selatan (Painan)", "Kabupaten Pidie (Sigli)",
  "Kabupaten Pidie Jaya (Meureudu)", "Kabupaten Pinrang", "Kabupaten Pohuwato",
  "Kabupaten Polewali Mandar", "Kabupaten Ponorogo", "Kabupaten Poso",
  "Kabupaten Pringsewu", "Kabupaten Probolinggo", "Kabupaten Pulang Pisau",
  "Kabupaten Pulau Morotai", "Kabupaten Pulau Taliabu", "Kabupaten Puncak",
  "Kabupaten Puncak Jaya", "Kabupaten Purbalingga", "Kabupaten Purwakarta",
  "Kabupaten Purworejo", "Kabupaten Raja Ampat", "Kabupaten Rejang Lebong (Curup)",
  "Kabupaten Rembang", "Kabupaten Rokan Hilir (Bagansiapiapi)", "Kabupaten Rokan Hulu (Pasir Pengaraian)",
  "Kabupaten Rote Ndao", "Kabupaten Sabu Raijua", "Kabupaten Sambas",
  "Kabupaten Samosir (Pangururan)", "Kabupaten Sampang", "Kabupaten Sanggau (Kapuas)",
  "Kabupaten Sarmi", "Kabupaten Sarolangun", "Kabupaten Sekadau (Sekadau Hilir)",
  "Kabupaten Seluma (Pasar Tais)", "Kabupaten Semarang", "Kabupaten Seram Bagian Barat",
  "Kabupaten Seram Bagian Timur", "Kabupaten Serang", "Kabupaten Serdang Bedagai (Sei Rampah)",
  "Kabupaten Seruyan", "Kabupaten Siak", "Kabupaten Sidenreng Rappang",
  "Kabupaten Sidoarjo", "Kabupaten Sigi", "Kabupaten Sijunjung (Muaro Sijunjung)",
  "Kabupaten Sikka", "Kabupaten Simalungun (Raya)", "Kabupaten Simeulue (Sinabang)",
  "Kabupaten Sinjai", "Kabupaten Sintang", "Kabupaten Situbondo",
  "Kabupaten Sleman", "Kabupaten Solok (Arosuka)", "Kabupaten Solok Selatan (Padang Aro)",
  "Kabupaten Soppeng", "Kabupaten Sorong", "Kabupaten Sorong Selatan",
  "Kabupaten Sragen", "Kabupaten Subang", "Kabupaten Sukabumi",
  "Kabupaten Sukamara", "Kabupaten Sukoharjo", "Kabupaten Sumba Barat",
  "Kabupaten Sumba Barat Daya", "Kabupaten Sumba Tengah", "Kabupaten Sumba Timur",
  "Kabupaten Sumbawa", "Kabupaten Sumbawa Barat", "Kabupaten Sumedang",
  "Kabupaten Sumenep", "Kabupaten Supiori", "Kabupaten Tabalong",
  "Kabupaten Tabanan", "Kabupaten Takalar", "Kabupaten Tambrauw",
  "Kabupaten Tana Tidung", "Kabupaten Tana Toraja", "Kabupaten Tanah Bumbu",
  "Kabupaten Tanah Datar (Batusangkar)", "Kabupaten Tanah Laut", "Kabupaten Tangerang",
  "Kabupaten Tanggamus", "Kabupaten Tanjung Jabung Barat (Kuala Tungkal)", "Kabupaten Tanjung Jabung Timur (Muara Sabak)",
  "Kabupaten Tapanuli Selatan (Sipirok)", "Kabupaten Tapanuli Tengah (Pandan)", "Kabupaten Tapanuli Utara (Tarutung)",
  "Kabupaten Tapin", "Kabupaten Tasikmalaya", "Kabupaten Tebo (Muara Tebo)",
  "Kabupaten Tegal", "Kabupaten Teluk Bintuni", "Kabupaten Teluk Wondama",
  "Kabupaten Temanggung", "Kabupaten Timor Tengah Selatan", "Kabupaten Timor Tengah Utara",
  "Kabupaten Toba (Balige)", "Kabupaten Tojo Una Una", "Kabupaten Toli-Toli",
  "Kabupaten Tolikara", "Kabupaten Toraja Utara", "Kabupaten Trenggalek",
  "Kabupaten Tuban", "Kabupaten Tulang Bawang", "Kabupaten Tulang Bawang Barat",
  "Kabupaten Tulungagung", "Kabupaten Wajo", "Kabupaten Wakatobi",
  "Kabupaten Waropen", "Kabupaten Way Kanan", "Kabupaten Wonogiri",
  "Kabupaten Wonosobo", "Kabupaten Yahukimo", "Kabupaten Yalimo",
  "Kepulauan Seribu", "Kota Ambon", "Kota Balikpapan",
  "Kota Banda Aceh", "Kota Bandar Lampung", "Kota Bandung",
  "Kota Banjar", "Kota Banjarbaru", "Kota Banjarmasin",
  "Kota Batam", "Kota Batu", "Kota Baubau",
  "Kota Bekasi", "Kota Bengkulu", "Kota Bima",
  "Kota Binjai", "Kota Bitung", "Kota Blitar",
  "Kota Bogor", "Kota Bontang", "Kota Bukittinggi",
  "Kota Cilegon", "Kota Cimahi", "Kota Cirebon",
  "Kota Denpasar", "Kota Depok", "Kota Dumai",
  "Kota Gorontalo", "Kota Gunungsitoli", "Kota Jambi",
  "Kota Jayapura", "Kota Kediri", "Kota Kendari",
  "Kota Kotamobagu", "Kota Kupang", "Kota Langsa",
  "Kota Lhokseumawe", "Kota Lubuk Linggau", "Kota Madiun",
  "Kota Magelang", "Kota Makassar", "Kota Malang",
  "Kota Manado", "Kota Mataram", "Kota Medan",
  "Kota Metro", "Kota Mojokerto", "Kota Padang",
  "Kota Padang Panjang", "Kota Padangsidimpuan", "Kota Pagar Alam",
  "Kota Palangka Raya", "Kota Palembang", "Kota Palopo",
  "Kota Palu", "Kota Pangkal Pinang", "Kota Parepare",
  "Kota Pariaman", "Kota Pasuruan", "Kota Payakumbuh",
  "Kota Pekalongan", "Kota Pekanbaru", "Kota Pematangsiantar",
  "Kota Pontianak", "Kota Prabumulih", "Kota Probolinggo",
  "Kota Sabang", "Kota Salatiga", "Kota Samarinda",
  "Kota Sawahlunto", "Kota Semarang", "Kota Serang",
  "Kota Sibolga", "Kota Singkawang", "Kota Solok",
  "Kota Sorong", "Kota Subulussalam", "Kota Sukabumi",
  "Kota Sungai Penuh", "Kota Surabaya", "Kota Surakarta (Solo)",
  "Kota Tangerang", "Kota Tangerang Selatan", "Kota Tanjung Pinang",
  "Kota Tanjungbalai", "Kota Tarakan", "Kota Tasikmalaya",
  "Kota Tebing Tinggi", "Kota Tegal", "Kota Ternate",
  "Kota Tidore Kepulauan", "Kota Tomohon", "Kota Tual",
  "Kota Yogyakarta",
] as const;

export type City = (typeof CITIES)[number];

export function isKnownCity(value: string): boolean {
  return (CITIES as readonly string[]).includes(value);
}

function normalise(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Wilayah yang cocok dengan ketikan. Query kosong = beberapa saran awal. */
export function matchCities(query: string, limit = 30): string[] {
  const q = normalise(query);
  if (!q) return CITIES.slice(0, 8);

  const ranked: { city: (typeof CITIES)[number]; score: number }[] = [];
  for (const city of CITIES) {
    const n = normalise(city);
    const capMatch = city.match(/\(([^)]+)\)\s*$/);
    const cap = capMatch ? normalise(capMatch[1]) : "";
    const short = normalise(
      city.replace(/^(Kabupaten|Kota)\s+/i, "").replace(/\s*\([^)]*\)\s*$/, ""),
    );

    let score: number | null = null;
    if (n === q || short === q || cap === q) score = 0;
    else if (short.startsWith(q) || cap.startsWith(q)) score = 1;
    else if (n.startsWith(q)) score = 2;
    else if (short.includes(q) || cap.includes(q)) score = 3;
    else if (n.includes(q)) score = 4;
    if (score === null) continue;
    ranked.push({ city, score });
  }

  ranked.sort((a, b) => a.score - b.score || a.city.localeCompare(b.city, "id"));
  return ranked.slice(0, limit).map((row) => row.city);
}
