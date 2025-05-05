# Express projekt

**Postman setup**
Importere postman/2.postman_collection.json ind i postman for at kunne teste API'en/serveren i postman.

**Routes**

```
GET | /users | Hent alle brugere
GET | /users/:id | Hent én bruger
POST | /users | Opret ny bruger
PUT | /users/ | Opdater bruger
DELETE | /users/:id | Slet bruge
```

Disse routes er det samme for **activities**, **reviews** og **stays**. Blot udskift users med den anden route.

### Refleksionsopgave

#### DEL 1 – Backend og autentificering

**Hvad er formålet med auth.route.js?**\
Formålet med auth.route.js er at håndtere alle login- og registreringsruter, så koden bliver nemmere at finde rundt i og arbejde med.

**Hvad gør funktionen signInUser i auth.handler.js?**\
SignInUser tjekker brugerens login-oplysninger og sender et token tilbage, hvis de er korrekte.

**Hvorfor bruger vi bcryptjs til adgangskoder, og hvad er forskellen på en hash og en almindelig tekststreng?**\
Vi bruger bcryptejs til adgangskoder for at beskytte brugerns data, og gøre det mere svært for angribere at gætte eller stjæle adgangskoder.

Forskellen på en hash og en almindelig tekststreng er, at en tekststreng (f.eks. 123456) er læsbar og sårbar – en hash (f.eks. $2769$hjfk$9t) er uforståelig og sikker at gemme.

**Hvad indeholder den JWT-token, der sendes tilbage til klienten?**\
Det indeholder brugerinformationer, så det gør det muligt for serveren at genkende brugeren ved efterfølgende requests.

**Hvorfor bruger vi en try/catch-blok i signInUser-funktionen?**\
Vi bruger det for at beskytte koden mod at bryde sammen og sikrer, at brugeren får en meningsfuld fejlbesked, hvis noget går galt under login

**Hvad sker der, hvis process.env.JWT_SECRET ikke er defineret?**\
Hvis jwt secret ikke er defineret bliver der i consolen logget “Missing JWT_SECRET in environment variables”, og requesten får fejlen “Server configuration error” med kode 500 tilbage.

#### DEL 2 – React-hooken useAuth

**Hvad er formålet med useAuth-hooken?**\
Formålet med useAuth-hooken i React er at give adgang til brugerens loginstatus og oplysninger, så komponenter nemt kan finde ud af, om brugeren er logget ind - og evt. hente brugerdata, logge ud, eller vise bestemte dele af UI’et.

**Hvordan gemmes token og brugerdata, så de overlever en
opdatering/genindlæsning af siden?**
Dataen gemmes via localstorage med UseLocalStorage-hook. Når setAuth({token: recievedToken}) kaldes, gemmes token i browserens localstorage under “auth”.

**Hvordan ved app’en, om brugeren er logget ind? Hvilken variabel afgør det?**\
const [signedIn, setSignedIn] = useState(!!auth.token) SignedIn fortæller siden om brugeren er logget ind. Det forudsætter at der findes et token {auth.token} fra localstorage. !!auth-token spørger om der er et token, true eller false. Hvis true så bliver man logget ind.

**Hvorfor bruger vi jwt-decode, og hvad bruger vi det til?**\
vi har krypterede alt imformation om brugeren og for at for en læselig information ud dekryptere vi det med jwtDecode(auth.token)

**Forklar hvad signIn()-funktionen gør trin for trin.**\
Signin funktionen starter med at rydde alle eventuelle fejl. Derefter sender den en post request til /auth/signin, med emailen og passwordet som der er blevet indtastet. Jwt token bliver decoded, og state variablerne bliver sat. Derefter bliver jwt token gemt i localstorage. Dette sker i en try catch block, så der også bliver håndteret for eventuelle fejl.

#### DEL 3 – Brug af login i komponent

**Hvordan bruges useAuth-hooken i Login.jsx?**\
Hooken bruges til at identificere, user, token, signIn og evt. errors. og fetche (axios) til ens localhost.

**Hvad sker der, når brugeren klikker på knappen "Log ind"?**\
Den vil tjekke om email og password tjekker overens med information i databasen, hvis det er korrekt vil den i dette tilfælde vise en token.

**Hvordan vises fejl for brugeren, hvis login fejler?**\
Hvis login fejler vil den vise, setError(“Login mislykkedes, tjek dine oplysninger”)

#### DEL 4 – Refleksion og samarbejde

**Hvilke dele af login-flowet forstod I bedst?**\
Brugeren angiver en email og en adgangskode, som bliver sendt til vores server som et POST-request. Serveren går herefter ind og kigger på, om emailen findes. Hvis den gør, kigger vi på, om brugerens password er det samme som det password, serveren har gemt. Hvis alt er rigtigt, laver serveren en token (med en udløbsdato), som bliver sendt til brugeren, der gemmer den i LocalStorage og derfor ikke behøver at logge ind i den periode, som tokens udløbsdato angiver(fx. 1 time eller 1 dag).

**Var der noget, I synes var svært – og hvordan løste I det?**\
Brugte for lang tid på at se at userModel i auth.handler.js var udkommenteret.

**Hvordan fordelte I arbejdet i gruppen?**\
dag 1: Lars og kasper
dag 2: Rama, Jeppe, Lars og Kasper

**Hvordan kunne I bruge dette login-system i et større projekt, fx med brugerroller eller adgangsbegrænsede sider?**\
Man kunne nemt forestille sig, at dette loginsystem kunne bruges til større projekter, eftersom det er et simpelt login system der virker, hvilket mange større projekter gør brug af. Man kunne bruge rollerne der er i user-modellen til at adgangsbegrænse nogle brugere, for eksempel fra admin sider eller separerer betalende brugere fra ikke-betalende brugere.
