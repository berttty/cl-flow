import {EmptyOperator} from './EmptyOperator';
import {Parameter} from '../Parameter';
import {OperatorType} from '../OperatorType';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';

export class AIOperator extends EmptyOperator {
  constructor(
    className?: string,
    parameters?: Parameter[],
    name?: string,
    classInput?: string,
    classOutput?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(className, parameters, OperatorType.Ai, name, classInput, classOutput, platforms, connexions, broadcasts);
  }
}
