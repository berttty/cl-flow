import {UnaryOperator} from './UnaryOperator';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';
import {Parameter} from '../Parameter';

export class FilterOperator extends UnaryOperator {
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
          FilterOperator.generateUDFFilter(udf, inputClass),
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

  static generateUDFFilter(funCode: string, inputClass: string) {
    return `package org.qcri.rheem.rest.PredicateDescriptor;
            import org.qcri.rheem.core.function.FunctionDescriptor;
            public class SerializablePredicate_UdfFactory {
            public static FunctionDescriptor.SerializablePredicate create() {
              return new FunctionDescriptor.SerializablePredicate<${inputClass}>() {
              @Override
              public boolean test(${inputClass} dataPoint) {
                  return  ${funCode};
                }
              };
            }
          }`;
  }
}
