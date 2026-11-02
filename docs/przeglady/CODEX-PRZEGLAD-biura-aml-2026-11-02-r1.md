Publikację wstrzymałbym do poprawienia zakresu oferty i kilku uproszczeń prawnych. Podstawą oceny są dostarczone pliki źródłowe. Internetowy podgląd [ISAP](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000644) zatrzymał się na weryfikacji użytkownika.

1. **src/pages/biura-rachunkowe.astro:21 — P1**  
   **Cytat:** „Procedura wewnętrzna według art. 50 ustawy, ocena ryzyka biura (art. 27)”.  
   Umowa §1 ust. 3 wyłącza oba dokumenty. Cena 999 zł nie potwierdza więc opisanego pakietu. To samo niepoparte rozszerzenie występuje w liniach **11, 38, 102, 128**, w **src/pages/poradnik/procedura-aml-biuro-rachunkowe.astro:68**, **src/lib/artykuly.ts:54** i **src/lib/llms-txt.ts:46**.  
   **Poprawka:** przy zachowaniu zakresu umowy: „Wzór karty AML klienta i panel oceny ryzyka. Procedurę wewnętrzną oraz ocenę ryzyka biura przygotowujesz we własnym zakresie”. Jeżeli dokumenty mają wejść do nowej oferty, trzeba najpierw potwierdzić rozszerzony zakres i cenę w jej umowie.

2. **src/pages/biura-rachunkowe.astro:101 — P1**  
   **Cytat:** „gotowe na kontrolę AML”.  
   Gotowość zależy również od wyłączonych obowiązków biura, szkoleń i rzeczywistego stosowania procedur. Źródła nie potwierdzają tak szerokiego rezultatu. Podobnie linia **120**: „panel pilnuje, żeby tak było” sugeruje kontrolę całego postępowania.  
   **Poprawka:** „Dokumenty klientów i umowy uporządkowane w panelu”; w linii 120: „Panel wymaga pozytywnej decyzji AML przed wysłaniem umowy i przypomina o przeglądach kart”.

3. **src/pages/biura-rachunkowe.astro:102 — P1**  
   **Cytat:** „stronę, która przyprowadza nowych klientów”.  
   Umowa obejmuje wykonanie strony i podstawową konfigurację. Nie gwarantuje pozyskania klientów; rozszerzone pozycjonowanie oraz kampanie są wyłączone.  
   **Poprawka:** „Do tego stronę z ofertą, cennikiem i formularzem kontaktowym”.

4. **src/pages/biura-rachunkowe.astro:131 — P1**  
   **Cytat:** „Import klientów z Excela lub CSV”.  
   README potwierdza import CSV, także po zapisaniu arkusza Excela w tym formacie. Nie potwierdza obsługi XLS/XLSX. FAQ w linii 50 opisuje to poprawnie.  
   **Poprawka:** „Import klientów z CSV, także wyeksportowanego z Excela”.

5. **src/pages/biura-rachunkowe.astro:42 — P1**  
   **Cytat:** „Dane są przechowywane w Unii Europejskiej”.  
   Zdanie obejmuje w odbiorze wszystkie dane klientów. README potwierdza europejskie przechowywanie bazy i plików, lecz wykaz podmiotów przetwarzających w umowie wskazuje Resend oraz przetwarzanie wiadomości w USA. Sama umowa jest tu niespójna z §8 ust. 3.  
   **Poprawka:** „Baza panelu, dokumenty i kopie zapasowe są przechowywane w UE. Wysyłka wiadomości korzysta z dostawcy przetwarzającego dane w USA”. Doprecyzować również skrót „dane w UE” w linii **23** i ujednolicić umowę.

6. **src/pages/poradnik/procedura-aml-biuro-rachunkowe.astro:43 — P1**  
   **Cytat:** „Przechowywanie przez 5 lat (…) Liczone od zakończenia współpracy z klientem”.  
   Art. 49 rozróżnia dokumentację z ust. 1 i wyniki analiz z ust. 2. Te drugie przechowuje się przez 5 lat od przeprowadzenia analizy. Uogólnienie powtarza linia **64**.  
   **Poprawka:** „Dokumentację wymienioną w art. 49 ust. 1 przechowujesz przez 5 lat od zakończenia stosunków gospodarczych lub przeprowadzenia transakcji okazjonalnej. Wyniki analiz z art. 34 ust. 3 przechowujesz przez 5 lat od ich przeprowadzenia”.

7. **src/pages/poradnik/procedura-aml-biuro-rachunkowe.astro:48 — P1**  
   **Cytat:** „dwukrotności korzyści z naruszenia, a gdy nie da się jej ustalić (…) 1 000 000 euro”.  
   Pominięto **stratę unikniętą**. Podstawa z art. 150 ust. 2 jest prawidłowa dla biur kwalifikowanych z pkt 15a i 17. Ustęp 3 nie obejmuje tych punktów.  
   **Poprawka:** „Kara pieniężna może sięgnąć dwukrotności kwoty osiągniętej korzyści lub unikniętej straty. Gdy nie można ustalić tej kwoty, limit wynosi równowartość 1 000 000 euro”.

8. **src/pages/poradnik/procedura-aml-biuro-rachunkowe.astro:60 — P1**  
   **Cytat:** „Każdy klient ma kartę z oceną ryzyka i terminem kolejnego przeglądu (art. 33 ust. 3)”.  
   Przepis wymaga udokumentowania ryzyka i oceny. Nie narzuca formularza karty ani wpisania daty następnego przeglądu.  
   **Poprawka:** „Ryzyko związane z każdym klientem i jego ocena są udokumentowane (art. 33 ust. 2 i 3). Karta z terminem przeglądu jest praktycznym sposobem organizacji tej dokumentacji”.

9. **src/pages/poradnik/procedura-aml-biuro-rachunkowe.astro:42 — P1**  
   **Cytat:** „Osobny dokument”.  
   Art. 53 wymaga opracowania i wdrożenia procedury anonimowego zgłaszania naruszeń. Nie wymaga odrębnego pliku lub dokumentu.  
   **Poprawka:** „Wyodrębniona procedura, która określa między innymi odbieranie zgłoszeń, ochronę zgłaszającego i działania następcze”.

10. **src/pages/poradnik/procedura-aml-biuro-rachunkowe.astro:58 — P2**  
    **Cytat:** „podpisaną akceptację (…) z datą (art. 50 ust. 3)”.  
    Ustęp 3 wymaga akceptacji przed stosowaniem procedury lub aktualizacji. Podpis i data są sposobem jej udokumentowania, a nie wskazaną w tym przepisie formą obowiązkową.  
    **Poprawka:** „Procedura i każda aktualizacja mają akceptację kadry kierowniczej wyższego szczebla przed rozpoczęciem stosowania. Zachowaj dowód tej akceptacji, najlepiej z datą”.

11. **src/pages/poradnik/procedura-aml-biuro-rachunkowe.astro:32 — P2**  
    **Cytat:** „notatka, gdy nie da się zweryfikować beneficjenta”.  
    Art. 50 ust. 2 pkt 11 obejmuje stwierdzone utrudnienia przy weryfikacji tożsamości, również gdy weryfikacja ostatecznie się powiedzie. Przy wskazaniu osoby na wyższym stanowisku kierowniczym wymaga dokumentowania podejmowanych czynności.  
    **Poprawka:** „Dokumentujesz utrudnienia przy weryfikacji tożsamości beneficjenta rzeczywistego oraz czynności podejmowane przy identyfikowaniu jako beneficjenta osoby zajmującej wyższe stanowisko kierownicze”.

12. **src/pages/biura-rachunkowe.astro:30 — P2**  
    **Cytat:** „prowadzenie ksiąg podatkowych, sporządzanie deklaracji lub doradztwo podatkowe”.  
    Skrót pkt 15a pomija opinie, wyjaśnienia i prawo celne oraz zastrzeżenie dotyczące przedsiębiorców niebędących innymi instytucjami obowiązanymi. W artykule, linia **12**, zastrzeżenie jest zachowane, ale zakres usług również skrócono.  
    **Poprawka:** „Podstawowa działalność obejmująca sporządzanie deklaracji, prowadzenie ksiąg podatkowych lub udzielanie porad, opinii albo wyjaśnień z zakresu prawa podatkowego lub celnego, jeżeli przedsiębiorca nie jest inną instytucją obowiązaną”.

13. **src/pages/biura-rachunkowe.astro:134 — P2**  
    **Cytat:** „do 1 godziny zmian miesięcznie”.  
    Umowa §3 ust. 1 obejmuje wspólnym limitem wsparcie techniczne i zmiany treści. Wyjątki awaryjne są poza limitem. Obecne brzmienie może sugerować godzinę samych zmian i dodatkowe nielimitowane wsparcie. To samo dotyczy linii **24**.  
    **Poprawka:** „Do godziny miesięcznie na wsparcie techniczne i zmiany treści. Awarie oraz problemy z bezpieczeństwem obsługujemy poza limitem. Niewykorzystany czas nie przechodzi na kolejny miesiąc”.

14. **src/pages/biura-rachunkowe.astro:46 — P2**  
    **Cytat:** „Po roku wybierasz: sama strona (…) albo strona z panelem”.  
    Ceny są zgodne, ale pominięto możliwość zakończenia współpracy i obowiązek opłacenia pozostałych rat przy wcześniejszym rozwiązaniu z przyczyn leżących po stronie klienta.  
    **Poprawka:** dodać: „Łącznie 11 988 zł netto za pierwsze 12 miesięcy. Wcześniejsze rozwiązanie z przyczyn po Twojej stronie co do zasady nie zwalnia z pozostałych rat. Po roku możesz też zakończyć współpracę i odebrać dane”.

15. **src/pages/poradnik/procedura-aml-biuro-rachunkowe.astro:6 — P2**  
    **Cytat:** „Zmiany (…) nie dotyczą przepisów omawianych w tym artykule”.  
    Dz.U. 2026 poz. 1206 zmienia art. 2 ust. 1 pkt 1. Nie zmienia omawianych pkt 15a i 17, ale zdanie jest zbyt szerokie wobec przywołania art. 2. Zmiana AML z tej nowelizacji wchodzi w życie 11 stycznia 2027 r.  
    **Poprawka:** „Wskazane nowelizacje nie zmieniają omawianych obowiązków biur rachunkowych ani art. 2 ust. 1 pkt 15a i 17. Nowelizacja z 2026 r. poz. 1206 zmienia pkt 1 tego ustępu od 11 stycznia 2027 r.”.

16. **src/pages/poradnik/procedura-aml-biuro-rachunkowe.astro:5 — P2**  
    **Cytat:** „Pierwszym dokumentem, o który zapyta kontrola”.  
    Ustawa nie ustala kolejności żądania dokumentów. Podobnie linia **52**: „Kontrola nie pyta, czy masz dokument” przeczy kontroli samego obowiązku posiadania procedury.  
    **Poprawka:** „Kontrola może sprawdzić zarówno procedurę AML, jak i dowody jej stosowania”.

17. **src/lib/llms-txt.ts:101 — P2**  
    **Cytat:** „Poradnik dla gabinetów”.  
    Pod tym nagłówkiem znajdzie się również artykuł dla biur rachunkowych.  
    **Poprawka:** „Poradnik dla firm i gabinetów”.

Kontrola techniczna: kompilator Astro przetworzył oba nowe pliki bez diagnostyki. Nie znalazłem błędu struktury JSON-LD ani wewnętrznych adresów; FAQ jest również widoczne na stronach. Sitemap pobiera artykuł z rejestru, a ofertę dodano osobno prawidłowo. Tytuły mają **51 i 59 znaków**, opisy **158 i 145 znaków**. W nowych tekstach nie znalazłem długiej pauzy ani zakazanych przecinków przed wskazanymi spójnikami. Pełnego buildu nie uruchamiałem w środowisku tylko do odczytu. `tsc --noEmit` zgłosił błędy w osobnym katalogu `reels/`, więc nie stanowi potwierdzenia poprawności całego projektu.

Lista sprawdzonych przepisów, ocena sposobu przedstawienia w tekstach:

| Przepis | Ocena |
|---|---|
| Art. 2 ust. 1 pkt 15a | **Niezgodne w pełnym odwzorowaniu zakresu**: pominięcia opisane w uwadze 12 |
| Art. 2 ust. 1 pkt 17 | **Zgodne** |
| Art. 8 | **Zgodne** |
| Art. 9 | **Zgodne**: chodzi o działalność wykonywaną jednoosobowo |
| Art. 27 ust. 1 i 3 | **Zgodne** |
| Art. 33 ust. 2 i 3 | **Niezgodne** w checkliście: karta i termin przedstawione jako wymóg przepisu |
| Art. 34 | **Zgodne** jako skrót środków bezpieczeństwa finansowego |
| Art. 49 | **Niezgodne**: uogólniony początek okresu przechowywania |
| Art. 50 ust. 1 | **Zgodne** |
| Art. 50 ust. 2 pkt 1–10 | **Zgodne** jako uproszczone omówienie |
| Art. 50 ust. 2 pkt 11 | **Niezgodne w zakresie omówienia**: zawężenie dokumentowania utrudnień |
| Art. 50 ust. 3 | **Niezgodne w checkliście**: dodatkowy wymóg podpisu |
| Art. 52 ust. 1–3 | **Zgodne** |
| Art. 53 | **Niezgodne co do formy**: nie wymaga osobnego dokumentu |
| Art. 130 ust. 1 i ust. 2 pkt 1 lit. e | **Zgodne** |
| Art. 131 | **Zgodne** |
| Art. 147 pkt 2, 7, 9 i 10 | **Zgodne** |
| Art. 150 ust. 1 i 4 | **Zgodne** |
| Art. 150 ust. 2 | **Niezgodne w opisie limitu**: pominięta uniknięta strata |
| Art. 150 ust. 3 | **Zgodne rozgraniczenie**: nie dotyczy biur wyłącznie z pkt 15a i 17 |

Nowelizacje: **2025 poz. 1669** zmienia art. 72; **2026 poz. 875** zmienia art. 129f i 129h; **2026 poz. 1206** zmienia art. 2 ust. 1 pkt 1 oraz art. 89 ust. 1. Nie zmieniają analizowanych obowiązków biur ani zasad karania z art. 150.