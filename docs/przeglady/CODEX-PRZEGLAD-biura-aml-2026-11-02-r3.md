Brak P1. Dwa ustalenia P2, oba dotyczą znacznika czasu.

1. **src/pages/biura-rachunkowe.astro:24 | P2**  
   **Cytat:** „dowód, że treść nie zmieniła się po akceptacji”.  
   **Problem:** znacznik poświadcza istnienie określonego skrótu danych w oznaczonym czasie. Porównanie skrótów pozwala sprawdzić zgodność treści. Sam znacznik nie dowodzi momentu akceptacji ani tożsamości akceptującego. README rozdziela akceptację, obliczenie SHA-256 i uzyskanie znacznika.  
   **Poprawka:** „Znacznik czasu RFC 3161 potwierdza, że skrót zaakceptowanej treści istniał w oznaczonym czasie. Pozwala sprawdzić zgodność treści niezależnie od nas.”

2. **src/pages/biura-rachunkowe.astro:24, 136 | P2**  
   **Cytaty:** „panel dołącza znacznik czasu RFC 3161”; „Umowy akceptowane online, z dziennikiem i znacznikiem czasu”.  
   **Problem:** oba fragmenty obiecują znacznik bezwarunkowo. README:34 wskazuje, że brak lub awaria dostawcy nie cofa podpisu. Konfiguracja:38–39 wskazuje obecnie niekwalifikowany FreeTSA.  
   **Poprawka w opisie:** „Po akceptacji panel próbuje uzyskać niekwalifikowany znacznik czasu RFC 3161. Jeśli dostawca jest niedostępny, akceptacja pozostaje skuteczna bez znacznika.”  
   **Poprawka w karcie ceny:** „Umowy akceptowane online z dziennikiem zdarzeń i obsługą znaczników czasu”.

Pozostałe sprawdzenia bez ustaleń:

- Link, kod jednorazowy wysyłany mailem, dziennik wysłania, otwarcia i akceptacji oraz PDF dla klienta i biura odpowiadają README:29–35.
- Forma dokumentowa wystarcza do zawarcia samej umowy o usługi księgowe. W dostarczonych tekstach nie znalazłem dodatkowego ustawowego wymogu formy szczególnej dla tej umowy. Osobne oświadczenie o przyjęciu odpowiedzialności podlega art. 4 ust. 5 UoR.
- Opis art. 4 ust. 5 UoR jest wierny w zakresie przyjęcia odpowiedzialności i formy pisemnej. Brak rygoru nieważności odpowiada art. 73 § 1 KC. Przepis UoR pozostawia również odpowiedzialność kierownika jednostki, w tym za nadzór.
- Odesłania do art. 77² KC i art. 78¹ § 2 KC są poprawne. Sformułowanie o podpisie kwalifikowanym jest dopuszczalnym skrótem treści art. 78¹ § 1–2.
- „W przygotowaniu” czytelnie oddziela przyszły kwalifikowany znacznik i podpis od obecnej funkcji. FAQ potwierdza konieczność podpisania wskazanego oświadczenia poza panelem.
- W dodanych fragmentach brak długiej pauzy oraz przecinków przed „i”, „oraz” i „a także”. Brak pozostałych błędów polszczyzny wymagających P2.

Sprawdzone przepisy, wyłącznie w dostarczonych tekstach:

- **KC, Dz.U. 2026 poz. 795:** art. 60, art. 73 § 1–2, art. 74 § 1–4, art. 76, art. 77, art. 77², art. 77³, art. 78 § 1, art. 78¹ § 1–2 oraz art. 734–750.
- **UoR, Dz.U. 2026 poz. 522:** art. 4 ust. 5, art. 11, art. 76a–76i. Dodatkowo przeszukano oba teksty pod kątem wymogów formy odnoszących się do tej umowy.
---
**Po rundzie 3 (3.11.2026, Claude):** oba P2 naniesione: opis znacznika zmieniony na „potwierdza, że skrót zaakceptowanej treści istniał w oznaczonym czasie”, dopisane „obecnie niekwalifikowany” i to, że przy niedostępności dostawcy akceptacja pozostaje ważna bez znacznika. W karcie ceny zostało „z dziennikiem zdarzeń i znacznikiem czasu” (krótka etykieta; warunek opisany w pozycji zakresu powyżej).
