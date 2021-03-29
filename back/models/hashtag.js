module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', { // mysql에는 users로 테이블 생성됨
    // column
    // id는 기본적으로 들어있다.
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', // mb4는 이모티콘까지 지원가능!
    collate: 'utf8mb4_general_ci' // 한글 저장
  });
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag'});
  };
  return Hashtag;
};