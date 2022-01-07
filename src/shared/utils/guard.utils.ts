export interface IGuardResult {
  succeeded: boolean;
  message?: string;
  failedArgName?: string;
}

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}
export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static againstNullOrUndefined(
    argument: any,
    argumentName: string,
  ): IGuardResult {
    if (argument === null || argument === undefined || argument === '') {
      return {
        succeeded: false,
        message: `${argumentName}`,
      };
    }
    return { succeeded: true };
  }

  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection,
  ): IGuardResult {
    for (let i = 0; i < args.length; i += 1) {
      const result = this.againstNullOrUndefined(
        args[i].argument,
        args[i].argumentName,
      );
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }
}
