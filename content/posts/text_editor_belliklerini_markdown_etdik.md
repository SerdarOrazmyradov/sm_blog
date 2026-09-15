---
title: "Text Editor Ýasamak: Medium Frontend Digest-dan Öwrenenlerim we Belliklerim"
date: 2026-09-15T09:00:00+05:00
draft: false
description: "D. Bushell-iň text editor ýasamak baradaky makalasyndan alnan bellikler, Cornell ulgamynda soraglar, synlar we özbaşdak pikirlenmeler."
tags:
  - Frontend
  - Text Editor
  - Web Development
  - Cornell Notes
  - JavaScript
categories:
  - Tech Notes
  - Learning Journey
cover: "/images/dbushell.com-2026-09-01-text-editor.png"
showToc: true
---

> **Ýazyjy barada & Başlangyç:**  
> Medium-da frontend diýip gözleg edip, hepdelik digest-lerdäki birinji makaladan alan belliklerim. makala awtory: [D. Bushell (2026-09-01)](https://dbushell.com/2026/09/01/text-editor/).

---

## 💡 Cornell Notes & Synlar

### 1. Questions & Keywords (Soraglar we Açar Sözler)

* **Design & UI/UX:** Sada we arassa interfeýs taslamasy nähili bolmaly?
* **`::highlight`:** Highlight etmekligi birnäçe usul bilen edip bolýarmy?
* **Overflow meseleleri:** Text editor-da `overflow` nähili kynçylyklary döretdi?
* **Canvas vs Text Cursor:** Canvas-da text cursor pozisiýasy deň düşmän gaçýarmy?
* **Markdown:** Markdown bilen işleýän editor ýasamak we render etmek has aňsatmy?
* **`contenteditable="plaintext-only"`:** Bu bahany ulanmak täze editor kody üçin näçe bähbitli we peýdaly?
* **Textarea Highlighting:** `textarea` elementiniň içindäki koda nähili highlight berdi?
* **Textarea çäklendirmeleri:** `textarea` bilen text editor ýasamak aňsatmy? Formatter/syntax highlighting bermek kyn düşýärmi?
* **Multi-line Paste:** `contentEditable` ulanylanda hem multi-line paste (köp setirli göçürip goýmak) kynçylyk döredýärmi?

---

### 2. Detailed Notes (Jikme-jik Bellikler)

* **Saytyň dizaýny:** Sayt örän gowy, owadan we sada reňkleri yakymly. 100% AI-syz, adamyň öz el bilen ýazan zady. Awtoryň özi bir zada pikirlenip, ahyrynda custom text editor ýasamak kararyna gelipdir.
* **Näme üçin täze editor?** Bar bolan gollar / freýmworklar aşa agyr bolany üçinmi? VS Code open-source bolsa-da, koduny okap doly düşünmek aňsat däl.
* **MVP nähili başlandy?** 
  * Awtoryň ilki **Canvas** bilen başlap gören işleri bar: Enter basyp bolýar, aktiw setir (active line) highlight bolýar, strelkalar bilen sağa-chepe sürüp bolýar we cursor animasiýasy bar. 
  * Ýöne Canvas-da uly kynçylyklar çykdy: Text-i syçanjyk bilen seçip (select edip) bolanok, `undo-redo` ýok, `multi-line paste` işleýänok. Adamyň ömri örän gysga, Canvas-a elastic scroll ýasap oturmak biderek wagt ýitgisi!
* **`contenteditable="plaintext-only"` synagy:**
  * Plain text render etmek üçin adaty `overflow`-ly `div` we `contenteditable="plaintext-only"` kody ulanyldy.
  * Bu attribute autocorrect, spellcheck, translate ýaly brauzer aýratynlyklaryny öçürýär:
  
```html
<div
  contenteditable="plaintext-only"
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  translate="no">
  <!-- text goes here -->
</div>

```

* **Textarea & Highlighting Çözgüdi:**
* `textarea` ulansaň, sanlary/setirleri deňlemek we syntax formatter bermek kyn bolup bilýär.
* Awtor ahyrynda `textarea` hem-de `::highlight` / Custom Highlight API usullaryny denäp gürrüň berýär.



---

### 3. Summary (Jemleme)

> Birinji gezek makalany okap esasy soraglary we düşünilmeli ýerleri çykardym. Ikinji gezek gaýtadan okap, makaladaky tehniki kynçylyklary (Canvas-yň çäklendirmeleri, `contenteditable` peýdalary we `textarea` tärleri) seljerip öz belliklerime geçirdim.

---

## 🔗 Original Reference / Original makala Siltemesi

* **Original Post:** [dbushell.com - Text Editor (Sept 1, 2026)](https://dbushell.com/2026/09/01/text-editor/)
* **Gözleg çeşmesi:** Medium Frontend Weekly Digest

### 🌟 Blogyňyzda Görnüşi Has Owadan Etmek Üçin Maslahatlar:

1. **Cover Suraty (Hugo Cover Card):**  
   Hugo-nyň `hugo-theme-dream` temasy ana sahypada (`home`) kartçkalaryň başynda suratlary gowy görkezýär. Şol sebäpli **Front Matter** taýynda Unsplash-dan tehnologiýa we koda degişli ýokary hilli `cover` adresi goşuldy (`cover: "[https://images.unsplash.com/](https://images.unsplash.com/)..."`). Ýerli surat goýjak bolsaňyz, ony `static/images/` bukjana salyp `/images/my-cover.jpg` görnüşinde bermek hem bolýar.

2. **Görünüş Düzülişi:**  
   Belliklerňizi adaty HTML `<aside>` tegleri däl-de, arassa **Markdown (Cornell Note gurluşy)** görnüşine geçirildi. Bu Hugo-nyň render edijisinde (Goldmark) we `hugo-theme-dream` temasynda örän arassa, visual taydan okalmagy aňsat blockquote-lar we code-block-lar döredýär.

3. **Yzygiderlilik Maslahaty:**  
   Düýn goýup bilmedik bolsaňyz alada etmäň! Her gün makalalary şeýle giňişleýin däl-de, diňe 3 sany esasy sorag-jogap görnüşinde gysgaça paýlaşsaňyz hem yzygiderliligi saklamak aňsat bolar.

