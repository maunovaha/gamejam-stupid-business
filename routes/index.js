
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Stupid business - Global game jam 2014 entry.' });
};