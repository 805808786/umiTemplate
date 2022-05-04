import { Result } from 'antd';
import React from 'react';
import { Link } from 'umi';

const subTitle = (
  <span>
    对不起，您无权访问此页面，请<Link to="/login">登录</Link>后重试
  </span>
);

export default () => <Result status="403" title="403" subTitle={subTitle} />;
