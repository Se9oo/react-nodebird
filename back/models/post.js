module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // mysql에는 users로 테이블 생성됨
    // column
    // id는 기본적으로 들어있다.
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', // mb4는 이모티콘까지 지원가능!
    collate: 'utf8mb4_general_ci' // 한글 저장
  });
  Post.associate = (db) => {
    // user에 속해있다.
    // Post의 작성자
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'});
    // retweet
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
    // 좋아요 수
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
  };
  return Post;
};