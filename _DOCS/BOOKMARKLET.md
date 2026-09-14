# WebDude Task Capture Bookmarklet

## Bookmarklet Code

Másold be ezt a kódot a böngésző könyvjelzőibe:

```javascript
javascript:(function(){
  const url = window.location.href;
  const selection = window.getSelection().toString();
  const target = 'https://webdude.hu/admin/work-log';
  const params = new URLSearchParams({
    url: url,
    text: selection
  });
  window.open(`${target}?${params.toString()}`, '_blank', 'width=600,height=500');
})();
```

## Használat

1. Hozz létre egy új könyvjelzőt a böngésződben
2. Nevezd el: "WebDude Task Capture"
3. Illeszd be a fenti JavaScript kódot a URL mezőbe
4. Bármelyik oldalon kattints a könyvjelzőre → megnyílik a gyors-rögzítő form az aktuális URL-lel és kijelölt szöveggel
