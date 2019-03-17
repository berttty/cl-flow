export class OptionNext {
  private options: Option[];

  constructor(empty: boolean) {
    this.options = [];
    if (empty) {
      return;
    }
    // TODO add all the icons in the component
    this.options.push(
        new Option( 1, 'Settings', 'cog')
            .addSubOption(new Option( 1, 'Settings', 'cogs'))
            .addSubOption(new Option( 2, 'Delete', 'trash-alt'))
    );
    this.options.push(
        new Option( 2, 'Preparation', 'hammer')
            .addSubOption( new Option( 1, 'Missing Values Imputation', 'hammer') )
            .addSubOption( new Option( 2, 'Outliers Removal', 'hammer') )
    );
    this.options.push(
        new Option(3, 'Artificial Intelligence', 'brain')
          .addSubOption( new Option( 1, 'Clustering', 'brain') )
          .addSubOption( new Option( 2, 'Classification', 'brain') )
    );
    this.options.push(
        new Option( 4, 'Data Analytics', 'puzzle-piece')
            .addSubOption( new Option( 1, 'Binary Operator', 'puzzle-piece') )
            .addSubOption( new Option( 2, 'Unary Operator', 'puzzle-piece') )
            .addSubOption( new Option( 3, 'Loop Operator', 'puzzle-piece') )
    );
    this.options.push(
        new Option( 5, 'Data Storage', 'bullseye')
            .addSubOption( new Option( 1, 'Raw Data', 'bullseye') )
            .addSubOption( new Option( 2, 'Relational', 'bullseye') )
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
  private subOption: Option[];
  constructor(index: number, name: string, icon: string) {
    this.index = index;
    this.name = name;
    this.icon = icon;
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
}
