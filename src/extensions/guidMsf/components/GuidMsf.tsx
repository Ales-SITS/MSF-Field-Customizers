import * as React from 'react';

import styles from './GuidMsf.module.scss';

export interface IGuidMsfProps {
  text: string;
  guid:string;
}

const LOG_SOURCE: string = 'GuidMsf';

export default class GuidMsf extends React.Component<IGuidMsfProps, {}> {
  public componentDidMount(): void {
    
  }

  public componentWillUnmount(): void {
    
  }

  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.guidMsf}>
        { this.props.text }<br/>
        { this.props.guid }
      </div>
    );
  }
}
