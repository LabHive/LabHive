## Inspiration

SARS-CoV-2 ist ein Virus der Corona-Familie, welches im Januar 2020 in der chinesischen Provinz Hubei identifiziert wurde. Im Menschen löst SARS-CoV-2 die neuartige Krankheit COVID-19 aus, welche in schweren Fällen zu Atemnot führt und in Risikogruppen mit einer hohen Letalitätsrate einhergeht. Um eine übermäßige Belastung des Gesundheitssystems, wie beispielsweise in Italien, zu verhindern, ist es von großer Bedeutung die Ausbreitung des Virus zu verlangsamen und eine genaue Datenlage bezüglich der Ausbreitungsdynamik und der Anzahl aktuell infizierten Menschen zu erlangen. Letzteres ist erheblich erschwert, da der aktuell eingesetzte Test auf SARS-Cov-2 äußerst aufwendig und zeitintensiv ist. Der Test beruht auf einer RT-PCR, welche spezielle Geräte, limitierte Verbrauchsmaterialien und qualifiziertes Personal benötigt. Die Limitation dieser Ressourcen minimiert die Anzahl der Testdurchläufe, die ein diagnostisches Labor pro Zeiteinheit durchführen kann. Auf der anderen Seite ist der wissenschaftliche Betrieb in vielen anderen Einrichtungen fast gänzlich zum Erliegen gekommen, was ein riesiges -, bisher ungenutztes -, Potential darstellt.

## Ziel

LabShare ist eine Plattform, welche es ermöglicht die benötigten Ressourcen bestmöglich zu verteilen. Dazu möchten wir hilfsbereite Wissenschaftler, temporär ungenutzte Geräte oder verfügbare Materialien zur Durchführung der RNA-Extraktion und RT-PCR mit momentan am Limit agierenden Diagnostiklaboren in Verbindung bringen, um die Kapazität der Testlabore zu erhöhen und die Ausbreitung von SARS-CoV-2 besser verstehen und kontrollieren zu können.

## Wie wir es erreicht haben

*   Das Frontend in vue kommuniziert mit dem Backend über eine Api
*   Als Datenbank wird MongoDB verwendet
*   Grafiken wurden mit InkScape erstellt.

## Herausforderungen auf dem Weg

Zeit! Eine produktiv einsetzbare Applikation innerhalb von zwei Tagen zu entwickeln ist sehr schwierig. Es ist uns allerdings gelungen einen guten Grundstein für die Plattform zu legen.

## Erfolge auf die wir stolz sind

Stolz sind wir auf die gesamte Leistung unseres Team und die Tatsache innerhalb von zwei Tagen ein Problem bei der Durchführung von Coronatests durch Kontakte in Testlabore identifiziert und eine Lösung auf den Weg gebracht zu haben.

## Was wir gelernt haben

Unser Team hatte sehr viel Spaß interdisziplinär beim digitalen Hackathon zusammen zu arbeiten. So haben wir diese Zeit genutzt um unseren Horizont zu erweitern. Einige von uns haben einen Einblick in technische Gebiete bekommen können, andere in den medizinischen vor allem in Bezug auf die Corona Tests und die Laborarbeit

## Was ist das nächste für LabShare

*   Weiterentwicklung zum produktiven Einsatz
*   Mehrsprachigkeit
*   Weitere Ressourcen aufnehmen die angeboten/gesucht werden 

Wir würden uns wünschen, dass unsere Lösung bald einen kleinen Teil dazu beitragen kann, um die Testabdeckung effizienter zu gestalten. Doch bis es soweit ist, hacken wir weiter!

## Technischer Zustand des Projekts
### Was funktioniert
* Deployment mit Docker
* POC vom Registrierungsprozess im Frontend
* Backend
    * Registrierung von Helfern und Laboren
    * Login
    * Aktualisierung des Profils
    * Passwort vergessen, Passwort ändern

### Was noch nicht funktioniert
* Frontend
    * Registrierung
    * Login
    * Suche
* Backend
    * Mailversand mit dem generierten Token bei Passwort vergessen
    * Suchfunktion nach Laboren/Helfern

Geschätzter Arbeitsaufwand bis zum Release: 20-30h