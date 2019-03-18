export enum ActionEnum {
  SETTINGS = 'settings',
  DELETE = 'delete',
  CREATE_NEW = 'create_new'
}

export class OptionNext {
  private options: Option[];

  constructor(empty: boolean) {
    this.options = [];
    // TODO add all the icons in the component
    this.options.push(
      new Option( 1, 'Settings', 'cog')
        .addSubOption(
          new Option(
            1,
            'Settings',
            'cogs',
            ActionEnum.SETTINGS,
            {}
          )
        )
        .addSubOption(new Option( 2, '', 'cogs', null))
        .addSubOption(new Option( 3, 'Delete', 'trash-alt', ActionEnum.DELETE))
    );
    if (empty) {
      return;
    }

    this.options.push(
        new Option( 2, 'Preparation', 'hammer')
            .addSubOption(
              new Option(
                1,
                'Missing Values Imputation',
                 'hammer',
                      ActionEnum.CREATE_NEW,
                {
                  icon: 'hammer',
                  MetaOperator: 'PreparationOperator',
                  TypeOperator: 'MVICleaning',
                }
              )
            )
            .addSubOption(
              new Option(
                2,
                'Outliers Removal',
                'hammer',
                ActionEnum.CREATE_NEW,
                {
                  icon: 'hammer',
                  MetaOperator: 'PreparationOperator',
                  TypeOperator: 'ORCleaning'
                }
              )
            )
    );
    this.options.push(
        new Option(3, 'Artificial Intelligence', 'brain')
          .addSubOption(
            new Option(
              1,
              'Clustering',
              'brain',
              ActionEnum.CREATE_NEW,
              {
                icon: 'brain',
                MetaOperator: 'AIOperator',
                TypeOperator: 'Clustering'
              }
            )
          )
          .addSubOption(
            new Option(
              2,
              'Classification',
              'brain',
              ActionEnum.CREATE_NEW,
              {
                icon: 'brain',
                MetaOperator: 'AIOperator',
                TypeOperator: 'Classification'
              }
            )
          )
    );
    this.options.push(
        new Option( 4, 'Data Analytics', 'puzzle-piece')
            .addSubOption(
              new Option(
                1,
                'Binary Operator',
                'puzzle-piece',
                ActionEnum.CREATE_NEW,
                {
                  icon: 'puzzle-piece',
                  MetaOperator: 'BinaryOperator',
                  TypeOperator: 'BinaryOperator'
                }
              )
            )
            .addSubOption(
              new Option(
                2,
                'Unary Operator',
                'puzzle-piece',
                ActionEnum.CREATE_NEW,
                {
                  icon: 'puzzle-piece',
                  MetaOperator: 'UnaryOperator',
                  TypeOperator: 'UnaryOperator'
                }
              )
            )
            .addSubOption(
              new Option(
                3,
                'Loop Operator',
                'puzzle-piece',
                ActionEnum.CREATE_NEW,
                {
                  icon: 'puzzle-piece',
                  MetaOperator: 'LoopOperator',
                  TypeOperator: 'LoopOperator'
                }
              )
            )
    );
    this.options.push(
        new Option( 5, 'Data Storage', 'bullseye')
            .addSubOption(
              new Option(
                1,
                'Raw Data',
                'bullseye',
                ActionEnum.CREATE_NEW,
                {
                  icon: 'bullseye',
                  MetaOperator: 'SinkOperator',
                  TypeOperator: 'SinkOperator'
                }
              )
            )
            .addSubOption(
              new Option(
                2,
                'Relational',
                'bullseye',
                ActionEnum.CREATE_NEW,
                {
                  icon: 'bullseye',
                  MetaOperator: 'SinkOperator',
                  TypeOperator: 'SinkOperator'
                }
              )
            )
    );
  }

  public getOptions(): Option[] {
    return this.options;
  }
}

export class Option {
  private index: number;
  private name: string;
  private icon: string;
  private action: ActionEnum;
  private actionOption: any;
  private subOption: Option[];
  constructor(index: number, name: string, icon: string, action?: ActionEnum, actionObject?: any) {
    this.index = index;
    this.name = name;
    this.icon = icon;
    this.action = action;
    this.actionOption = actionObject;
    this.subOption = [];
  }

  public addSubOption(opt: Option): Option {
    this.subOption.push(opt);
    return this;
  }

  public getIndex(): number {
    return this.index;
  }

  public getName(): string {
    return this.name;
  }

  public getIcon(): string {
    return this.icon;
  }

  public getSubOptions(): Option[] {
    return this.subOption;
  }

  public getAction(): ActionEnum {
    return this.action;
  }

  public getActionOption(): any {
    return this.actionOption ;
  }
}
