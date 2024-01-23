import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'
import db from '../controllers/_helpers/mongoose.js'

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  try {
    const user = await db.User.findOne({ email })
    if (!user) return done(null, false, { email: 'Email Not Found' })
    if (!await bcrypt.compare(password, user.passwordHash)) return done(null, false, { password: 'Incorrect Password' })
    return done(null)
  } catch (err) {
    return done(err)
  }
}))

export default passport
