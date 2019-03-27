import {AIOperator} from './AIOperator';
import {Parameter} from '../Parameter';
import {OperatorType} from '../OperatorType';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';

export class ClassificationOperator extends AIOperator {
  constructor(
    className?: string,
    parameters?: Parameter[],
    name?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(
      'org.qcri.rheem.rest.SGDOperator',
      [],
      name,
      'java.lang.String',
      'java.lang.String',
      platforms,
      connexions,
      broadcasts);
  }
}
