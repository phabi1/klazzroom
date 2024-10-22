import { Application } from 'express';
import passport from 'passport';
export default async function (app: Application) {
  app.set('passport', passport);
  passport.init();
}
