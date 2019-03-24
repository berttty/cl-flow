import {Operator} from './Operator';
import {Conexion} from './Conexion';

export class RheemPlan {
  private listOperator: Operator[];
  private conexions: Conexion[];
  private sources: Operator[];
  private sinks: Operator[];

  constructor() {
    this.conexions = [];
    this.listOperator = [];
    this.sources = [];
    this.sinks = [];
  }

  addOperator(op: Operator) {
    if ( op.isSink() ) {
      this.sinks.push(op);
    }
    if ( op.isSource() ) {
      this.sources.push(op);
    }
    this.listOperator.push(op);
  }

  public addConexion(opNameStart: string | Operator, indexStart: number, opNameEnd: string | Operator, indexEnd: number ) {
    const opStart: Operator = (typeof opNameStart === 'string' ? this.getOperator(opNameStart) : opNameStart);
    const opEnd: Operator = (typeof opNameEnd === 'string' ? this.getOperator(opNameEnd) : opNameEnd);
    opStart.createConnexion(indexStart, opEnd, indexEnd);
    this.conexions.push( new Conexion(opStart, indexStart, opEnd, indexEnd) );
  }

  getOperator(name: string): Operator {
    return this.listOperator.filter(
      (op: Operator) => {
        return op.getName() === name;
      }
    )[0];
  }

  public toString(): string {
    return '[' + this.listOperator.join(' , ') + ']    conexiones: ' + this.conexions.join(' , ');
  }
}
