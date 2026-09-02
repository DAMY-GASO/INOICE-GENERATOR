# DamyGaso Tech — Kitengenezea Hati (Invoice / Receipt / SLA / Proposal)

Chombo kimoja cha mtandaoni (offline, kinafanya kazi bila internet) cha kutengeneza hati nne za kibiashara zenye muundo na rangi sawa (brand consistency) kwa **DamyGaso Tech Solutions**:

- **Invoice** — ankara ya malipo yanayotakiwa
- **Receipt** — risiti ya malipo yaliyopokelewa
- **SLA** — makubaliano ya huduma / mkataba wa awamu
- **Proposal** — pendekezo la mradi kwa mteja

## Muundo wa Faili

```
📁 folda-yako/
 ├── index.html      → Muundo wa ukurasa (fomu + preview)
 ├── style.css        → Rangi, fonti na mpangilio wa hati
 ├── script.js         → Mantiki: hukokotoa na kusasisha preview moja kwa moja
 └── images/
      ├── logo.png                  → Logo ya DamyGaso (inaonekana kwenye kila hati)
      ├── payment-stamp.png     → Muhuri wa "PAYMENT RECEIVED" (kwenye Receipt)
      └── sla-approved-stamp.png → Muhuri wa "APPROVED" (kwenye SLA)
```

⚠️ **Muhimu:** Faili hizi nne (`index.html`, `style.css`, `script.js`, na folda `images/`) lazima ziwe **pamoja kwenye folda moja**, la sivyo logo na muhuri havitaonekana. Weka picha zako mwenyewe ndani ya `images/` kwa majina hayo hayo, au badilisha njia (path) ndani ya `index.html`.

## Jinsi ya Kutumia

1. Fungua `index.html` kwa browser yoyote (Chrome, Edge, Safari) — bonyeza mara mbili tu, hakuna server inayohitajika.
2. Upande wa **kushoto** (fomu), chagua **"Aina ya Hati"**: Invoice, Receipt, SLA, au Proposal.
3. Jaza taarifa zote — preview upande wa **kulia** inasasika (updates) moja kwa moja unavyoandika.
4. Ukimaliza, bonyeza **"Chapisha PDF"** chini ya fomu → dirisha la print litafunguka → chagua **"Save as PDF"** kisha tuma kwa mteja.

## Maelezo ya Kila Sehemu ya Fomu

| Sehemu | Maelezo |
|---|---|
| Namba ya Hati | Weka namba tu (mf. `002`); mfumo unaongeza kiambishi kiotomatiki (`DT-INV-002`, `DT-REC-002`, n.k.) kulingana na aina ya hati |
| Aina ya Huduma | *Website/App* = malipo kwa awamu (20/20/30/30%); *IT Support/Graphics* = malipo kamili (100%) |
| Awamu ya Malipo | Ikichaguliwa, maelezo ya kazi na kiasi vinajazwa kiotomatiki (unaweza kuvihariri) |
| Kiasi Kilichokwisha Lipwa Awali | Jumla ya malipo yote **kabla** ya hii — weka `0` kama ni malipo ya kwanza |
| Kiasi Kinacholipwa Sasa | Kiasi cha malipo haya mahususi |

## Mahesabu ya "Maelezo ya Malipo" (Invoice & Receipt)

Sehemu hii ina mistari 4 inayokokotolewa moja kwa moja:

**Invoice:**
1. Jumla ya gharama ya mradi wote
2. Jumla ya Kiasi kinacholipwa sasa
3. Jumla ya Kiasi kitakachokuwa kimelipwa *(= kilicholipwa awali + kinacholipwa sasa)*
4. Jumla ya Kiasi kinachobakia *(= gharama jumla − kimelipwa)*

**Receipt:**
1. Jumla ya gharama ya mradi wote
2. Jumla ya kiasi kilicholipwa sasa
3. Jumla kamili ya kiasi kilicholipwa
4. Jumla ya kiasi kilichobakia

## Kubadilisha Muhuri (Receipt & SLA)

- Muhuri chaguo-msingi upo kwenye `images/payment-stamp.png` (Receipt) na `images/sla-approved-stamp.png` (SLA).
- Kwenye fomu, chini ya sehemu husika, kuna **"Badilisha Muhuri"** — pakia picha nyingine ukitaka kubadilisha bila kugusa code.

## Kubadilisha Taarifa za Kudumu za Kampuni

Zifuatazo hazibadiliki kwenye fomu — zibadilishwe moja kwa moja ndani ya `index.html`:

- Jina la kampuni, tovuti, simu, barua pepe → tafuta `<div class="document-footer">` na `<div class="company-info">`
- Namba za M-Pesa / Lipa kwa M-Pesa (maelekezo ya malipo kwenye Invoice) → tafuta `id="invoicePaymentInstructions"`
- Rangi za mfumo (navy #003366 n.k.) → badilisha ndani ya `style.css`

## Kuongeza Proposal Mpya (mfano wa mradi mwingine)

Kwenye sehemu ya **Proposal**, jaza sehemu 1–9 (Utangulizi hadi Kwa Nini Tushirikiane). Kwa orodha (Wajibu wa Developer, Viwango vya Kiufundi, n.k.), andika **mstari mmoja kwa kila kipengele** kwa mfumo:

```
Kichwa: Maelezo
```

Kwa muda wa utekelezaji, tumia:

```
Jina la Awamu | Muda
```

## Vidokezo

- Hakuna internet inayohitajika — kila kitu kinafanya kazi ndani ya browser (offline).
- Hakuna data inayotumwa popote; kila kitu kipo kwenye kompyuta yako pekee.
- Kwa matokeo mazuri ya kuchapa, tumia **Chrome au Edge** ("Save as PDF" ina muonekano bora zaidi kuliko browser nyingine).
