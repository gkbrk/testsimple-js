class TestSimple {
    private testNum: number;

    constructor() {
        this.testNum = 0;
    }

    plan(tests: number): void {
        this.write(`1..${tests}`);
    }

    ok(cond: boolean, msg: string | null = null): boolean {
        this.testNum++;
        let prefix = cond ? "ok" : "not ok";

        msg = msg || '';
        msg = msg ? ` - ${msg}` : '';

        this.write(`${prefix} ${this.testNum}${msg}`);

        return cond;
    }

    eq(expected: any, provided: any, msg: string | null = null): boolean {
        this.ok(expected === provided, msg);
        return expected === provided;
    }

    doneTesting(): void {
        this.plan(this.testNum);
    }

    diag(msg: string): void {
        this.write(`# ${msg}`);
    }

    test(scenario: string, scope: Function): void {
        this.diag(scenario);
        scope.call(this, this);
    }

    new(): TestSimple {
        return new TestSimple();
    }

    private write(str: string): void {
        console.log(str);
    }
}

const ts = new TestSimple();
exports.ts = ts;

exports.test = (scenario: string, scope: Function): void => {
    ts.test(scenario, scope);
};

exports.doneTesting = () => ts.doneTesting();
