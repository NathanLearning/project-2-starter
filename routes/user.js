exports.login = function(req, res){
    const message = '';
    const sess = req.session; 
 
    if(req.method == "POST"){
       const post  = req.body;
       const name= post.user_name;
       const pass= post.password;
      
       const sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
       db.query(sql, function(err, results){      
          if(results.length){
             req.session.userId = results[0].id;
             req.session.user = results[0];
             console.log(results[0].id);
             res.redirect('/home/dashboard');
          }
          else{
             message = 'Wrong Credentials.';
             res.render('index.ejs',{message: message});
          }
                  
       });
    } else {
       res.render('index.ejs',{message: message});
    }         
 };
 exports.signup = function(req, res){
    message = '';
    if(req.method == "POST"){
       const post  = req.body;
       const name= post.user_name;
       const pass= post.password;
       const fname= post.first_name;
       const lname= post.last_name;
       const mob= post.mob_no;
 
       const sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
 
       const query = db.query(sql, function(err, result) {
 
          message = "Succesfully! Your account has been created.";
          res.render('signup.ejs',{message: message});
       });
 
    } else {
       res.render('signup');
    }
 };
 exports.dashboard = function(req, res, next){
	
	const user =  req.session.user,
	userId = req.session.userId;
	
	if(userId == null){
		res.redirect("/home/login");
		return;
	}
	 
	 const sql="SELECT * FROM `login_details` WHERE `id`='"+userId+"'";
	 
	   db.query(sql, function(err, results){
		   
		   console.log(results);
		   
		   res.render('profile.ejs', {user:user});	  
		  
		});	 
};