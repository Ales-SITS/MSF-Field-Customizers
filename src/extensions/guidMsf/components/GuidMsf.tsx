import * as React from 'react';

import styles from './GuidMsf.module.scss';

export interface IGuidMsfProps {
  text: string;
  guid:string;
}


export default class GuidMsf extends React.Component<IGuidMsfProps, {}> {
  public componentDidMount(): void {
    
  }

  public componentWillUnmount(): void {
    
  }

  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.guidMsf} onClick={() => {navigator.clipboard.writeText(`${this.props.guid}`)}}>
        { this.props.guid }
      </div>
    );
  }
}
