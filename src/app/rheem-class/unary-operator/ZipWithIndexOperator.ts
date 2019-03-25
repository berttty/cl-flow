import {UnaryOperator} from './UnaryOperator';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';
import {Parameter} from '../Parameter';

export class ZipWithIndexOperator extends UnaryOperator {
  constructor(
    name: string,
    inputClass?: string,
    udf?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(
      'org.qcri.rheem.basic.operators.FilterOperator',
      [
        new Parameter(
          'PredicateDescriptor.SerializablePredicate',
          // FilterOperator.generateUDF(udf, inputClass),
          null,
          true
        ),
        new Parameter('java.lang.Class', inputClass)
      ],
      name,
      inputClass,
      inputClass,
      platforms,
      connexions,
      broadcasts
    );
  }
}
