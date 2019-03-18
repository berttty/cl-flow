import {Operator} from '../Operator';
import {AIOperator} from '../special-operator/AIOperator';
import {EmptyOperator} from '../special-operator/EmptyOperator';
import {PreparationOperator} from '../special-operator/PreparationOperator';
import {BinaryOperator} from '../binary-operator/BinaryOperator';
import {LoopOperator} from '../loop-operator/LoopOperator';
import {SinkOperator} from '../sink-operator/SinkOperator';
import {TextFileSink} from '../sink-operator/TextFileSink';
import {SourceOperator} from '../source-operator/SourceOperator';
import {TextFileSource} from '../source-operator/TextFileSource';
import {FilterOperator} from '../unary-operator/FilterOperator';
import {UnaryOperator} from '../unary-operator/UnaryOperator';

export const Operators: any = {
  AIOperator,
  EmptyOperator,
  PreparationOperator,
  BinaryOperator,
  LoopOperator,
  SinkOperator,
  TextFileSink,
  SourceOperator,
  TextFileSource,
  FilterOperator,
  UnaryOperator
};
export class OperatorFactory {
  static buildOperator(params: any): Operator {
    const className: string = params.MetaOperator;
    return new Operators[className]();
  }

}
