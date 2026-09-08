export async function buildHome(req, res) {
  res.render('index', { title: 'Home | CSE 340' });
}
