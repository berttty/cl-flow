import {Parameter} from '../Parameter';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';
import {SinkOperator} from './SinkOperator';

export class TableSink extends SinkOperator {
  constructor(
    name: string,
    path?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(
      'org.qcri.rheem.basic.operators.TableSink',
      [ new Parameter( 'java.lang.String', path) ],
      name,
      undefined,
      'java.lang.String',
      platforms,
      connexions,
      broadcasts
    );
  }


}
