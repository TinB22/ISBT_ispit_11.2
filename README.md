# Sample Hardhat 3 Beta Project (minimal)

This project has a minimal setup of Hardhat 3 Beta, without any plugins.

## What's included?

The project includes native support for JavaScript, Hardhat scripts, tasks, and support for Solidity compilation and tests.

---

# SimpleToken – Solidity Smart Contract Project

## Pregled projekta
Ovaj projekt izrađen je u sklopu kolegija **Informacijska sigurnost i blockchain tehnologije**. Sustav implementira osnovni pametni ugovor za upravljanje tokenima razvijen u programskom jeziku Solidity. Razvojni ciklus obuhvaća pisanje koda, testiranje pomoću okvira Hardhat te implementaciju na lokalnu blockchain mrežu Ganache.

### Ključne funkcionalnosti
* **Definiranje ukupne zalihe** (Total Supply) prilikom inicijalizacije ugovora.
* **Prijenos tokena** između adresa uz automatsku validaciju stanja.
* **Provjera stanja računa** putem funkcije `balanceOf`.
* **Proširenje ponude (Mint)** – operacija ograničena isključivo na vlasnika ugovora.
* **Smanjenje ponude (Burn)** – operacija ograničena isključivo na vlasnika ugovora.

## Struktura direktorija
* `contracts/`: Izvorni kod pametnog ugovora (`SimpleToken.sol`).
* `scripts/`: Skripte za deploy na mrežu i demonstraciju rada funkcija.
* `test/`: Automatizirani testovi za provjeru integriteta i sigurnosti.
* `hardhat.config.js`: Konfiguracijske postavke za Hardhat okruženje.
* `.env`: Datoteka za pohranu privatnih ključeva (nije uključena u repozitorij).

## Tehnološki stog
* **Solidity**: Programski jezik za pametne ugovore.
* **Hardhat**: Razvojno okruženje za kompajliranje, testiranje i deploy.
* **Ganache**: Lokalna blockchain mreža za razvoj.
* **Ethers.js**: Biblioteka za interakciju s Ethereum mrežom.
* **Node.js**: Runtime okruženje za izvršavanje razvojnih alata.

## Instalacija i postavljanje

### 1. Kloniranje repozitorija
```bash
git clone <repo-url>
cd projekt
```

### 2. Instalacija zavisnosti
Izvršite instalaciju svih potrebnih paketa navedenih u `package.json` datoteci:
```bash
npm install
```

### 3. Konfiguracija lokalne mreže
Pokrenite **Ganache GUI** (Quickstart) i osigurajte da su postavke usklađene s RPC serverom:
* **RPC Server:** `http://127.0.0.1:8545`
* **Network ID:** `5777` (ili automatski)

### 4. Postavljanje okolišnih varijabli
Kreirajte `.env` datoteku u korijenu projekta kako biste sigurno pohranili privatne ključeve. Kopirajte ključeve s Ganache sučelja:

```env
GANACHE_PK=0xVAŠ_PRVI_PRIVATE_KEY
GANACHE_PK_2=0xVAŠ_DRUGI_PRIVATE_KEY
```

## Korištenje i testiranje

### Deploy ugovora
Pokrenite skriptu za postavljanje pametnog ugovora na lokalnu Ganache mrežu:
```bash
npx hardhat run scripts/deploy.js --network ganache
```

### Pokretanje testova
Za provjeru integriteta sustava (funkcije transfer, mint, burn i sigurnosne onlyOwner provjere), pokrenite:
```Bash
npx hardhat test
```

### Demonstracija funkcionalnosti
Izvršite demonstracijsku skriptu koja simulira interakciju s ugovorom i ispisuje hashove transakcija:
```Bash
npx hardhat run scripts/demo.js --network ganache
```
Primjer mog rezultata:
```Bash
Token: 0xcFcfbC3B1f8af089A247BCF496cda60378F2F324
Owner: 0x45299D8E0953520ccF629Dd2aC8354CcB1F1D6CF
Addr1: 0x7Dc796e7A4b6a301D70842cCB520978254a74Abf
Balance owner (after deploy): 1000000000000000000000
TotalSupply (after deploy): 1000000000000000000000
MINT tx hash: 0x9ac7419ea58fb243687c1229bfabad6ea73a83ff7e7aa3a32f154b0ac5e4200d
```

## Specifikacija pametnog ugovora

| Funkcija | Opis |
| :--- | :--- |
| **Constructor** | Inicijalizira ime, simbol i početnu zalihu te definira vlasnika ugovora. |
| **balanceOf(address)** | Vraća trenutno stanje tokena za specificiranu adresu. |
| **transfer(to, amount)** | Prenosi iznos tokena na novu adresu uz provjeru balansa i validnosti adrese. |
| **mint(amount)** | Povećava ukupnu zalihu tokena. Funkcija je dostupna isključivo vlasniku. |
| **burn(amount)** | Trajno uništava određeni iznos tokena iz optjecaja. Dostupno samo vlasniku. |


## Implementirane funkcije

### Constructor
Prilikom postavljanja ugovora inicijaliziraju se sljedeći parametri:
* `name`: Naziv tokena.
* `symbol`: Simbol tokena.
* `initialSupply`: Početna količina tokena u optjecaju.
* `owner`: Adresa računa koja ima administratorske ovlasti.

### balanceOf(address)
Vraća trenutačno stanje (balance) tokena za zadanu adresu.

### transfer(address to, uint256 amount)
Omogućuje prijenos tokena s adrese pošiljatelja na adresu primatelja uz sljedeće sigurnosne provjere:
* Pošiljatelj mora imati dovoljan balans za izvršenje transakcije.
* Adresa primatelja ne smije biti nulta adresa (`address(0)`).

### mint(uint256 amount)
Funkcija za povećanje ukupne ponude tokena. 
* **Pristup:** Ograničen isključivo na vlasnika (`onlyOwner`).
* **Učinak:** Povećava `totalSupply` i dodaje tokene na balans vlasnika.

### burn(uint256 amount)
Funkcija za smanjenje ukupne ponude tokena.
* **Pristup:** Ograničen isključivo na vlasnika (`onlyOwner`).
* **Učinak:** Smanjuje `totalSupply` i uklanja tokene s balansa vlasnika.

---

## Tehnologije
Projekt je izgrađen koristeći sljedeće tehnologije i alate:
* **Solidity**: Programski jezik za razvoj pametnih ugovora.
* **Hardhat**: Razvojno okruženje za Ethereum.
* **Ganache**: Lokalni blockchain za razvoj i testiranje.
* **Ethers.js**: Biblioteka za interakciju s Ethereum mrežom.
* **Node.js**: Runtime okruženje za razvojne alate i skripte.


## Autor: Tin Barbarić

## Ustanova: FIDIT – Informacijska sigurnost i blockchain tehnologije
