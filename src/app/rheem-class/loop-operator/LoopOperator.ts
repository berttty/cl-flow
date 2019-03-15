import {Operator} from '../Operator';
import {Parameter} from '../Parameter';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';
import {OperatorType} from '../OperatorType';

export class LoopOperator extends Operator {
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
      OperatorType.Loop,
      name,
      inputClass,
      outputClass,
      platforms,
      connexions,
      broadcasts
    );
  }
}
