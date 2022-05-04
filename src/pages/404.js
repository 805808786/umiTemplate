import { Result } from 'antd';
import React from 'react';
import { Link } from 'umi';

const subTitle = (
  <span>
    对不起，您访问的页面不存在！请<Link to="/">点击此处</Link>返回首页
  </span>
);

export default () => <Result status="404" title="404" subTitle={subTitle} />;
