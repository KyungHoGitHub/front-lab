// 1. enum으로 type 정의
export enum FieldType {
    STATIC = "static",
    SEQUENCE = "sequence",
    RANDOM = "random",
}

type SchemaField =
    | { type: FieldType.STATIC; value: any }
    | { type: FieldType.SEQUENCE; start: number; step?: number }
    | { type: FieldType.RANDOM; generator: () => any };

type Schema = Record<string, SchemaField>;

// 2. 화살표 함수 + export
export const generateMockData = (
    objectName: string,
    schema: Schema,
    count: number
) => {
    const result = [];

    for (let i = 0; i < count; i++) {
        const item: Record<string, any> = {};

        for (const key in schema) {
            const field = schema[key];

            switch (field.type) {
                case FieldType.STATIC:
                    item[key] = field.value;
                    break;
                case FieldType.SEQUENCE:
                    item[key] = field.start + i * (field.step ?? 1);
                    break;
                case FieldType.RANDOM:
                    item[key] = field.generator();
                    break;
            }
        }

        result.push(item);
    }

    return { name: objectName, data: result };
};
