import {
  BaseFilter,
  Item,
  SourceOptions
} from "https://deno.land/x/ddc_vim@v3.3.0/types.ts";

type Params = {
  maxMatchLength: number;
};

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    sourceOptions: SourceOptions;
    filterParams: Params;
    completeStr: string;
    items: Item[];
  }): Promise<Item[]> {
    const maxMatchLength = args.filterParams.maxMatchLength;
    let compareStr: string =
      maxMatchLength <= 0
        ? args.completeStr
        : args.completeStr.slice(0, maxMatchLength);

    const splitUnionString = args.sourceOptions.splitUnionString;
    const splitByRegexp = args.sourceOptions.splitByRegexp;

    if (splitByRegexp != "" && splitUnionString != "") {
      compareStr = compareStr.split(new RegExp(splitByRegexp)).join(splitUnionString);
    }

    if (args.sourceOptions.ignoreCase) {
      compareStr = compareStr.toLowerCase();
      return Promise.resolve(
        args.items.filter((item) =>
          item.word.toLowerCase().match(new RegExp(compareStr))
        )
      );
    } else {
      return Promise.resolve(
        args.items.filter((item) => item.word.match(new RegExp(compareStr)))
      );
    }
  }

  override params(): Params {
    return {
      maxMatchLength: 0,
      completeStr: "",
      splitByRegexp: "(?=[A-Z])|_",
      splitUnionString: ".*"
    };
  }
}
