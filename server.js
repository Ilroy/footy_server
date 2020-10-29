const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const knex = require('knex')
const footy_db = knex(
    {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'united10',
            database: 'footy_db'
        }
    }
);

app.get('/', (req,res) =>{
    console.log("working....");
    res.send("working");
});

app.post('/register', (req,res) =>{
    const { email, password, firstName, lastName } = req.body;

    const hash = bcrypt.hashSync(password);

    footy_db.transaction(trx =>{
        trx.insert({
            hash:hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then( loginEmail =>{
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                firstname: firstName,
                lastname: lastName   
            })
            .then( user => {
                res.json("success");
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        res.status(400).json("failed")});

});

app.post('/signin', (req,res) =>{
    const {email, password} = req.body;

    footy_db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data =>{
        const {email, hash} = data[0];

        if(bcrypt.compareSync(password,hash)){
            footy_db.select('*').from('users')
            .where('email', '=', email)
            .then(user =>{
                const userInfo = user[0];
                footy_db.select('league').from('followed_leagues')
                .where('user_id','=', userInfo.id)
                .then(leagues =>{
                    leagueList = leagues.map(leagueObj =>{
                        return leagueObj.league;
                    })
                    userInfo.leagues = leagueList;
                    return userInfo;
                }).then(info =>{
                    footy_db.select('team').from('followed_teams')
                    .where('user_id','=',info.id)
                    .then(teams =>{
                        teamList = teams.map(teamObj =>{
                            return teamObj.team;
                        })
                        info.teams = teamList;
                        res.json(info);
                    })
                })

            })
            .catch(err => res.status(400).json('cant get user'))
        }else{
            res.json("credentials not valid")
        }

    
    })
    .catch(err => res.status(400).json("Error"));


})


// TODO: GET REQUEST FOR CALLING RFOOTBALL API TO GET LIST OF COUNTRIES
app.listen(3000, () =>{
    console.log("listeningg.....");
});



/**
 *  / => GET = "WORKING" GET
 *  /signin => return user{id,teams, leagues} POST
 *  /REGISTER => return success/fail
 *  /matches => call soccer api and return matches  GET
 *  /table => call soccer api and return  league data for all leagues
 *  /teams/add(del) => POST list of teams to  RETURN NEW LIST
 *  /leagues/add(del) => post list of teams to delete RETURN NEW LIST
 *   
 * 
 */