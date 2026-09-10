# Klavye Ustası

Gitar klavyesi antrenörü. 6 tel, 24 perde, üç alıştırma modu. Tamamen
çevrimdışı çalışır: ses dosyası yok, sesler Web Audio ile sentezleniyor
(Karplus–Strong telli çalgı modeli), ilerleme telefonda saklanıyor.

## Modlar

| Mod | Ne yapar |
|---|---|
| **Gam** | Rastgele bir kök + gam (majör, minör, pentatonikler, blues, modlar) ve klavyede rastgele bir bölge verir; o bölgedeki bütün gam seslerine dokunmanı ister. |
| **Ses Bul** | Klavyede bir sesi işaretler, aynı sesi başka tellerde bulmanı ister. Ayarlardan "tam aynı ses" açılırsa oktavı da tutturman gerekir. |
| **Aralık** | Bir kök ses verir, o sesin b3 / 5 / b7 gibi aralıklarını bölgedeki bütün tel ve oktavlarda bulmanı ister. |
| **Serbest** | Dokun, sesi duy, adını gör. |

## iPhone'a kurmak

1. Bu depoyu GitHub'a gönder.
2. GitHub'da **Settings → Pages → Source: Deploy from a branch → main / (root)** seç.
3. Bir iki dakika sonra çıkan adresi (`https://<kullanıcı>.github.io/<depo>/`)
   iPhone'da **Safari** ile aç.
4. Paylaş düğmesi → **Ana Ekrana Ekle**.

Artık tam ekran bir uygulama gibi açılır ve internet olmadan da çalışır.
Safari şart — Chrome'dan ana ekrana eklenen sayfa çevrimdışı çalışmaz.

## Güncelleme

Kaynak dosya bir üst klasördeki `fretboard.html`. Düzenledikten sonra:

```
python sync.py
cd web && git add -A && git commit -m "guncelleme" && git push
```

`sync.py` önbellek sürümünü artırdığı için telefondaki kopya kendini yeniler
(uygulamayı kapatıp açmak yeterli).
