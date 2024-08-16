import { test } from '@playwright/test'

export function step(stepName) {
    return function actualDecorator(target: any, context: ClassMethodDecoratorContext) {
        return function replacmentMethod(...args: any) {
            const formatStepName = stepName.replace(/\{(\d+)\}/g, (match, index) => {
                return args[index];
            });
            return test.step(formatStepName, async () => {
                return await target.call(this, ...args);
            });
        };
    }
}
