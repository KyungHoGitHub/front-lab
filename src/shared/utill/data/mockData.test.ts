import { describe, it, expect } from "vitest";
import { FieldType, generateMockData } from "./mockData";

describe("generateMockData", () => {
    it("STATIC 타입은 고정값을 생성해야 한다", () => {
        const result = generateMockData("test", {
            role: { type: FieldType.STATIC, value: "admin" },
        }, 3);

        console.log("STATIC 타입 결과:", result);  // 추가

        expect(result.name).toBe("test");
        expect(result.data).toHaveLength(3);
        result.data.forEach(item => {
            expect(item.role).toBe("admin");
        });
    });

    it("SEQUENCE 타입은 순차적으로 증가해야 한다", () => {
        const result = generateMockData("test", {
            id: { type: FieldType.SEQUENCE, start: 100, step: 5 },
        }, 3);

        console.log("SEQUENCE 타입 결과:", result);  // 추가

        expect(result.data.map(item => item.id)).toEqual([100, 105, 110]);
    });

    it("RANDOM 타입은 호출마다 값이 달라야 한다", () => {
        const result = generateMockData("test", {
            code: { type: FieldType.RANDOM, generator: () => Math.random() },
        }, 3);

        console.log("RANDOM 타입 결과:", result);  // 추가

        expect(result.data).toHaveLength(3);
        result.data.forEach(item => {
            expect(typeof item.code).toBe("number");
        });
    });

    it("여러 타입을 조합해서 생성할 수 있어야 한다", () => {
        const result = generateMockData("user", {
            id: { type: FieldType.SEQUENCE, start: 1 },
            name: { type: FieldType.STATIC, value: "guest" },
        }, 2);

        console.log("조합 타입 결과:", result);  // 추가

        expect(result.data).toEqual([
            { id: 1, name: "guest" },
            { id: 2, name: "guest" }
        ]);
    });
});
