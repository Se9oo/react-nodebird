module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', { // mysql에는 users로 테이블 생성됨
    // column
    // id는 기본적으로 들어있다.
    src: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    charset: 'utf8', // mb4는 이모티콘까지 지원가능!
    collate: 'utf8_general_ci' // 한글 저장
  });
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};