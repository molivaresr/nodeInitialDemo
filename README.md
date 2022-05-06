<h1 align="center">Welcome to Dice Game Node API Rest Server👋</h1>

Proyecto creado con:  
* Javascript -> NodeJS.
* Express.
* Bodyparser.
* Sequelize.
* DotEnv.

### Para iniciar servidor ### 
**Importante** : Es necesario configurar las variables de entorno se puede crear el archivo .env a partir de env.template:
- Puerto por defecto: El servidor arranca en el puerto 8080, puedes modificarlo en ``PORT=8080``. 
- Datos de MySQL: Completa con tu configuración de acceso a MYSQL (Usuario, Password, Host y puerto), modificando los campos que comiencen con MYSQL.  
**Atención** ``MYSQL_DATABASE``, es el nombre de la base de datos, por defecto: ``dice_mauricio`` y  ``MYSQL_DIALECT`` no se debe modificar, ya que Sequelize esta optimizado para utilizar mysql. 

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
### Jugador ###
* POST /players: crea un jugador.
* PUT /players: modifica el nom del jugador.
* DELETE /players/{id}/games: elimina les tirades del jugador.
* GET /players/{id}/games: retorna el llistat de jugades per un jugador.
### Jugadas ###
* POST /players/{id}/games: un jugador específic realitza una tirada.
### Ranking ###
* GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits.
* GET /players/ranking/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors.
* GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit.
* GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit.
