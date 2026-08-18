# CBS Tabanlı Akıllı Mezarlık Kayıt Arama ve Konumlandırma Sistemi

Bu proje, Kayseri Büyükşehir Belediyesi'nin kamuya açık Mezarlık Bilgi Sistemi'nde görülen arama alanlarından esinlenilerek hazırlanmış **eğitim amaçlı bir prototiptir**. Gerçek belediye verisi kullanılmaz.

KBB'nin mevcut sisteminde ad, soyad, baba adı, anne adı, doğum/ölüm yılı, bölge, ada, parsel ve mezar no gibi alanlarla arama yapılabilmekte; mezar bölge/ada/parsel/mezar harita katmanları da bulunmaktadır. Bu prototip mevcut sistemi kopyalamak yerine, özellikle **hatalı veya farklı yazılmış isimleri toleranslı biçimde bulma** özelliğini gösterir.

## Proje hedefi

Örneğin kullanıcı `Mehlika` yazdığında veri içinde `Melika`, `Meliha`, `Mehlike` gibi yakın isimleri puanlayarak adayları sıralamak.

Örnek:
- Mehlika Yılmaz — 100
- Melika Yılmaz — yüksek benzerlik
- Meliha Yılmaz — yüksek benzerlik

## Teknolojiler

- Node.js
- Express
- Vanilla HTML/CSS/JavaScript (prototipin kolay çalışması için)
- Levenshtein tabanlı benzerlik
- Türkçe karakter normalizasyonu
- Leaflet + OpenStreetMap (harita gösterimi)
- JSON tabanlı sentetik veri

## Çalıştırma

Gereksinim: Node.js 18+.

```bash
cd backend
npm install
npm start
```

Sonra tarayıcıda:
http://localhost:3000

## API

`GET /api/search?q=mehlika&surname=yilmaz`

İsteğe bağlı:
- `cemetery`
- `limit`

Örnek:
`http://localhost:3000/api/search?q=mehlika&surname=yilmaz`

## Önemli veri güvenliği notu

Bu sürümde gerçek kişisel veri kullanılmamıştır. Gerçek belediye verisi ancak kurumun yetkilendirmesi ve uygun veri erişim yöntemi varsa kullanılmalıdır. Proje, KBB'nin mevcut sistemine doğrudan bağlanmaz ve onun verisini kazımaz.

## Geliştirme yol haritası

1. Fuzzy name matching ✅
2. Türkçe karakter normalizasyonu ✅
3. Sonuçların skorlanması ✅
4. Mezarlık / ada / parsel / mezar bilgilerinin gösterimi ✅
5. Haritada örnek konum gösterimi ✅
6. Birden fazla alanla ağırlıklı eşleştirme
7. Gerçek CBS servisine kurum izniyle entegrasyon
8. Doğal dil / AI destekli arama
9. Kullanıcı yetkilendirme ve audit log
10. Test veri seti ve başarı ölçümü
