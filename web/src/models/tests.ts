import { executeQuery, type Query } from "../utils/queryable";

export type Test = {
  id: string;
  result: string;
};

export function getTests(): Test[] {
  const tests = {
    noParametersTest,
    selectFieldsTest,
    whereClauseTest,
    orderByTest,
    combinedQueryTest,
    andWhereClauseTest,
    orWhereClauseTest,
    whereParameterTest,
  };

  return Object.entries(tests).map(([key, testFn]) => ({
    id: key,
    result: runTest(testFn),
  }));
}

function runTest(testFn: () => void): string {
  try {
    testFn();
    return "success";
  } catch (error: any) {
    return error.message;
  }
}

type TestType1 = {
  abc: string;
  ghi: string;
};

function noParametersTest(): void {
  const data: TestType1[] = [{ abc: "def", ghi: "jkl" }];
  const query: Query<TestType1> = {};
  const result = executeQuery(data, query);
  const expected = JSON.stringify(data);
  const actual = JSON.stringify(result);
  if (expected !== actual) {
    throw new Error(`Test failed: expected ${expected}, got ${actual}`);
  }
}

// Test: select specific fields
function selectFieldsTest(): void {
  const data: TestType1[] = [
    { abc: "def", ghi: "jkl" },
    { abc: "xyz", ghi: "mno" },
  ];
  const query: Query<TestType1> = { select: ["abc"] };
  const result = executeQuery(data, query);
  const expected = JSON.stringify([{ abc: "def" }, { abc: "xyz" }]);
  const actual = JSON.stringify(result);
  if (expected !== actual) {
    throw new Error(`Test failed: expected ${expected}, got ${actual}`);
  }
}

// Test: where clause
function whereClauseTest(): void {
  const data: TestType1[] = [
    { abc: "def", ghi: "jkl" },
    { abc: "xyz", ghi: "mno" },
  ];
  const query: Query<TestType1> = { where: { abc: "xyz" } };
  const result = executeQuery(data, query);
  const expected = JSON.stringify([{ abc: "xyz", ghi: "mno" }]);
  const actual = JSON.stringify(result);
  if (expected !== actual) {
    throw new Error(`Test failed: expected ${expected}, got ${actual}`);
  }
}

// Test: orderBy
function orderByTest(): void {
  const data: TestType1[] = [
    { abc: "b", ghi: "2" },
    { abc: "a", ghi: "1" },
  ];
  const query: Query<TestType1> = {
    orderBy: [{ column: "abc", direction: "asc" }],
  };
  const result = executeQuery(data, query);
  const expected = JSON.stringify([
    { abc: "a", ghi: "1" },
    { abc: "b", ghi: "2" },
  ]);
  const actual = JSON.stringify(result);
  if (expected !== actual) {
    throw new Error(`Test failed: expected ${expected}, got ${actual}`);
  }
}

// Test: combined query (where + select + orderBy)
function combinedQueryTest(): void {
  const data: TestType1[] = [
    { abc: "b", ghi: "2" },
    { abc: "a", ghi: "1" },
    { abc: "b", ghi: "3" },
  ];
  const query: Query<TestType1> = {
    where: { abc: "b" },
    select: ["ghi"],
    orderBy: [{ column: "ghi", direction: "desc" }],
  };
  const result = executeQuery(data, query);
  const expected = JSON.stringify([{ ghi: "3" }, { ghi: "2" }]);
  const actual = JSON.stringify(result);
  if (expected !== actual) {
    throw new Error(`Test failed: expected ${expected}, got ${actual}`);
  }
}

// Test: AND where clause (array of conditions)
function andWhereClauseTest(): void {
  const data: TestType1[] = [
    { abc: "x", ghi: "1" },
    { abc: "x", ghi: "2" },
    { abc: "y", ghi: "1" },
    { abc: "y", ghi: "2" },
  ];
  // AND: abc === "x" AND ghi === "2"
  const query: Query<TestType1> = {
    where: [{ abc: "x" }, { ghi: "2" }],
  };
  const result = executeQuery(data, query);
  const expected = JSON.stringify([{ abc: "x", ghi: "2" }]);
  const actual = JSON.stringify(result);
  if (expected !== actual) {
    throw new Error(`Test failed: expected ${expected}, got ${actual}`);
  }
}

// Test: OR where clause (array of predicates for a field)
function orWhereClauseTest(): void {
  const data: TestType1[] = [
    { abc: "x", ghi: "1" },
    { abc: "x", ghi: "2" },
    { abc: "y", ghi: "1" },
    { abc: "y", ghi: "2" },
    { abc: "z", ghi: "1" },
    { abc: "z", ghi: "2" },
  ];
  // OR: (abc === "x" OR abc === "y") AND ghi === "2"
  const query: Query<TestType1> = {
    where: {
      abc: ["x", "y"],
      ghi: ["2"],
    },
  };
  // This will match all with abc === "x" OR ghi === "2"
  const result = executeQuery(data, query);
  const expected = JSON.stringify([
    { abc: "x", ghi: "2" },
    { abc: "y", ghi: "2" },
  ]);
  const actual = JSON.stringify(result);
  if (expected !== actual) {
    throw new Error(`Test failed: expected ${expected}, got ${actual}`);
  }
}

function whereParameterTest(): void {
  const data: TestType1[] = [
    { abc: "a", ghi: "1" },
    { abc: "a", ghi: "2" },
    { abc: "b", ghi: "1" },
    { abc: "b", ghi: "2" },
  ];
  const query: Query<TestType1> = { where: { abc: "a" } };
  // The additional 'where' parameter will further filter ghi === "2"
  const result = executeQuery(data, query, (item) => item.ghi === "2");
  const expected = JSON.stringify([{ abc: "a", ghi: "2" }]);
  const actual = JSON.stringify(result);
  if (expected !== actual) {
    throw new Error(`Test failed: expected ${expected}, got ${actual}`);
  }
}
