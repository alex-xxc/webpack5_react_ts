/*
 * @Description:
 * @version: 1.0
 * @Author: xxc
 * @Date: 2023-05-27 15:05:58;
 * @LastEditors: xxc
 * @LastEditTime: 2023-06-14 21:28:34
 */
import React from 'react';

interface PropsType {
  weId?: string;
}
const Test: React.FC<PropsType> = (props) => {
  const { weId } = props;
  return (
    <div>
      {weId}
      111
    </div>
  );
};

Test.defaultProps = {
  weId: '22221',
};

// function Component(props:PropsType) {
//   const { weId = '' } = props;
//   return <div dangerouslySetInnerHTML={{__html:weId}}/>;
// }

const Component: React.FC<PropsType> = (props) => (
  <div>{props.weId}</div>
);

export default Component;
