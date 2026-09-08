export async function triggerIntentionalError(req, res, next) {
  throw new Error('500 Intentional Server Error triggered for Week 2 middleware verification.');
}
