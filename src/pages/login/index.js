import React, { Component } from 'react';
import styles from './index.less';


class Login extends Component {

  componentDidMount() {
  }
  
  render() {
    console.info(111, styles.container);
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <span className={styles.title}>Ant Design</span>
            </div>
            <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
          </div>
        </div>
      </div>
    );
  }
}

export { Login };
