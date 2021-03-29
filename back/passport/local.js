const passport = require('passport');
// 구조분해로 변수명 바꾸기
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email', // req.body.email
    passwordField: 'password', // req.body.password
  }, async (email, password, done) => {
    try {// login 전략 수립
      const user = await User.findOne({
        where: { email }
      });
      // 사용자 존재여부 체크
      if (!user) {
        // 서버에러, 성공여부, 클라이언트에러
        return done(null, false, { reason: '존재하지 않는 사용자입니다!' })
      }
  
      // 비밀번호 일치 여부 체크
      const result = await bcrypt.compare(password, user.password);
  
      if (result) {
        return done(null, user);
      }
      return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
    } catch (error) {
      console.error(error);
      // 서버에러 체크
      return done(error);
    }
  }));
};