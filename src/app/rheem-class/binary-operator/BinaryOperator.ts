import {Operator} from '../Operator';
import {Parameter} from '../Parameter';
import {OperatorType} from '../OperatorType';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';

export class BinaryOperator extends Operator {
  constructor(
    className: string,
    parameters: Parameter[],
    name: string,
    inputClass?: string,
    outputClass?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(
      className,
      parameters,
      OperatorType.Binary,
      name,
      inputClass,
      outputClass,
      platforms,
      connexions,
      broadcasts
    );
  }
}
