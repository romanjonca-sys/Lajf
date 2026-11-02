**Nie wszystkie uwagi z r1 zostały domknięte.** Pozostały dwa częściowe wdrożenia oraz nowy błąd w opisie akceptacji procedury. Ocena opiera się wyłącznie na źródłach z bieżącego katalogu. Znalezisko 1 pomijam zgodnie z poleceniem.

| R1 | Naprawione? | Wynik ponownej kontroli |
|---|---|---|
| 2. Gotowość na kontrolę | Tak | Usunięto gwarancję gotowości i ograniczono opis do funkcji panelu. |
| 3. Pozyskiwanie klientów | Tak | Opisano stronę z ofertą, cennikiem i formularzem. |
| 4. Import Excel/CSV | Tak | Linia 131 wskazuje CSV wyeksportowany z Excela. |
| 5. Dane wyłącznie w UE | **Częściowo** | Linie 23 i 42 prawidłowo zawężają deklarację do bazy i dokumentów. Jednak wzmianka o „zewnętrznym dostawcy poczty” nadal nie ujawnia przetwarzania w USA. Dodać: „Wiadomości e-mail obsługuje Resend, który przetwarza je w USA”. Niespójność §8 ust. 3 umowy z jej częścią dotyczącą transferów pozostaje. |
| 6. Okres przechowywania | Tak merytorycznie | Linia 43 rozróżnia początki okresów z art. 49 ust. 1 i 2. Pozostała niezręczność językowa opisana poniżej. |
| 7. Uniknięta strata | Tak | Linia 48 prawidłowo wymienia korzyść i stratę oraz limit zastępczy. |
| 8. Karta i termin jako wymóg ustawy | Tak | Linia 60 przedstawia kartę jako sposób organizacji dokumentacji. |
| 9. Osobny dokument zgłoszeń | Tak | Linia 42 mówi o wyodrębnionej procedurze. Nie narzuca osobnego pliku. |
| 10. Podpis i data akceptacji | **Częściowo** | Usunięto obowiązkowy podpis i datę. Wprowadzono jednak błędne wskazanie osoby akceptującej, opisane poniżej. |
| 11. Utrudnienia przy beneficjencie | Tak | Linia 32 obejmuje utrudnienia także przy skutecznej weryfikacji oraz dokumentowanie czynności dotyczących osoby na wyższym stanowisku kierowniczym. |
| 12. Zakres pkt 15a | Tak | Oba teksty obejmują opinie, wyjaśnienia, prawo celne i zastrzeżenie dotyczące innych instytucji obowiązanych. |
| 13. Godzina obsługi | Tak | Linie 24 i 134 obejmują wspólnym limitem wsparcie i zmiany. Linia 24 wyłącza awarie. |
| 14. Koszt i zakończenie współpracy | Tak | Linia 46 podaje sumę rat, skutki wcześniejszego rozwiązania po stronie biura i możliwość zakończenia współpracy po roku. |
| 15. Zakres nowelizacji | **Częściowo** | Linia 6 prawidłowo wskazuje niezmienione pkt 15a i 17. Nadal brakuje daty: **11 stycznia 2027 r.** Dopisać ją po informacji o zmianie pkt 1. Wynika z art. 57 nowelizacji obejmującego art. 33. |
| 16. Kolejność kontroli | Tak | Linie 5 i 52 dopuszczają sprawdzenie procedury oraz jej stosowania. |
| 17. Nagłówek llms.txt | Tak | Jest „Poradnik dla firm i gabinetów”. |

Nowe znaleziska:

| Plik:linia | Priorytet | Cytat i problem | Poprawka |
|---|---|---|---|
| `src/pages/poradnik/procedura-aml-biuro-rachunkowe.astro:58` | **P2** | „zaakceptowane przez właściciela lub kadrę kierowniczą”. Art. 50 ust. 3 wskazuje **kadrę kierowniczą wyższego szczebla**. Sam status właściciela nie wystarcza. Art. 9 dotyczy działalności wykonywanej jednoosobowo. Obecne zdanie rozszerza krąg uprawnionych i przeczy poprawnemu opisowi w linii 17. | „Procedura i każda jej aktualizacja zostały zaakceptowane przed stosowaniem przez kadrę kierowniczą wyższego szczebla. Przy działalności wykonywanej jednoosobowo akceptacji dokonuje osoba prowadząca tę działalność (art. 9 i art. 50 ust. 3).” |
| `src/pages/poradnik/procedura-aml-biuro-rachunkowe.astro:43` | **P2** | „Dokumenty (…) liczysz od zakończenia współpracy (…) Wyniki analiz (…) liczysz od dnia ich przeprowadzenia”. Liczy się okres przechowywania, nie dokumenty ani wyniki. | „Dokumentację z art. 49 ust. 1 przechowujesz przez 5 lat od zakończenia stosunków gospodarczych lub przeprowadzenia transakcji okazjonalnej. Wyniki analiz z art. 34 ust. 3 przechowujesz przez 5 lat od ich przeprowadzenia (art. 49 ust. 2).” |

Ponowna weryfikacja sygnatur:

| Odesłania | Wynik |
|---|---|
| Art. 2 ust. 1 pkt 15a i 17 | Prawidłowe. |
| Art. 8 i 9 | Prawidłowe w głównym omówieniu. Zastrzeżenie do checklisty wskazane wyżej. |
| Art. 27 ust. 1 i 3 | Prawidłowe: ocena działalności, forma papierowa lub elektroniczna, aktualizacja w razie potrzeby i co najmniej co 2 lata. |
| Art. 33 ust. 2 i 3 oraz art. 34 | Prawidłowe. |
| Art. 49 ust. 1 i 2 | Prawidłowe rozróżnienie okresów. |
| Art. 50 ust. 1 oraz ust. 2 pkt 1–11 | Prawidłowe jako uproszczone omówienie. |
| Art. 50 ust. 3 | Numer prawidłowy. Treść checklisty wymaga wskazanej poprawki. |
| Art. 52 ust. 1–3 i art. 53 | Prawidłowe. |
| Art. 130 ust. 1 i ust. 2 pkt 1 lit. e oraz art. 131 | Prawidłowe. |
| Art. 147 pkt 2, 7, 9 i 10 | Prawidłowe przypisanie naruszeń. |
| Art. 150 ust. 1, 2 i 4 | Prawidłowe. Limit z ust. 2 odpowiada biurom kwalifikowanym z pkt 15a i 17. |
| Dz.U. 2025 poz. 1669 | Zmienia art. 72. |
| Dz.U. 2026 poz. 875 | Zmienia art. 129f i 129h. |
| Dz.U. 2026 poz. 1206 | Zmienia art. 2 ust. 1 pkt 1 **oraz art. 89 ust. 1**, od 11 stycznia 2027 r. Nie zmienia omawianych obowiązków biur. |

W czterech wskazanych plikach nie znalazłem długiej pauzy ani zakazanych przecinków przed „i”, „oraz” lub „a także”. Poza świadomie odłożonym znaleziskiem 1 nie znalazłem nowych obietnic funkcjonalnych bez pokrycia w README lub umowie. Nie zmieniałem plików.
---
**Po rundzie 2 (2.11.2026, Claude):** naniesione wszystkie uwagi r2: data 11.01.2027 przy Dz.U. 2026 poz. 1206 (sprawdzona w art. 57 nowelizacji), akceptacja procedury przez kadrę kierowniczą wyższego szczebla albo osobę prowadzącą działalność jednoosobowo (art. 50 ust. 3 i art. 9), poprawione zdanie o okresach z art. 49, Resend i przetwarzanie w USA nazwane wprost na stronie oferty. Znalezisko 1 z r1 (procedura i ocena ryzyka biura w ofercie mimo wyłączenia w umowie pierwszego biura) czeka na decyzję Romana.
