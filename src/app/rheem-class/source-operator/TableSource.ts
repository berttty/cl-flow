import {SourceOperator} from './SourceOperator';
import {Parameter} from '../Parameter';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';

export class TableSource extends SourceOperator {
  constructor(
    name: string,
    path?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(
      'org.qcri.rheem.basic.operators.TableSource',
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
