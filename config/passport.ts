import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { Admin } from "../models/SQL/Admin";
import { Teacher } from "../models/SQL/Teacher";
import { Student } from "../models/SQL/Student";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const { role } = req.body;
        let user;

        if (role === "admin") user = await Admin.findOne({ where: { email } });
        else if (role === "teacher")
          user = await Teacher.findOne({ where: { email } });
        else if (role === "student")
          user = await Student.findOne({ where: { email } });
        else return done(null, false, { message: "Invalid role" });

        if (!user) return done(null, false, { message: "User not found" });

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch)
          return done(null, false, { message: "Incorrect password!" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, { id: user.id, role: user.role });
});

passport.deserializeUser(async (data: { id: string; role: string }, done) => {
  try {
    let user;
    switch (data.role) {
      case "student":
        user = await Student.findByPk(data.id);
        break;
      case "teacher":
        user = await Teacher.findByPk(data.id);
        break;
      case "admin":
        user = await Admin.findByPk(data.id);
        break;
      default:
        return done(new Error("Invalid role"), null);
    }

    if (!user) return done(new Error("User not found"), null);

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
