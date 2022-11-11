//server node
const express = require('express')
const bodyParser = require('body-parser')
/* ukoliko bude pravila konkcija problem ka pusheru pokusati sa pusher-js*/
const Pusher = require('pusher');
const cors = require('cors')
require('dotenv').config()
const shortId = require('shortid')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: 'eu',
    encrypted: true
})

app.post('/message', async(req, res) => {
    const chat = {
        ...req.body,
        id: shortId.generate(),
        createdAt: new Date().toISOString()
    }
    pusher.trigger('cet-grupa', 'chat', chat)
    res.send(chat)
    //povukli smo update ka osluskivacima dogadjaja
})


app.post('/join', (req, res) => {
    const chat = {
        ...req.body,
        id: shortId.generate(),
        type: 'pridruzio',
        createdAt: new Date().toISOString()
    }
    // console.log(pusher);
    pusher.trigger('cet-grupa', 'chat', chat)
    res.send(chat)
})


app.listen(process.env.PORT || 2000, () => console.log('slusam na portu ' + (process.env.PORT || 2000)))



/*
Nodejs / podsetnik

Niti i kontrola toka / blokirajuci sadrzaj
segment1(argumenti).segment2(...).segment3(...) | segment4(segment3(segment2(segment1(argumenti))))

Nije dobra praksa niti:
segment1(argumenti)
segment2(...)
segment4(..)

Citanje podataka:
.stringify(obj) => obj JS format
JSON.parse(tekstZapis) = tektsZapis => String format (suprotan smer)

Kodovanje:
Modul / buffer -> utf8 / utf64 / utf16...
obj[index]=value
fill( ,[],[])
write(tekstZapis, [index], [length], [code])


toString([kodovanje], [],[])

Citanje bajtova iz niza i metode koje se koriste:
read([byte])
end()
close()
readble()
data()
error()

http.request(opcija1, povratnaFunkcija)
    - clientRequest -> parametri su JS objekti (IP / lokacija servera kome se salje zahtev)
    - port (port servera / specificnog servisa)
    - get *default, post, connect, options
    - path
    - header -> JS objekat
*/
