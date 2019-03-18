import {EmptyOperator} from './EmptyOperator';
import {Parameter} from '../Parameter';
import {OperatorType} from '../OperatorType';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';

export class PreparationOperator extends EmptyOperator {
  constructor(
    className?: string,
    parameters?: Parameter[],
    type?: OperatorType,
    name?: string,
    classInput?: string,
    classOutput?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(className, parameters, type, name, classInput, classOutput, platforms, connexions, broadcasts);
  }
}
