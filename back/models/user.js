module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // mysql에는 users로 테이블 생성됨
    // column
    // id는 기본적으로 들어있다.
    email: {
      type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      allowNull: false, // 필수
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false // 필수
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, // 필수
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci' // 한글 저장
  });
  User.associate = (db) => {
    // 1대 다 관계
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers' ,foreignKey: 'followingId'});
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings' ,foreignKey: 'followerId'});
  };
  return User;
};