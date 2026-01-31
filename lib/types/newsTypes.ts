// To parse this data:
//
//   import { Convert, NewsTypes } from "./file";
//
//   const newsTypes = Convert.toNewsTypes(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface NewsTypes {
    status:       string;
    totalResults: number;
    results:      Result[];
    nextPage:     string;
}

export interface Result {
    article_id:      string;
    link:            string;
    title:           string;
    description:     string;
    content:         AISummary;
    keywords:        string[];
    creator:         string[] | null;
    language:        Language;
    country:         Country[];
    category:        string[];
    datatype:        Datatype;
    pubDate:         Date;
    pubDateTZ:       PubDateTZ;
    fetched_at:      Date;
    image_url:       null | string;
    video_url:       null;
    source_id:       string;
    source_name:     string;
    source_priority: number;
    source_url:      string;
    source_icon:     string;
    sentiment:       AITag;
    sentiment_stats: AITag;
    ai_tag:          AITag;
    ai_region:       AI;
    ai_org:          AI;
    ai_summary:      AISummary;
    duplicate:       boolean;
}

export enum AI {
    OnlyAvailableInCorporatePlans = "ONLY AVAILABLE IN CORPORATE PLANS",
}

export enum AISummary {
    OnlyAvailableInPaidPlans = "ONLY AVAILABLE IN PAID PLANS",
}

export enum AITag {
    OnlyAvailableInProfessionalAndCorporatePlans = "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
}

export enum Country {
    NewZealand = "new zealand",
    UnitedKingdom = "united kingdom",
    UnitedStatesOfAmerica = "united states of america",
}

export enum Datatype {
    News = "news",
}

export enum Language {
    English = "english",
}

export enum PubDateTZ {
    UTC = "UTC",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toNewsTypes(json: string): NewsTypes {
        return cast(JSON.parse(json), r("NewsTypes"));
    }

    public static newsTypesToJson(value: NewsTypes): string {
        return JSON.stringify(uncast(value, r("NewsTypes")), null, 2);
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
    "NewsTypes": o([
        { json: "status", js: "status", typ: "" },
        { json: "totalResults", js: "totalResults", typ: 0 },
        { json: "results", js: "results", typ: a(r("Result")) },
        { json: "nextPage", js: "nextPage", typ: "" },
    ], false),
    "Result": o([
        { json: "article_id", js: "article_id", typ: "" },
        { json: "link", js: "link", typ: "" },
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "content", js: "content", typ: r("AISummary") },
        { json: "keywords", js: "keywords", typ: a("") },
        { json: "creator", js: "creator", typ: u(a(""), null) },
        { json: "language", js: "language", typ: r("Language") },
        { json: "country", js: "country", typ: a(r("Country")) },
        { json: "category", js: "category", typ: a("") },
        { json: "datatype", js: "datatype", typ: r("Datatype") },
        { json: "pubDate", js: "pubDate", typ: Date },
        { json: "pubDateTZ", js: "pubDateTZ", typ: r("PubDateTZ") },
        { json: "fetched_at", js: "fetched_at", typ: Date },
        { json: "image_url", js: "image_url", typ: u(null, "") },
        { json: "video_url", js: "video_url", typ: null },
        { json: "source_id", js: "source_id", typ: "" },
        { json: "source_name", js: "source_name", typ: "" },
        { json: "source_priority", js: "source_priority", typ: 0 },
        { json: "source_url", js: "source_url", typ: "" },
        { json: "source_icon", js: "source_icon", typ: "" },
        { json: "sentiment", js: "sentiment", typ: r("AITag") },
        { json: "sentiment_stats", js: "sentiment_stats", typ: r("AITag") },
        { json: "ai_tag", js: "ai_tag", typ: r("AITag") },
        { json: "ai_region", js: "ai_region", typ: r("AI") },
        { json: "ai_org", js: "ai_org", typ: r("AI") },
        { json: "ai_summary", js: "ai_summary", typ: r("AISummary") },
        { json: "duplicate", js: "duplicate", typ: true },
    ], false),
    "AI": [
        "ONLY AVAILABLE IN CORPORATE PLANS",
    ],
    "AISummary": [
        "ONLY AVAILABLE IN PAID PLANS",
    ],
    "AITag": [
        "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ],
    "Country": [
        "new zealand",
        "united kingdom",
        "united states of america",
    ],
    "Datatype": [
        "news",
    ],
    "Language": [
        "english",
    ],
    "PubDateTZ": [
        "UTC",
    ],
};
