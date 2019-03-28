import {Operator} from './Operator';
import {Conexion} from './Conexion';

export class RheemPlan {
  private name: string;
  private type: string;
  private listOperator: Operator[];
  private conexions: Conexion[];
  private broadcasts: Conexion[];
  private sources: Operator[];
  private sinks: Operator[];
  private script: string;

  constructor(json?: any) {
    if (json !== undefined) {
      // TODO generar aca la logica de creado
    } else {
      this.conexions = [];
      this.listOperator = [];
      this.sources = [];
      this.sinks = [];
      this.broadcasts = [];
    }
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): RheemPlan {
    this.name = name;
    return this;
  }

  getType(): string {
    return this.type;
  }

  setType(type: string): RheemPlan {
    this.type = type;
    return this;
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

  setScript(script: string) {
    this.script = script;
  }

  getScript(): string {
    return this.script;
  }

  public addConexion(opNameStart: string | Operator, indexStart: number, opNameEnd: string | Operator, indexEnd: number ) {
    const opStart: Operator = (typeof opNameStart === 'string' ? this.getOperator(opNameStart) : opNameStart);
    const opEnd: Operator = (typeof opNameEnd === 'string' ? this.getOperator(opNameEnd) : opNameEnd);
    opStart.createConnexion(indexStart, opEnd, indexEnd);
    this.conexions.push( new Conexion(opStart, indexStart, opEnd, indexEnd) );
  }

  public addBroadcast(opNameStart: string | Operator, indexStart: number, opNameEnd: string | Operator, indexEnd: number ) {
    const opStart: Operator = (typeof opNameStart === 'string' ? this.getOperator(opNameStart) : opNameStart);
    const opEnd: Operator = (typeof opNameEnd === 'string' ? this.getOperator(opNameEnd) : opNameEnd);
    opStart.createBroadcast(indexStart, opEnd, indexEnd);
    this.broadcasts.push( new Conexion(opStart, indexStart, opEnd, indexEnd) );
  }

  getOperator(name: string): Operator {
    return this.listOperator.filter(
      (op: Operator) => {
        return op.getName() === name;
      }
    )[0];
  }

  public toString(): string {
    return '{ "operators" : ['
              +
                  this.listOperator
                      .join(' , ')
              +
            '], "sink_operators" : ['
              +
                  this.listOperator
                      .filter(
                        (ele: Operator) => ele.isSink()
                      )
                      .map(
                        (ele: Operator) => '"' + ele.getName() + '"'
                      )
                      .join(' , ')
              +
            ']}' ;
  }
}
