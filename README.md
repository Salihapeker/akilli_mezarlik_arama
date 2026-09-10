# Akıllı Mezarlık Kayıt Arama ve Konumlandırma Sistemi

Bu prototip **hatalı veya farklı yazılmış isimleri toleranslı biçimde bulma** özelliğini gösterir.

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

Bu sürümde gerçek kişisel veri kullanılmamıştır. 

## Geliştirme yol haritası

1. Fuzzy name matching ✅
2. Türkçe karakter normalizasyonu ✅
3. Sonuçların skorlanması ✅
4. Mezarlık / ada / parsel / mezar bilgilerinin gösterimi ✅
5. Haritada örnek konum gösterimi ✅
