// To parse this data:
//
//   import { Convert } from "./file";
//
//   const polyTypes = Convert.toPolyTypes(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface PolyTypes {
    id:                  string;
    ticker:              string;
    slug:                string;
    title:               string;
    description:         string;
    resolutionSource:    string;
    startDate:           Date;
    creationDate:        Date;
    endDate:             Date;
    image:               string;
    icon:                string;
    active:              boolean;
    closed:              boolean;
    archived:            boolean;
    new:                 boolean;
    featured:            boolean;
    restricted:          boolean;
    volume:              number;
    createdAt:           Date;
    updatedAt:           Date;
    competitive:         number;
    volume1wk:           number;
    volume1mo:           number;
    volume1yr:           number;
    enableOrderBook:     boolean;
    negRisk:             boolean;
    commentCount:        number;
    markets:             Market[];
    tags:                Tag[];
    cyom:                boolean;
    closedTime:          Date;
    showAllOutcomes:     boolean;
    showMarketImages:    boolean;
    enableNegRisk:       boolean;
    negRiskAugmented:    boolean;
    pendingDeployment:   boolean;
    deploying:           boolean;
    requiresTranslation: boolean;
}

export interface Market {
    id:                           string;
    question:                     string;
    conditionId:                  string;
    slug:                         string;
    resolutionSource:             string;
    endDate:                      Date;
    startDate:                    Date;
    image:                        string;
    icon:                         string;
    description:                  string;
    outcomes:                     string;
    outcomePrices:                string;
    volume:                       string;
    active:                       boolean;
    closed:                       boolean;
    marketMakerAddress:           string;
    createdAt:                    Date;
    updatedAt:                    Date;
    closedTime:                   string;
    new:                          boolean;
    featured:                     boolean;
    submitted_by:                 string;
    archived:                     boolean;
    resolvedBy:                   string;
    restricted:                   boolean;
    groupItemTitle:               string;
    groupItemThreshold:           string;
    questionID:                   string;
    umaEndDate:                   string;
    enableOrderBook:              boolean;
    orderPriceMinTickSize:        number;
    orderMinSize:                 number;
    umaResolutionStatus:          string;
    volumeNum:                    number;
    hasReviewedDates:             boolean;
    volume1wk:                    number;
    volume1mo:                    number;
    volume1yr:                    number;
    clobTokenIds:                 string;
    umaBond:                      string;
    umaReward:                    string;
    fpmmLive:                     boolean;
    volume1wkAmm:                 number;
    volume1moAmm:                 number;
    volume1yrAmm:                 number;
    volume1wkClob:                number;
    volume1moClob:                number;
    volume1yrClob:                number;
    volumeClob:                   number;
    acceptingOrders:              boolean;
    negRisk:                      boolean;
    ready:                        boolean;
    funded:                       boolean;
    cyom:                         boolean;
    pagerDutyNotificationEnabled: boolean;
    approved:                     boolean;
    rewardsMinSize:               number;
    rewardsMaxSpread:             number;
    spread:                       number;
    oneDayPriceChange:            number;
    oneHourPriceChange:           number;
    oneWeekPriceChange:           number;
    oneMonthPriceChange:          number;
    oneYearPriceChange:           number;
    lastTradePrice:               number;
    bestBid:                      number;
    bestAsk:                      number;
    clearBookOnStart:             boolean;
    manualActivation:             boolean;
    negRiskOther:                 boolean;
    umaResolutionStatuses:        string;
    pendingDeployment:            boolean;
    deploying:                    boolean;
    rfqEnabled:                   boolean;
    holdingRewardsEnabled:        boolean;
    feesEnabled:                  boolean;
    requiresTranslation:          boolean;
}

export interface Tag {
    id:                  string;
    label:               string;
    slug:                string;
    publishedAt?:        string;
    createdAt?:          Date;
    updatedAt:           Date;
    requiresTranslation: boolean;
    forceShow?:          boolean;
    updatedBy?:          number;
    forceHide?:          boolean;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toPolyTypes(json: string): PolyTypes[] {
        return cast(JSON.parse(json), a(r("PolyTypes")));
    }

    public static polyTypesToJson(value: PolyTypes[]): string {
        return JSON.stringify(uncast(value, a(r("PolyTypes"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "PolyTypes": o([
        { json: "id", js: "id", typ: "" },
        { json: "ticker", js: "ticker", typ: "" },
        { json: "slug", js: "slug", typ: "" },
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "resolutionSource", js: "resolutionSource", typ: "" },
        { json: "startDate", js: "startDate", typ: Date },
        { json: "creationDate", js: "creationDate", typ: Date },
        { json: "endDate", js: "endDate", typ: Date },
        { json: "image", js: "image", typ: "" },
        { json: "icon", js: "icon", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "closed", js: "closed", typ: true },
        { json: "archived", js: "archived", typ: true },
        { json: "new", js: "new", typ: true },
        { json: "featured", js: "featured", typ: true },
        { json: "restricted", js: "restricted", typ: true },
        { json: "volume", js: "volume", typ: 3.14 },
        { json: "createdAt", js: "createdAt", typ: Date },
        { json: "updatedAt", js: "updatedAt", typ: Date },
        { json: "competitive", js: "competitive", typ: 0 },
        { json: "volume1wk", js: "volume1wk", typ: 0 },
        { json: "volume1mo", js: "volume1mo", typ: 0 },
        { json: "volume1yr", js: "volume1yr", typ: 0 },
        { json: "enableOrderBook", js: "enableOrderBook", typ: true },
        { json: "negRisk", js: "negRisk", typ: true },
        { json: "commentCount", js: "commentCount", typ: 0 },
        { json: "markets", js: "markets", typ: a(r("Market")) },
        { json: "tags", js: "tags", typ: a(r("Tag")) },
        { json: "cyom", js: "cyom", typ: true },
        { json: "closedTime", js: "closedTime", typ: Date },
        { json: "showAllOutcomes", js: "showAllOutcomes", typ: true },
        { json: "showMarketImages", js: "showMarketImages", typ: true },
        { json: "enableNegRisk", js: "enableNegRisk", typ: true },
        { json: "negRiskAugmented", js: "negRiskAugmented", typ: true },
        { json: "pendingDeployment", js: "pendingDeployment", typ: true },
        { json: "deploying", js: "deploying", typ: true },
        { json: "requiresTranslation", js: "requiresTranslation", typ: true },
    ], false),
    "Market": o([
        { json: "id", js: "id", typ: "" },
        { json: "question", js: "question", typ: "" },
        { json: "conditionId", js: "conditionId", typ: "" },
        { json: "slug", js: "slug", typ: "" },
        { json: "resolutionSource", js: "resolutionSource", typ: "" },
        { json: "endDate", js: "endDate", typ: Date },
        { json: "startDate", js: "startDate", typ: Date },
        { json: "image", js: "image", typ: "" },
        { json: "icon", js: "icon", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "outcomes", js: "outcomes", typ: "" },
        { json: "outcomePrices", js: "outcomePrices", typ: "" },
        { json: "volume", js: "volume", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "closed", js: "closed", typ: true },
        { json: "marketMakerAddress", js: "marketMakerAddress", typ: "" },
        { json: "createdAt", js: "createdAt", typ: Date },
        { json: "updatedAt", js: "updatedAt", typ: Date },
        { json: "closedTime", js: "closedTime", typ: "" },
        { json: "new", js: "new", typ: true },
        { json: "featured", js: "featured", typ: true },
        { json: "submitted_by", js: "submitted_by", typ: "" },
        { json: "archived", js: "archived", typ: true },
        { json: "resolvedBy", js: "resolvedBy", typ: "" },
        { json: "restricted", js: "restricted", typ: true },
        { json: "groupItemTitle", js: "groupItemTitle", typ: "" },
        { json: "groupItemThreshold", js: "groupItemThreshold", typ: "" },
        { json: "questionID", js: "questionID", typ: "" },
        { json: "umaEndDate", js: "umaEndDate", typ: "" },
        { json: "enableOrderBook", js: "enableOrderBook", typ: true },
        { json: "orderPriceMinTickSize", js: "orderPriceMinTickSize", typ: 3.14 },
        { json: "orderMinSize", js: "orderMinSize", typ: 0 },
        { json: "umaResolutionStatus", js: "umaResolutionStatus", typ: "" },
        { json: "volumeNum", js: "volumeNum", typ: 3.14 },
        { json: "hasReviewedDates", js: "hasReviewedDates", typ: true },
        { json: "volume1wk", js: "volume1wk", typ: 0 },
        { json: "volume1mo", js: "volume1mo", typ: 0 },
        { json: "volume1yr", js: "volume1yr", typ: 0 },
        { json: "clobTokenIds", js: "clobTokenIds", typ: "" },
        { json: "umaBond", js: "umaBond", typ: "" },
        { json: "umaReward", js: "umaReward", typ: "" },
        { json: "fpmmLive", js: "fpmmLive", typ: true },
        { json: "volume1wkAmm", js: "volume1wkAmm", typ: 0 },
        { json: "volume1moAmm", js: "volume1moAmm", typ: 0 },
        { json: "volume1yrAmm", js: "volume1yrAmm", typ: 0 },
        { json: "volume1wkClob", js: "volume1wkClob", typ: 0 },
        { json: "volume1moClob", js: "volume1moClob", typ: 0 },
        { json: "volume1yrClob", js: "volume1yrClob", typ: 0 },
        { json: "volumeClob", js: "volumeClob", typ: 3.14 },
        { json: "acceptingOrders", js: "acceptingOrders", typ: true },
        { json: "negRisk", js: "negRisk", typ: true },
        { json: "ready", js: "ready", typ: true },
        { json: "funded", js: "funded", typ: true },
        { json: "cyom", js: "cyom", typ: true },
        { json: "pagerDutyNotificationEnabled", js: "pagerDutyNotificationEnabled", typ: true },
        { json: "approved", js: "approved", typ: true },
        { json: "rewardsMinSize", js: "rewardsMinSize", typ: 0 },
        { json: "rewardsMaxSpread", js: "rewardsMaxSpread", typ: 3.14 },
        { json: "spread", js: "spread", typ: 0 },
        { json: "oneDayPriceChange", js: "oneDayPriceChange", typ: 0 },
        { json: "oneHourPriceChange", js: "oneHourPriceChange", typ: 0 },
        { json: "oneWeekPriceChange", js: "oneWeekPriceChange", typ: 0 },
        { json: "oneMonthPriceChange", js: "oneMonthPriceChange", typ: 0 },
        { json: "oneYearPriceChange", js: "oneYearPriceChange", typ: 0 },
        { json: "lastTradePrice", js: "lastTradePrice", typ: 0 },
        { json: "bestBid", js: "bestBid", typ: 0 },
        { json: "bestAsk", js: "bestAsk", typ: 0 },
        { json: "clearBookOnStart", js: "clearBookOnStart", typ: true },
        { json: "manualActivation", js: "manualActivation", typ: true },
        { json: "negRiskOther", js: "negRiskOther", typ: true },
        { json: "umaResolutionStatuses", js: "umaResolutionStatuses", typ: "" },
        { json: "pendingDeployment", js: "pendingDeployment", typ: true },
        { json: "deploying", js: "deploying", typ: true },
        { json: "rfqEnabled", js: "rfqEnabled", typ: true },
        { json: "holdingRewardsEnabled", js: "holdingRewardsEnabled", typ: true },
        { json: "feesEnabled", js: "feesEnabled", typ: true },
        { json: "requiresTranslation", js: "requiresTranslation", typ: true },
    ], false),
    "Tag": o([
        { json: "id", js: "id", typ: "" },
        { json: "label", js: "label", typ: "" },
        { json: "slug", js: "slug", typ: "" },
        { json: "publishedAt", js: "publishedAt", typ: u(undefined, "") },
        { json: "createdAt", js: "createdAt", typ: u(undefined, Date) },
        { json: "updatedAt", js: "updatedAt", typ: Date },
        { json: "requiresTranslation", js: "requiresTranslation", typ: true },
        { json: "forceShow", js: "forceShow", typ: u(undefined, true) },
        { json: "updatedBy", js: "updatedBy", typ: u(undefined, 0) },
        { json: "forceHide", js: "forceHide", typ: u(undefined, true) },
    ], false),
};
