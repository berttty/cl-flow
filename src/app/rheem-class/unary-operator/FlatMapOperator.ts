import {Platform} from '../Platform';
import {Conexion} from '../Conexion';
import {Parameter} from '../Parameter';
import {UnaryOperator} from './UnaryOperator';

export class FlatMapOperator extends UnaryOperator {
  constructor(
    name: string,
    inputClass?: string,
    outputClass?: string,
    udf?: string,
    platforms?: Platform[],
    connexions?: Conexion[],
    broadcasts?: Conexion[]
  ) {
    super(
      'org.qcri.rheem.basic.operators.FlatMapOperator',
      [
        new Parameter(
          'FunctionDescriptor.SerializableFunction',
          FlatMapOperator.generateUDF(udf, inputClass, outputClass),
          true
        ),
        new Parameter('java.lang.Class', inputClass),
        new Parameter('java.lang.Class', outputClass)
      ],
      name,
      inputClass,
      outputClass,
      platforms,
      connexions,
      broadcasts,
      [udf]
    );
  }

  static generateUDF(funCode: string, inputClass: string, outputClass: string) {
    return `package org.qcri.rheem.rest;
            import ${inputClass}
            import ${outputClass}
            import org.qcri.rheem.core.function.FunctionDescriptor;
            public class FlatMap_${this.name}_UdfFactory {
              public static FunctionDescriptor.SerializableFunction create() {
                  return new FunctionDescriptor.SerializableFunction<${inputClass}, Iterable<${outputClass}>() {
                      @Override
                      public Iterable<${outputClass}> apply(${inputClass} dataPoint) {
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
    opt.outputClass = true;
    return opt;
  }

  protected setUDF(udfText: string) {
    this.parameters[0].setValue(FlatMapOperator.generateUDF(udfText, this.classInput, this.getClassOutput()));
  }


  setClassOutput(output: string): void {
    super.setClassOutput(output);
    this.parameters[2].setValue(output);
  }

  setClassInput(input: string): void {
    super.setClassInput(input);
    this.parameters[1].setValue(input);
    this.setUDF(this.udfTexts[0]);
  }
}
