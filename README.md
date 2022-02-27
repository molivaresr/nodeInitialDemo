<h1 align="center">Welcome to Node Rest Server👋</h1>
**Para iniciar servidor**  

``npm i``-> Instala modulos requeridos.  

``npm start`` -> Inicializa servidor.    

Construirem una API que doni suport a un joc de daus ;)

Al joc de daus s’hi juga amb dos daus de sis cares:

En cas que el resultat dels dos daus sigui 7 la partida es guanya, si no es perd.
Per poder jugar al joc t’has de registrar com a jugador amb un nom. Un jugador pot veure un llistat de totes les tirades que ha fet i el seu percentatge d’èxit.
Per poder realitzar una tirada, un usuari s’ha de registrar amb un nom no repetit. Al ser creat, se li assigna un identificador únic i una data de registre.
Si l’usuari ho desitja, pot no afegir cap nom i es dirà “ANÒNIM”. Pot haver-hi més d’un jugador “ANÒNIM”.
Cada jugador pot veure un llistat de totes les tirades que ha fet amb el valor de cada dau i si s’ha guanyat o no la partida. A més, pot saber el percentatge d’èxit de les tirades que ha realitzat.
No es pot eliminar una partida en concret, però si que es pot eliminar tot el llistat de tirades d'un jugador. El software ha de permetre llistar tots els jugadors que hi ha al sistema, el percentatge d’èxit de cada jugador i el percentatge d’èxit mig de tots els jugadors en el sistema.
El software ha de respectar els principals patrons de disseny.

----

Has de tenir en compte els següents detalls de construcció:
<!--- Jugador --->
Ok POST /players: crea un jugador
Ok PUT /players: modifica el nom del jugador
Ok DELETE /players/{id}/games: elimina les tirades del jugador
Ok GET /players/{id}/games: retorna el llistat de jugades per un jugador.
<!--- Jugadas --->
Ok POST /players/{id}/games: un jugador específic realitza una tirada
<!--- Jugadores --->
Ok GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors
GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit