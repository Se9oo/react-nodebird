/* eslint-disable react/jsx-filename-extension */
import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => (state.user));
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          잭잭
          <br />
          {me && me.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me && me.Followings.length}
        </div>,
        <div key="followers">
          팔로워
          <br />
          {me && me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me && me.nickname[0]}</Avatar>}
        title={me && me.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
