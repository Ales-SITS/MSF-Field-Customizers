import * as React from 'react';

import styles from './ProgressbarMsf.module.scss';

export interface IProgressbarMsfProps {
  num: number;
}


export default class ProgressbarMsf extends React.Component<IProgressbarMsfProps, {}> {
  public render(): React.ReactElement<{}> {

    const barNum:string = `${this.props.num}`

    const barStyle = {
      minWidth: '4px',
      width: `${this.props.num*1.5}px`,
      backgroundColor:`#0094ff`,
      color:`#ffffff`,
      borderRadius: '5px',
      height: '18px',
      lineHeight: '18px',
      fontSize: '10px',
      padding: '2px'
    }

    const percentStyle = {
      fontSize: '8px',
      marginLeft: '1px',
      color: `${this.props.num<6? '#000000':'#ffffff'}`
    }    

    return (
      <div className={styles.progressbarMsf}>
        {barNum === "" ? "" :
          <div style={barStyle}>
              {barNum}<span style={percentStyle}>%</span>       
          </div>
        }
    </div>
    );
  }
}

