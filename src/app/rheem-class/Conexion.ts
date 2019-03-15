import {Operator} from './Operator';

export class Conexion {
  startOperator: Operator;
  endOperator: Operator;
  startSocket: number;
  endSocket: number;

  constructor(startOperator: Operator, indexStart: number, endOperator: Operator, indexEnd: number) {
    this.startOperator = startOperator;
    this.endOperator = endOperator;
    this.startSocket = indexStart;
    this.endSocket = indexEnd;
  }

  public toString(): string {
    return `"${this.startSocket}" : [ { "${this.endOperator.getName()}" : ${this.endSocket} } ]`;
  }

}
