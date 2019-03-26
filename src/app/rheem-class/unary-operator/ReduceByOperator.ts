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
    broadcasts?: Conexion[],
    keyClass?: string
  ) {
    super(
      'org.qcri.rheem.basic.operators.ReduceByOperator',
      [
        new Parameter(
          'PredicateDescriptor.SerializablePredicate',
          ReduceByOperator.generateUDFKey(null, udfKey, inputClass, keyClass),
          true
        ),
        new Parameter(
          'FunctionDescriptor.SerializableBinaryOperator',
          ReduceByOperator.generateUDF(null, udf, inputClass),
          true
        ),
        new Parameter('java.lang.Class', keyClass),
        new Parameter('java.lang.Class', inputClass)
      ],
      name,
      inputClass,
      keyClass,
      platforms,
      connexions,
      broadcasts,
      [udf, udfKey]
    );
  }

  static generateUDFKey(alias: string, funCode: string, inputClass: string, keyClass: string) {
    return `package org.qcri.rheem.rest;
            import ${inputClass};
            import ${keyClass};
            import java.util.*;
            import org.qcri.rheem.core.function.FunctionDescriptor;
            public class ${alias}_UdfFactory {
              public static FunctionDescriptor.SerializableFunction create() {
                  return new FunctionDescriptor.SerializableFunction<${inputClass}, ${keyClass}>() {
                      @Override
                      public ${keyClass} apply(${inputClass} dataPoint) {
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

  static generateUDF(alias: string, funCode: string, inputClass: string) {
    return `package org.qcri.rheem.rest;
            import ${inputClass};
            import java.util.*;
            import org.qcri.rheem.core.function.FunctionDescriptor;
            public class ${alias}_UdfFactory {
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

  addValueConfParameters(values: any): void {
    super.addValueConfParameters(values);
    this.setUDFKey( values.function1 );
    this.setUDF( values.function2 );
    this.udfTexts[1] = values.function1;
    this.udfTexts[0] = (values.function2);
    this.setKeyClass(values.outputClass);
  }

  getConfParameters(): any {
    const opt: any = super.getConfParameters();
    opt.function1 = true;
    opt.function2 = true;
    opt.keyFun = true;
    opt.outputClass = true;
    return opt;
  }

  protected setUDFKey(udfText: string) {
    this.parameters[0].setValue(ReduceByOperator.generateUDFKey(this.parameters[0].getAlias(), udfText, this.getClassInput(), this.getKeyClass()));
  }

  protected setUDF(udfText: string) {
    this.parameters[1].setValue(ReduceByOperator.generateUDF(this.parameters[1].getAlias(), udfText, this.getClassInput()));
  }

  setClassInput(input: string): void {
    super.setClassInput(input);
    this.parameters[3].setValue(input);
    this.setUDF(this.udfTexts[0]);
    this.setUDFKey(this.udfTexts[1]);
  }

  setClassOutput(output: string): void {
    super.setClassOutput(this.getClassInput());
    this.setKeyClass(output);
  }

  getClassOutput(): string {
    if (this.classOutput === undefined){
      this.classOutput = this.getClassInput();
    }
    return this.classOutput;
  }

  setKeyClass(key: string): void {
    super.setKeyClass(key);
    this.parameters[2].setValue(key);
    this.setUDFKey(this.udfTexts[1]);
  }

  protected validateConfiguration() {
    super.validateConfiguration();
    this.setUDFKey(this.udfTexts[1]);
    this.setUDF(this.udfTexts[0]);
  }
}
