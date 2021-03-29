const DataTypes = require('sequelize');
const { Model } = DataTypes;

// 최신 문법
// module.exports = class Comment extends Model {
//   static init(sequelize) {
//     return super.init({
//       content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//     }, {
//       modelName: 'Comment',
//       tableName: 'comments',
//       charset: 'utf8mb4', // mb4는 이모티콘까지 지원가능!
//       collate: 'utf8mb4_general_ci', // 한글 저장
//       sequelize,
//     });
//   }

//   static associate(db) {
//     db.Comment.belongsTo(db.User);
//     db.Comment.belongsTo(db.Post);
//   }
// }

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { // mysql에는 users로 테이블 생성됨
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
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};