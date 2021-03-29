// next js는 pages 안에 컴포넌트를 자동으로 코드 스플릿된
// 컴포넌트로 만들기 때문에 써도 되고 안써도된다.
import Axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  // getServerSideProps로 이동
  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_MY_INFO_REQUEST,
  //   });
  //   dispatch({
  //     type: LOAD_POSTS_REQUEST,
  //   });
  // }, []);

  // 인피니트 스크롤링
  // scrollY : 얼마나 내렸는지
  // document.documentElement.clientHeight : 화면 보이는 길이
  // document.documentElement.scrollHeight : 총 길이 (제일 위부터 제일 아래까지)
  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight 
        > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }

    // addEventListener 를 붙이면
    window.addEventListener('scroll', onScroll);
    // 반드시 해제해줘야한다. 안그러면 메모리에 계속 쌓이게 된다.
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm /> }
      {mainPosts.map((c) => <PostCard key={c.id} post={c} />)}
    </AppLayout>
  );
};

// 이 부분이 Component 제일 처음 실행됨
// redux에 데이터가 채워진 상태로 처음부터 존재한다.
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  // header에 쿠키 추가
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 공유되는 문제 막는 방법
  // 요청이 있을 때만 쿠키를 헤더에 담고 요청이 없는 경우 쿠키를 비워냄
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
    lastId: 0,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
