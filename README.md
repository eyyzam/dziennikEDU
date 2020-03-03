# dziennikEDU+

Technologie użyte do napisania aplikacji:
- Angular v7.2.0
- Angular Material v7.3.7
- Firebase (FireAuth, FireStore)

## Co jest zaimplementowane?

- Każdy zarejestrowany użytkownik ma swoją rolę (Dostępne: Admin, Nauczyciel, Uczeń).
- Dane są aktualizaowane na bieżąco (głównie przez fireStore).
- Możliwość zalogowania się przy użyciu konta Google i przy użyciu kombinacji email / hasło.
- Przejrzysty design UI sprawia, że korzystanie z aplikacji nie jest męczące.
- Dzięki CKEditor 5 ogłoszenia są czytelne.
- Cała aplikacja jest responsywna.

# Aplikacja jest cały czas rozbudowywana

To czym się dzielę na chwilę obecną to rendery i początkowa faza projektu
Oto co jeszcze zostało do zaimplenentowania:

- [ ] Napisać testy e2e
- [ ] Dokończyć panel zarządzania nauczyciela
- [ ] Stworzyć przejrzyste UI dla ucznia/rodzica i wyświetlać dane ucznia
- [ ] Stworzyć panel administratora który umożliwi zarządzanie zarejestrowanymi kontami, przypisywać je do poszczególnych uczniów oraz przyspisywać role.

## Screenshoty z appki

Zarządzanie ogłoszeniami       |     Zarządzanie uczniami      
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/59890819/75770430-30719500-5d48-11ea-98e0-6e6b081086d1.PNG" width="200" alt=""> | <img src="https://user-images.githubusercontent.com/59890819/75770440-35364900-5d48-11ea-9c20-4e956583b74b.PNG" width="200" alt=""> 

Zarządzanie uczniami      |  Logowanie do aplikacji       
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/59890819/75770449-39626680-5d48-11ea-95b2-0bb17611426e.PNG" width="200" alt=""> | <img src="https://user-images.githubusercontent.com/59890819/75770455-3d8e8400-5d48-11ea-9e96-840b5b5c5564.PNG" width="200" alt=""> 

Tworzenie / Modyfikacja ucznia      |  Panel boczny ucznia     
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/59890819/75770463-41220b00-5d48-11ea-9c93-4a2d5fddcf88.PNG" width="200" alt=""> | <img src="https://user-images.githubusercontent.com/59890819/75770471-441cfb80-5d48-11ea-8330-79cfdc225f8a.PNG" width="50" height="100" alt=""> 

## Żeby uruchomić appkę u siebie należy: 

- Zmodyfikować plik environments/environment.ts i wrzucić do niego swoje dane aplikacji Firebase
- w konsole npm init (zainstaluje to potrzebne moduły)
- w konsole ng serve (jeżeli mamy CLI), w przeciwnym razie npm start
