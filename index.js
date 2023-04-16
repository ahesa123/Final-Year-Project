import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ahesa@123',
  database: 'ahesadb'
});

connection.connect(function(err){
  if(err){
    console.error('Error connecting::: ' + err.stack);
    return;
  }
  console.log('connected as Id::: '+ connection.threadId);
});

/*function getNextUniqueSequence(){
  connection.query('SELECT MAX(RECIPE_ID) AS MAX_ID FROM T_RECIPES', (err,results,fields) => {
    if(err) console.error(err);

    const max_id = parseInt(results[0].MAX_ID);
    const next_sequence = max_id + 1;
    console.log('next id:: '+next_sequence);
    return next_sequence;
    
  });
}*/


  //######################################## GET ALL RECIPES ##################################################
  app.get('/recipes', (req,res)=>{

    connection.query('SELECT * FROM T_RECIPES', (err,results) =>{
      if(err) throw err;
      res.send(results);
    })
  });
  //######################################## GET ALL RECIPES ##################################################


  app.get('/', (req,res)=>{
    res.send('Welcome to our food recipe website');
  });


  //######################################## POST RECIPE ##################################################
  app.post('/recipe', (req,res)=>{
    const recipe = req.body;
    console.log(recipe);
    // after that data needs to be parsed and passed on to db.

    const {RECIPE_TITLE, IMAGE_URL, TIME_TAKEN,RECIPE_PUBLISHER, SOURCE_URL, PUBLISHED_DATE} = req.body;
    const sql = 'INSERT INTO ahesadb.T_RECIPES (RECIPE_TITLE, IMAGE_URL,TIME_TAKEN, RECIPE_PUBLISHER, SOURCE_URL, PUBLISHED_DATE) values(?,?,?,?,?,?)';
    const values =[RECIPE_TITLE, IMAGE_URL, TIME_TAKEN,RECIPE_PUBLISHER, SOURCE_URL, PUBLISHED_DATE];
    connection.query(sql, values, (err,results) =>{
      if(err) {
        //throw err; 
        //res.send(err);
        console.error(err);
        res.status(500).send('Error inserting new recipe!!   --->  '+err.message);
      }
      else{
        //res.send(results);
        res.send('Recipe created successfully RECIPE_ID: '+ results.insertId);
      }
    });

  });
  //######################################## POST RECIPE ##################################################

  //######################################## DELETE RECIPE ##################################################
  app.delete('/recipe/:id', (req,res)=>{
    const {id}= req.params;
    console.log(id);
    
    const sql = 'DELETE FROM ahesadb.T_RECIPES WHERE RECIPE_ID = ?';
    connection.query(sql, [id], (err,results) =>{
      if(err) {
        console.error(err);
        res.status(500).send('Error deleting recipe!!   --->  '+err.message);
      }
      else{
        //res.send(results);
        res.send('Recipe deleted successfully ID: '+id);
      }
    });

  });
  //######################################## DELETE RECIPE ##################################################

    //######################################## UPDATE RECIPE ##################################################
    app.put('/updateRecipe/:id', (req,res)=>{
      const {id}= req.params;
      const {RECIPE_TITLE, IMAGE_URL,TIME_TAKEN, RECIPE_PUBLISHER, SOURCE_URL, PUBLISHED_DATE} = req.body;
      //console.log('UPDATE RECIPE HEADER ID::: '+ id);
      const sql = 'UPDATE ahesadb.T_RECIPES SET  RECIPE_TITLE=?, IMAGE_URL=?, RECIPE_PUBLISHER=?, SOURCE_URL=?, PUBLISHED_DATE=? WHERE RECIPE_ID='+id;
      //console.log(sql);
      
      const values =[RECIPE_TITLE, IMAGE_URL, TIME_TAKEN,RECIPE_PUBLISHER, SOURCE_URL, PUBLISHED_DATE];

      connection.query(sql, values, (err,results) =>{
        if(err) {
          console.error(err);
          res.status(500).send('Error updating recipe!!   --->  '+err.message);
        }
        else{
          //res.send(results);
          res.send('Recipe updated successfully ID: '+id);
        }
      });
  
    });
    //######################################## UPDATE RECIPE ##################################################

    //######################################## SEARCH RECIPE ##################################################
    // "search_recipe?title=abcde"
    app.get('/search_recipe', (req,res)=>{
      const { title }= req.query;
      console.log(title);

      const sql = 'SELECT * FROM ahesadb.T_RECIPES WHERE RECIPE_TITLE LIKE ?';
      let params=[];
      params.push('%'+title+'%');

      console.log(params);

      connection.query(sql, params, (err,results) =>{
        if(err) {
          console.error(err);
          res.status(500).send('Error fetching recipe!!   --->  '+err.message);
        }
        else{
          res.send(results);
          //res.send('Recipe updated successfully ID: '+id);
        }
      });
  
    });
    //######################################## SEARCH RECIPE ##################################################

app.listen(PORT, () => console.log('Server running on port: http://localhost:${PORT}'));



process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});


