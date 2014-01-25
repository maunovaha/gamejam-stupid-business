
/*
 * GET game page.
 */

exports.game = function(req, res){
  res.render('game', { title: 'Stupid business - Global game jam 2014 entry.' });
};