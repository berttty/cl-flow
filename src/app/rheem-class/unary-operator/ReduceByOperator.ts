import {UnaryOperator} from './UnaryOperator';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';
import {Parameter} from '../Parameter';

export class ReduceByOperator extends UnaryOperator {
  constructor(
    name: string,
    inputClass?: string,
    udf?: string,
    udfKey?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(
      'org.qcri.rheem.basic.operators.ReduceByOperator',
      [
        new Parameter(
          'PredicateDescriptor.SerializablePredicate',
          ReduceByOperator.generateUDF(udf, inputClass, inputClass),
          true
        ),
        new Parameter(
          'FunctionDescriptor.SerializableBinaryOperator',
          ReduceByOperator.generateUDFKey(udfKey, inputClass),
          true
        ),
        new Parameter('java.lang.Class', inputClass),
        new Parameter('java.lang.Class', inputClass)
      ],
      name,
      inputClass,
      inputClass,
      platforms,
      connexions,
      broadcasts,
      [udf, udfKey]
    );
  }

  static generateUDF(funCode: string, inputClass: string, outputClass: string) {
    return `package org.qcri.rheem.rest;
            import ${inputClass}
            import ${outputClass}
            import org.qcri.rheem.core.function.FunctionDescriptor;
            public class ReduceByOperator_${this.name}_UdfFactory {
              public static FunctionDescriptor.SerializableFunction create() {
                  return new FunctionDescriptor.SerializableFunction<${inputClass}, ${outputClass}>() {
                      @Override
                      public ${outputClass} apply(${inputClass} dataPoint) {
                          /*
                          * TODO: - Implement your Map udf here !
                          *       - Replace INPUT and OUTPUT with good types!
                          *       - Don't forget the imports !
                          * */
                          return ${funCode};
                      }
                  };
              }
            }`;
  }

  static generateUDFKey(funCode: string, inputClass: string) {
    return `package org.qcri.rheem.rest;
            import ${inputClass}
            import org.qcri.rheem.core.function.FunctionDescriptor;
            public class ReduceByOperator_Key_${this.name}_UdfFactory {
              public static FunctionDescriptor.SerializableBinaryOperator create() {
                  return new FunctionDescriptor.SerializableBinaryOperator<${inputClass}>() {
                      @Override
                      public ${inputClass} apply(${inputClass} dataPointA, ${inputClass} dataPointB) {
                          /*
                          * TODO: - Implement your Map udf here !
                          *       - Replace INPUT and OUTPUT with good types!
                          *       - Don't forget the imports !
                          * */
                          return ${funCode};
                      }
                  };
              }
            }`;
  }

  getConfParameters(): any {
    const opt: any = super.getConfParameters();
    opt.function1 = true;
    opt.function2 = true;
    opt.keyFun = true;
    return opt;
  }

}
