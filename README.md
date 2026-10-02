# Buwax Özlüce — bağımsız tasarım ön izlemesi

Resmî işletme sitesi veya ücretli müşteri işi değildir. Kullanıcının tasarım ve yayın onayıyla hazırlanmış bir portföy konseptidir. İşletmenin ticari onayı henüz teyitli değildir.

## Tasarım

- Sarı/antrasit görsel yön korunurken başlıklar ve metinler sadeleştirildi.
- iPhone UI esintili yumuşak cam butonlar: kenarlarda daha saydam, ortada daha yoğun yatay gradyan, arka plan bulanıklığı ve hafif iç kenar ışığı. Apple ürünü veya bire bir sistem kontrolü değildir.
- Beş hizmet için bilgi pencereleri, WhatsApp mesaj hazırlama, Instagram ve telefon bağlantıları, galeri/zoom, canlı semt haritası, 404.
- Görseller yapay üretilmiş ve açıkça temsili etiketlenmiştir. Orijinal logo, gerçek iş fotoğrafları, fiyat, garanti, çalışma saatleri ve kesin pin henüz işletmeden alınmadı.
- Kesin adres uyuşmazlığı nedeniyle harita yalnız Özlüce semtini gösterir; işletme noktası olduğu iddia edilmez.
- Form hiçbir bilgi saklamaz; yalnız ziyaretçinin seçtiği mesajı WhatsApp'ta hazırlar, otomatik göndermez. Veri tabanı, özel randevu yazılımı, analitik veya çerez takibi yoktur.
- Ön izleme `noindex` ve `robots.txt` ile arama motorlarından hariç tutulmuştur.

## Yerel kullanım

Node.js 22 veya üzeri; uygulamada ek bağımlılık yoktur.

```sh
npm run check
npm run dev
```

`dist/` Cloudflare Pages'e yayınlanır. Build yalnız statik dosyaları kopyalar. GitHub kaynak kodu ve Cloudflare yayın kanıtı, tamamlandığında yerel QA/YAYIN kaydına eklenir.

## Kaynaklar

- [Smart Guard resmî merkez listesi](https://smart-guard.com.tr/uygulama-merkezleri/) — Buwax, telefon ve Instagram eşleşmesi.
- [İşletme Instagram](https://www.instagram.com/buwaxozluce/) — gerçek fotoğraflar için yönlendirme; bu örnekte Instagram fotoğrafları kullanılmadı.
- Görsel üretim modu: yerleşik image_gen, CLI/API fallback değil. Tam promptlar [ASSET-PROMPTS.md](ASSET-PROMPTS.md) içinde; siteye alınan dosyalar `public/images/hero.webp`, `ppf.webp`, `interior.webp`.

## Yayın sınırı

GitHub yalnız bu projeyi içerir; özel müşteri konuşmaları, araştırma dosyaları veya kimlik bilgileri yüklenmez. GitHub/Cloudflare hesabı, müşteri iletişimi veya başka projeler değiştirilmez. Ücret ve satın alma onayı verilmiş sayılmaz.
