---
title: Turun Wappuradio
draft: false
layout: index.html
---

# Musiikin rippaaminen CD-levyltä Windowsilla

## Asennus

### Vaihe 1: Lataa ja asenna EAC

Käy lataamassa EAC [täältä](http://www.exactaudiocopy.de/en/index.php/resources/download/).
Suositaan uusinta versiota, joka on tällä hetkellä 1.3. Mukana tulee muutama plugin ja FLAC, joten pakkausohjelmaa ei
tarvitse erikseen asentaa.

Käynnistä asennusohjelma.

<div class="ScreenshotContainer">
  <img alt="Kuva asennusohjelmasta" src="/windows-rippaus/image1.png" />
</div>

Valitse kuvassa näkyvät osat asennettavaksi ja paina Install. Asenna ohjelma normaalisti.

### Vaihe 2: Käynnistä EAC

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image2.png" />
</div>

Ensimmäisen käynnistyksen yhteydessä avautuu yllä oleva ikkuna, paina Cancel.

Laita audio CD asemaan. Tämän jälkeen pitäisi aueta alla oleva ikkuna. Paina Configure.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image3.png" />
</div>

Konfiguraatio saattaa kestää sekunneista muutamiin minuutteihin, odota kärsivällisesti. AccurateRip on tärkein lisäosa
virheettömien kopioiden kannalta, joten sen pitää ehdottomasti olla käytössä. Kyseessä on ulkopuolinen virheentarkistus,
joka käy tarkistamassa CRC:n tietokannasta ja vertaa sitä muiden tekemiin rippauksiin.

### Vaihe 3: EAC:n asetukset

Kaikki EAC:n asetukset löytyvät vasemmasta yläkulmasta EAC-valikon alta. Valitse “EAC Options…”

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image4.png" />
</div>

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image5.png" />
</div>

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image6.png" />
</div>

Asetus “Show status dialog after extraction” voi aiheuttaa ongelmia joissain yhteyksissä, jätä pois. Valitse muut
asetukset samoin kuin kuvassa.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image7.png" />
</div>

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image8.png" />
</div>

Älä käytä normalisointia, koska se muokkaa alkuperäistä audiota.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image9.png" />
</div>

“Filename”-välilehdessä määritetään, miten kansiorakenne ja tiedostonimet luodaan. Käytä kuvassa näkyviä asetuksia. 
%tracknr2% tarkoittaa, että raidan numerointi tehdään kahdella numerolla. Asetusten mukaisesti tiedostot nimetään 
tyyliin 01 - Dodo-sorsa. Kokoelmalevyillä tiedostonimeen tulee mukaan myös artisti, esim. 01 - Siiri Nuora - Dodo-sorsa.

Naming scheme: *%albumartist% - %albumtitle% - %year%\\%tracknr2% - %title%*

Various artist naming scheme: *Various Artists - %albumtitle% - %year%\\%tracknr2% - %artist% - %title%*

### Vaihe 4: CD-aseman asetukset

Mene uudelleen EAC-valikkoon ja valitse “Drive Options...”. Tässä vaiheessa asetetaan varsinaiset rippausasetukset CD-asemalle.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image10.png" />
</div>

Paina aivan aluksi nappia “Detect Read Features…”. Jos asemassa ei vielä ole audio CD:tä, lisää sellainen nyt. Tämä voi
taas kestää muutamista sekunneista muutamiin minuutteihin. Ohjelma yrittää tunnistaa, mitä asetuksia CD-asema tukee.
Tärkein ominaisuustieto on Accurate Stream. Valitse se käyttöön ainoastaan, jos asemasi testin mukaan tukee sitä.
*Älä valitse, jos ei tue Accurate Streamiä.* Muut asetukset kuvan mukaisesti. C2 error correction on yleensä niin 
huonolla tolalla, että siitä on enemmän haittaa kuin hyötyä. Vaikka asemasi vaikuttaisi tukevansa, sitä siis ei valita 
käyttöön.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image11.png" />
</div>

Paina “Autodetect read command now”. Ohjelma valitsee sopivan lukukomennon asemallesi. 
Yleensä MMC1, mutta voi olla muutakin.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image12.png" />
</div>

Yläosan asetusten pitäisi olla harmaana. Tarkoittaa sitä, että Accurate Rip on käytössä. Ei valita asetusta “Overread
into Lead-In and Lead-Out”. Muut asetukset kuvan mukaisesti.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image13.png" />
</div>

Aseta Gap detection accuracy asetukseen Secure. Gap retrieval method asetuksena toimii yleensä A, mutta jos EAC
tunnistaa raitojen välisiin taukoihin jatkuvasti todella outoja arvoja (esim. useita minuutteja tai muuta ihmeellistä)
tai rippaus jää jumiin Gap detection vaiheeseen, voit kokeilla käyttää eri menetelmää (B tai C). Oikea asetus siis
riippuu asemasta, mutta yleensä A toimii.

### Vaihe 5: Metadatan eli nimitietojen asetukset

EAC-valikon kautta taas “Metadata options...”.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image14.png" />
</div>

1. Valitse metadata provideriksi CUETools DB Metadata Plugin.
2. Paina “Show options of the selected metadata provider”.
3. Valitse Metadata search mode: Extensive ja Covers search mode: Large.

Metadata plugin saattaa kysyä sähköpostiosoitetta, kun tietoja hakee. Siihen voi syöttää esimerkiksi 
matti.teppo@maili.fi, jos omaansa ei halua laittaa.

### Vaihe 6: Pakkausasetukset

Nyt aletaan jo päästä asiaan. Valitse taas EAC-valikon kautta “Compression options…”.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image15.png" />
</div>

Laita asetukset kuvan mukaisesti. FLAC-ohjelma löytyy EAC:n asennushakemistosta (oletuksena 
C:\Program Files (x86)\Exact Audio Copy\Flac\flac.exe). Jos olet asentanut EAC:n muualle kuin oletushakemistoon, 
paina browse ja etsi asennushakemistosta flac.exe.

Varsinaiset pakkausasetukset tulevat kohtaan “Additional command-line options”. 

Copy-pasta:

*-8 -V -T "ARTIST=%artist%" -T "TITLE=%title%" -T "ALBUM=%albumtitle%" -T "DATE=%year%" -T "TRACKNUMBER=%tracknr%" -T "GENRE=%genre%" -T "PERFORMER=%albuminterpret%" -T "COMPOSER=%composer%" %haslyrics%--tag-from-file=LYRICS="%lyricsfile%"%haslyrics% -T "ALBUMARTIST=%albumartist%" -T "DISCNUMBER=%cdnumber%" -T "TOTALDISCS=%totalcds%" -T "TOTALTRACKS=%numtracks%" -T "COMMENT=%comment%" %source% -o %dest%*

Näillä komentoriviasetuksilla kirjoitetaan metadata FLAC-tiedostoihin.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image16.png" />
</div>

ID3-tagit eivät kuulu FLAC-tiedostoihin, joten asetukset kuvan mukaan. Mahdollisen kansikuvan voi nimetä, miten tykkää, 
esimerkiksi kuvan mukaan.

### Onneksi olkoon! EAC on nyt asennettu ja asetukset viilattu rippaamista varten!

Tässä vaiheessa kannattaa ehkä luoda asetuksista profiili, eli paina pääikkunan alalaidassa nappia New ja anna
profiilillesi nimi. Tämä tallentaa asetukset erikseen valittavaan profiiliin (tallentuvat myös muuten).

## Rippaaminen

*Aloita rippaaminen vasta, kun olet huolellisesti käynyt jokaisen kohdan asennusohjeista.*

Ennen rippaamista:

1. Tarkista, löytyvätkö kappaleet jo [kirjastosta](/musiikki.html). Haku on filtteröivä eli suodattaa pois tulokset,
joista ei löydy kirjoittamaasi merkkiriviä.
2. Tarkista uudelleen, löytyvätkö kappaleet jo [kirjastosta](/musiikki.html). Jos löytyy, älä kuluta tähän aikaa, vaan siirry
seuraavaan levyyn.
3. Jos levyssäsi sattuu olemaan jonkinlainen kopiosuojaus, älä turhaan yritä rippailla sitä, vaan siirry seuraavaan.
Kopiosuojaukset olivat yleisiä 2000-luvun alkuvuosina ja tällaisen levyn voi tunnistaa esim. kannen teksteistä Copy
controlled, Copy protected, Cactus data shield jne. tai logosta.

### Vaihe 1: Nimeäminen

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image17.png" />
</div>

Kun syötät audio CD:n sisään, tällainen ikkuna pitäisi aueta. Valitse albumia vastaava kuvaus ja kansikuva. Kannattaa
käyttää MusicBrainzin dataa jos löytyy, se on se violettioranssi pikkukuvake. Joskus jos tätä ikkunaa ei näy, voi sen
hakea manuaalisesti valikosta Database -> Get CD information from -> Current metadata provider tms.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image18.png" />
</div>

Pääikkunassa näkyvät keskellä vasemmalla kappaleiden nimet ja ylhäällä artisti ja levyn nimi ja vuosi. Oikealla on CD:n
numero ja kokonaismäärä, jos kyseessä on 2CD tai useamman sisältävä boksi. Mikä tärkeintä,
*TARKISTA ITSE ETTÄ KAPPALEIDEN NIMET JA MUUT TIEDOT OVAT OIKEIN!* Online-metadata helpottaa työtä noin 95%, mutta
joskus sielläkin on virheitä tai levyä ei löydy (silloin tietysti tiedot syötetään itse). Mikäli kyseessä on klassisen
musiikin levy, voi täyttää myös kohdat Performer/Composer.

### Vaihe 2: Gap Detection ja Cuesheet

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image19.png" />
</div>

Varsinainen rippaaminen aloitetaan aina painamalla F4, jolloin ohjelma lukee CD:ltä raitojen väliset tauot. Varmista,
että “Append Gaps To Previous Track” on valittuna. Tämän jälkeen paina “Create CUE Sheet” ja edelleen Multiple WAV files
with gaps. Seuraavaksi ohjelma kysyy, minne CUE Sheet tallennetaan. Tallenna se jonnekin, mistä löydät sen ja voit
rippauksen jälkeen poistaa.

CUE Sheet sisältää albumin raitojen metadataa rippausta varten, ei varsinaista audiota.

### Vaihe 3: Rippaaminen

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/image20.png" />
</div>

Varsinainen suoritus tapahtuu valikosta Action -> Test & Copy Selected Tracks -> Compressed. Tämä käynnistää viimein
varsinaisen suorituksen, joka kestää yleensä 15 min - 3 tuntia levyn pituudesta, asemasta, naarmuista ja Venuksen
asennosta riippuen. Data luetaan kahteen kertaa, jolloin voidaan varmistua, että CRC pysyy samana. Kyllä, se on hidasta.
Kyllä, se on tarpeellista.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/rippaussuoritettu.png" />
</div>

Jos rippauksen aika status-ikkunaan ilmestyy taikasanoja “Read error” tai “Sync error”, on levyssä sellaisia naarmuja,
joista asemasi ei selviä. Tällöin rippaus kannattaa suosiolla keskeyttää, tiedostot poistaa ja vaihtaa seuraavaan
levyyn. Esim. kirjaston levyt ovat monesti todella huonossa kunnossa ja myös kopiosuojatut (2000-luvulla esiintyi näitä)
aiheuttavat harmia. Jos kopiointi ei syystä tai toisesta onnistu, *ÄLÄ LISÄÄ SITÄ KIRJASTOON*. Kaikkien kappaleiden
täytyy olla onnistuneesti kopioituneita, jotta rippaus voidaan arkistoida.

<div class="ScreenshotContainer">
  <img alt="Kuva EAC:n tervetuloaruudusta" src="/windows-rippaus/logi.png" />
</div>

Rippauksen jälkeen pitäisi logitiedostosta löytyä tekstejä kuten All tracks accurately ripped. Logi rippauksesta tallentuu samaan
kansioon *painettuasi OK* ja se on tapa todistaa, että levy on todellakin kopioitu sallitusta lähteestä onnistuneesti, joten se on
arkistoon menevistä levyistä löydyttävä. 

Siinä kaikki. Toista kohdat 1-3 jokaiselle levylle erikseen.

## Albumin lisääminen kirjastoon

Albumeiden lisääminen kirjastoon on äärimmäisen yksinkertaista. Klikkaa alla olevaa nappia ja syötä tiedostot lomakkeen ohjeen mukaan.

<div class="ButtonContainer">
<a href="https://docs.google.com/forms/d/e/1FAIpQLSetqnhzrpfOdbkaK4GmUHTGFMZH0h6NBMeKESC4rQEh3JqatA/viewform?usp=sf_link">
Musansyöttö
</a>
</div>

