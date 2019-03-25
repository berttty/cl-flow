import {UnaryOperator} from './UnaryOperator';
import {Platform} from '../Platform';
import {Conexion} from '../Conexion';
import {Parameter} from '../Parameter';

export class MapPartitionOperator extends UnaryOperator {
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
      'org.qcri.rheem.basic.operators.MapPartitionsOperator',
      [
        new Parameter(
          'FunctionDescriptor.SerializableFunction',
          MapPartitionOperator.generateUDF(null, udf, inputClass, outputClass),
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

  static generateUDF(alias: string, funCode: string, inputClass: string, outputClass: string) {
    return `package org.qcri.rheem.rest;
            import ${inputClass};
            import ${outputClass};
            import java.util.*;
            import org.qcri.rheem.core.function.FunctionDescriptor;
            public class ${alias}_UdfFactory {
              public static FunctionDescriptor.SerializableFunction create() {
                  return new FunctionDescriptor.SerializableFunction<Iterable<${inputClass}>, Iterable<${outputClass}>>() {
                      @Override
                      public Iterable<${outputClass}> apply(Iterable<${inputClass}> input) {
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

  addValueConfParameters(values: any): void {
    super.addValueConfParameters(values);
    this.setUDF( values.function1 );
    this.udfTexts[0] = values.function1;
  }

  getConfParameters(): any {
    const opt: any = super.getConfParameters();
    opt.outputClass = true;
    return opt;
  }

  protected setUDF(udfText: string) {
    this.parameters[0].setValue(MapPartitionOperator.generateUDF(this.parameters[0].getAlias(), udfText, this.getClassInput(), this.getClassOutput()));
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
